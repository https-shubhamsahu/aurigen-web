// Albert Mini. Current workshop robot.
// Organizer: Robotics & Automation Club, TSEC. Aurigen hosts this lab page. Aurigen is not the organizer.
// Reference implementation. Not labeled as final-tested hardware validation.
// Module 09. Complete reference firmware.
// Combines servos, SH1106 eyes, BLE AlbertMini, buzzer, poses, gait, parser.
// No PCA9685. Direct GPIO PWM.

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>
#include <ESP32Servo.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

// Current workshop robot. GPIO is SIGNAL only. Do not power a servo from a GPIO pin.
// Servo 1 GPIO 0 | Servo 2 GPIO 1 | Servo 3 GPIO 3 | Servo 4 GPIO 10
// Buzzer GPIO 4 (not a servo) | OLED SH1106 SDA GPIO 8 SCL GPIO 9 addr 0x3C

#define SERVO1_PIN 0
#define SERVO2_PIN 1
#define SERVO3_PIN 3
#define SERVO4_PIN 10
#define BUZZER_PIN 4
#define OLED_SDA 8
#define OLED_SCL 9
#define OLED_ADDR 0x3C
#define OLED_WIDTH 128
#define OLED_HEIGHT 64

#define BLE_NAME "AlbertMini"
#define BLE_SERVICE_UUID "6E400001-B5A3-F393-E0A9-E50E24DCCA9E"
#define BLE_RX_UUID "6E400002-B5A3-F393-E0A9-E50E24DCCA9E"
#define BLE_TX_UUID "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"

#define CENTER_ANGLE 90
#define STEP_ANGLE 12
#define STEP_TIME 180
#define SERVO_MIN 50
#define SERVO_MAX 130
#define SERVO_PULSE_MIN 500
#define SERVO_PULSE_MAX 2400
#define SERIAL_BAUD 115200

Adafruit_SH1106G display(OLED_WIDTH, OLED_HEIGHT, &Wire, -1);
Servo servos[4];
const int SERVO_PINS[4] = {SERVO1_PIN, SERVO2_PIN, SERVO3_PIN, SERVO4_PIN};
int servoOffsets[4] = {0, 0, 0, 0};
int current[4] = {CENTER_ANGLE, CENTER_ANGLE, CENTER_ANGLE, CENTER_ANGLE};

enum Mode {
  MODE_IDLE,
  MODE_WALK,
  MODE_BACK,
  MODE_LEFT,
  MODE_RIGHT,
  MODE_PUSHUPS,
  MODE_SWING,
  MODE_GALLOP
};

enum Face { FACE_NEUTRAL, FACE_HAPPY, FACE_ANGRY, FACE_SLEEPY, FACE_BLINK };

Mode mode = MODE_IDLE;
Face face = FACE_NEUTRAL;
int phase = 0;
unsigned long lastStep = 0;
unsigned long lastBlink = 0;
unsigned long lastFace = 0;
String serialLine;
String statusLine = "CENTER";
volatile bool bleConnected = false;
BLECharacteristic *txChar = nullptr;

void attachServos() {
  for (int i = 0; i < 4; i++) {
    servos[i].setPeriodHertz(50);
    servos[i].attach(SERVO_PINS[i], SERVO_PULSE_MIN, SERVO_PULSE_MAX);
  }
}

void apply(const int *target) {
  for (int i = 0; i < 4; i++) {
    current[i] = constrain(target[i] + servoOffsets[i], SERVO_MIN, SERVO_MAX);
    servos[i].write(current[i]);
  }
}

void poseCenter() {
  int t[4] = {CENTER_ANGLE, CENTER_ANGLE, CENTER_ANGLE, CENTER_ANGLE};
  apply(t);
}

void poseRest() {
  int t[4] = {CENTER_ANGLE + 8, CENTER_ANGLE - 8, CENTER_ANGLE - 8, CENTER_ANGLE + 8};
  apply(t);
}

void poseStand() { poseCenter(); }

void poseSit() {
  int t[4] = {CENTER_ANGLE + 16, CENTER_ANGLE - 16, CENTER_ANGLE - 12, CENTER_ANGLE + 12};
  apply(t);
}

void poseDown() {
  int t[4] = {CENTER_ANGLE + 22, CENTER_ANGLE - 22, CENTER_ANGLE - 22, CENTER_ANGLE + 22};
  apply(t);
}

void beepOnce() {
  pinMode(BUZZER_PIN, OUTPUT);
  for (int i = 0; i < 180; i++) {
    digitalWrite(BUZZER_PIN, HIGH);
    delayMicroseconds(220);
    digitalWrite(BUZZER_PIN, LOW);
    delayMicroseconds(220);
  }
}

