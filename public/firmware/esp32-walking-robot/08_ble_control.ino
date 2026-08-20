// Albert Mini. Current workshop robot.
// Organizer: Robotics & Automation Club, TSEC. Aurigen hosts this lab page. Aurigen is not the organizer.
// Reference implementation. Not labeled as final-tested hardware validation.
// Module 08. Real BLE control. Device name AlbertMini.
// Phone writes ASCII to the RX characteristic. Serial is a debug fallback only.

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

Servo servos[4];
const int SERVO_PINS[4] = {SERVO1_PIN, SERVO2_PIN, SERVO3_PIN, SERVO4_PIN};
int servoOffsets[4] = {0, 0, 0, 0};
int current[4] = {CENTER_ANGLE, CENTER_ANGLE, CENTER_ANGLE, CENTER_ANGLE};

enum Mode { MODE_IDLE, MODE_WALK, MODE_BACK, MODE_LEFT, MODE_RIGHT };
Mode mode = MODE_IDLE;
int phase = 0;
unsigned long lastStep = 0;
String serialLine;
volatile bool bleConnected = false;

BLECharacteristic *txChar = nullptr;

void attachAll() {
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

void beepOnce() {
  pinMode(BUZZER_PIN, OUTPUT);
  for (int i = 0; i < 180; i++) {
    digitalWrite(BUZZER_PIN, HIGH);
    delayMicroseconds(220);
    digitalWrite(BUZZER_PIN, LOW);
    delayMicroseconds(220);
  }
}

void gaitTick() {
  int dir = (mode == MODE_BACK) ? -1 : 1;
  int turn = 0;
  if (mode == MODE_LEFT) turn = -1;
  if (mode == MODE_RIGHT) turn = 1;
  int a = STEP_ANGLE * dir;
  int biasL = turn < 0 ? STEP_ANGLE / 2 : 0;
  int biasR = turn > 0 ? STEP_ANGLE / 2 : 0;
  int t[4] = {CENTER_ANGLE, CENTER_ANGLE, CENTER_ANGLE, CENTER_ANGLE};
  if (phase == 0) {
    t[0] = CENTER_ANGLE + a - biasL;
    t[3] = CENTER_ANGLE - a + biasR;
  } else if (phase == 2) {
    t[1] = CENTER_ANGLE - a + biasR;
    t[2] = CENTER_ANGLE + a - biasL;
  }
  apply(t);
  phase = (phase + 1) % 4;
}

void notify(const char *msg) {
  Serial.print("[cmd] ");
  Serial.println(msg);
  if (bleConnected && txChar != nullptr) {
    txChar->setValue(msg);
    txChar->notify();
  }
}

void handleCommand(String cmd) {
  cmd.trim();
  cmd.toUpperCase();
  if (cmd.length() == 0) return;

  if (cmd == "WALK") { mode = MODE_WALK; notify("WALK"); return; }
  if (cmd == "BACK") { mode = MODE_BACK; notify("BACK"); return; }
  if (cmd == "LEFT") { mode = MODE_LEFT; notify("LEFT"); return; }
  if (cmd == "RIGHT") { mode = MODE_RIGHT; notify("RIGHT"); return; }
  if (cmd == "STOP") { mode = MODE_IDLE; poseCenter(); notify("STOP"); return; }
  if (cmd == "CENTER") { mode = MODE_IDLE; poseCenter(); notify("CENTER"); return; }
  if (cmd == "REST") { mode = MODE_IDLE; poseRest(); notify("REST"); return; }
  if (cmd == "BEEP") { beepOnce(); notify("BEEP"); return; }

  Serial.print("Unknown command: ");
  Serial.println(cmd);
  Serial.println("Core: WALK STOP CENTER LEFT RIGHT BACK REST BEEP");
}

class ServerCbs : public BLEServerCallbacks {
  void onConnect(BLEServer *s) {
    (void)s;
    bleConnected = true;
    Serial.println("BLE connected");
  }
  void onDisconnect(BLEServer *s) {
    bleConnected = false;
    Serial.println("BLE disconnected. Advertising again.");
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

  txChar = service->createCharacteristic(
    BLE_TX_UUID,
    BLECharacteristic::PROPERTY_NOTIFY
  );
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

void setup() {
  Serial.begin(SERIAL_BAUD);
  delay(400);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW);
  Serial.println("Module 08 BLE control");
  Serial.println("Path: Phone -> BLE -> ESP32-C3 parser -> servos");
  Serial.println("Serial Monitor is a debug fallback. It is not BLE.");
  Serial.println("Core commands: WALK STOP CENTER LEFT RIGHT BACK REST BEEP");
  attachAll();
  poseCenter();
  setupBle();
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

  bool moving = mode == MODE_WALK || mode == MODE_BACK || mode == MODE_LEFT || mode == MODE_RIGHT;
  if (moving && millis() - lastStep >= (unsigned long)STEP_TIME) {
    lastStep = millis();
    gaitTick();
  }
}