void drawFace() {
  display.clearDisplay();
  int lx = 40;
  int rx = 88;
  int ly = 22;
  int ry = 22;
  Face f = face;
  if (millis() - lastBlink < 90) f = FACE_BLINK;

  if (f == FACE_BLINK) {
    display.drawLine(lx - 12, ly, lx + 12, ly, SH110X_WHITE);
    display.drawLine(rx - 12, ry, rx + 12, ry, SH110X_WHITE);
  } else {
    display.fillCircle(lx, ly, 14, SH110X_WHITE);
    display.fillCircle(rx, ry, 14, SH110X_WHITE);
    display.fillCircle(lx, ly + 2, 5, 0);
    display.fillCircle(rx, ry + 2, 5, 0);
    if (f == FACE_ANGRY) {
      display.drawLine(lx - 14, 4, lx + 10, 12, SH110X_WHITE);
      display.drawLine(rx + 14, 4, rx - 10, 12, SH110X_WHITE);
    }
    if (f == FACE_SLEEPY) {
      display.fillRect(lx - 14, ly - 14, 28, 11, 0);
      display.fillRect(rx - 14, ry - 14, 28, 11, 0);
    }
  }
  if (f == FACE_HAPPY) {
    display.drawLine(54, 46, 64, 52, SH110X_WHITE);
    display.drawLine(64, 52, 74, 46, SH110X_WHITE);
  } else {
    display.drawLine(56, 48, 72, 48, SH110X_WHITE);
  }
  display.setTextSize(1);
  display.setTextColor(SH110X_WHITE);
  display.setCursor(0, 56);
  display.print(bleConnected ? "BLE " : "SER ");
  display.print(statusLine);
  display.display();
}

void gaitTick(int dir, int turn, int angle) {
  int a = angle * dir;
  int biasL = turn < 0 ? angle / 2 : 0;
  int biasR = turn > 0 ? angle / 2 : 0;
  int t[4] = {CENTER_ANGLE, CENTER_ANGLE, CENTER_ANGLE, CENTER_ANGLE};
  if (phase % 4 == 0) {
    t[0] = CENTER_ANGLE + a - biasL;
    t[3] = CENTER_ANGLE - a + biasR;
  } else if (phase % 4 == 2) {
    t[1] = CENTER_ANGLE - a + biasR;
    t[2] = CENTER_ANGLE + a - biasL;
  }
  apply(t);
  phase++;
}

void funTick() {
  if (mode == MODE_PUSHUPS) {
    if (phase % 2 == 0) poseStand();
    else poseDown();
    phase++;
  } else if (mode == MODE_SWING) {
    int s = (phase % 2 == 0) ? STEP_ANGLE : -STEP_ANGLE;
    int t[4] = {CENTER_ANGLE + s, CENTER_ANGLE + s, CENTER_ANGLE - s, CENTER_ANGLE - s};
    apply(t);
    phase++;
  } else if (mode == MODE_GALLOP) {
    gaitTick(1, 0, STEP_ANGLE + 6);
  }
}

void notify(const char *msg) {
  statusLine = msg;
  Serial.print("[cmd] ");
  Serial.println(msg);
  if (bleConnected && txChar != nullptr) {
    txChar->setValue(msg);
    txChar->notify();
  }
}

void printInfo() {
  Serial.println("Albert Mini pin map");
  Serial.println("S1 GPIO 0 | S2 GPIO 1 | S3 GPIO 3 | S4 GPIO 10");
  Serial.println("Buzzer GPIO 4 | OLED SH1106 SDA 8 SCL 9 addr 0x3C");
  Serial.print("BLE name ");
  Serial.println(BLE_NAME);
  Serial.println("Core: WALK STOP CENTER LEFT RIGHT BACK REST BEEP");
  Serial.println("Fun (complete firmware only): PUSHUPS SWING GALLOP");
  Serial.println("Debug (complete firmware only): INFO");
}

void handleCommand(String cmd) {
  cmd.trim();
  cmd.toUpperCase();
  if (cmd.length() == 0) return;
  phase = 0;

  if (cmd == "WALK") { mode = MODE_WALK; face = FACE_HAPPY; notify("WALK"); return; }
  if (cmd == "BACK") { mode = MODE_BACK; face = FACE_NEUTRAL; notify("BACK"); return; }
  if (cmd == "LEFT") { mode = MODE_LEFT; face = FACE_NEUTRAL; notify("LEFT"); return; }
  if (cmd == "RIGHT") { mode = MODE_RIGHT; face = FACE_NEUTRAL; notify("RIGHT"); return; }
  if (cmd == "STOP") { mode = MODE_IDLE; poseCenter(); face = FACE_NEUTRAL; notify("STOP"); return; }
  if (cmd == "CENTER") { mode = MODE_IDLE; poseCenter(); face = FACE_NEUTRAL; notify("CENTER"); return; }
  if (cmd == "REST") { mode = MODE_IDLE; poseRest(); face = FACE_SLEEPY; notify("REST"); return; }
  if (cmd == "BEEP") { beepOnce(); notify("BEEP"); return; }
  if (cmd == "PUSHUPS") { mode = MODE_PUSHUPS; face = FACE_ANGRY; notify("PUSHUPS"); return; }
  if (cmd == "SWING") { mode = MODE_SWING; face = FACE_HAPPY; notify("SWING"); return; }
  if (cmd == "GALLOP") { mode = MODE_GALLOP; face = FACE_HAPPY; notify("GALLOP"); return; }
  if (cmd == "INFO") { printInfo(); notify("INFO"); return; }

  Serial.print("Unknown command: ");
  Serial.println(cmd);
}

class ServerCbs : public BLEServerCallbacks {
  void onConnect(BLEServer *s) {
    (void)s;
    bleConnected = true;
    statusLine = "BLE OK";
    Serial.println("BLE connected");
  }
  void onDisconnect(BLEServer *s) {
    bleConnected = false;
    statusLine = "BLE lost";
    Serial.println("BLE disconnected. If this happened while servos moved, check power first.");
    s->startAdvertising();
  }
};

class RxCbs : public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *c) {
    String value;
#if defined(ESP_ARDUINO_VERSION_MAJOR) && (ESP_ARDUINO_VERSION_MAJOR >= 3)
    value = c->getValue();
#else
    value = String(c->getValue().c_str());
#endif
    handleCommand(value);
  }
};

void setupBle() {
  BLEDevice::init(BLE_NAME);
  BLEServer *server = BLEDevice::createServer();
  server->setCallbacks(new ServerCbs());
  BLEService *service = server->createService(BLE_SERVICE_UUID);
  txChar = service->createCharacteristic(BLE_TX_UUID, BLECharacteristic::PROPERTY_NOTIFY);
  txChar->addDescriptor(new BLE2902());
  BLECharacteristic *rxChar = service->createCharacteristic(
    BLE_RX_UUID,
    BLECharacteristic::PROPERTY_WRITE | BLECharacteristic::PROPERTY_WRITE_NR
  );
  rxChar->setCallbacks(new RxCbs());
  service->start();
  BLEAdvertising *adv = BLEDevice::getAdvertising();
  adv->addServiceUUID(BLE_SERVICE_UUID);
  adv->setScanResponse(true);
  BLEDevice::startAdvertising();
  Serial.print("BLE advertising as ");
  Serial.println(BLE_NAME);
}

void setupOled() {
  Wire.begin(OLED_SDA, OLED_SCL);
  if (!display.begin(OLED_ADDR, true)) {
    Serial.println("SH1106 not found. Motion and BLE still run.");
    return;
  }
  drawFace();
}

void setup() {
  Serial.begin(SERIAL_BAUD);
  delay(400);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW);
  Serial.println("Module 09 complete reference firmware");
  Serial.println("Not labeled final-tested. Validate on your kit.");
  Serial.println("Phone -> BLE AlbertMini -> parser -> robot");
  Serial.println("Serial is debug fallback. Same command words.");
  printInfo();
  attachServos();
  poseCenter();
  setupOled();
  setupBle();
  beepOnce();
}

void loop() {
  while (Serial.available()) {
    char ch = Serial.read();
    if (ch == '\n' || ch == '\r') {
      if (serialLine.length()) {
        Serial.println("[serial debug]");
        handleCommand(serialLine);
        serialLine = "";
      }
    } else {
      serialLine += ch;
    }
  }

  unsigned long now = millis();
  if (now - lastBlink > 2600) lastBlink = now;

  if (now - lastStep >= (unsigned long)STEP_TIME) {
    lastStep = now;
    if (mode == MODE_WALK) gaitTick(1, 0, STEP_ANGLE);
    else if (mode == MODE_BACK) gaitTick(-1, 0, STEP_ANGLE);
    else if (mode == MODE_LEFT) gaitTick(1, -1, STEP_ANGLE);
    else if (mode == MODE_RIGHT) gaitTick(1, 1, STEP_ANGLE);
    else if (mode == MODE_PUSHUPS || mode == MODE_SWING || mode == MODE_GALLOP) funTick();
  }

  if (now - lastFace > 80) {
    lastFace = now;
    drawFace();
  }
}
