/**
 * Workshop sketches. Values come from hardware.ts so the lab page and
 * public/firmware copies stay on the same pin map.
 */

import { cPinDefines, coreCommands, debugCommands, funCommands, hardware } from "./hardware";

const pins = cPinDefines();
const sketchBanner = `// Albert Mini. Current workshop robot.
// Organizer: ${hardware.organizer}. Aurigen hosts this lab page. Aurigen is not the organizer.
// Reference implementation. Not labeled as final-tested hardware validation.`;

export const configH = `// config.h
// Single C header for the current Albert Mini pin map.
// Keep this file next to a sketch if you #include "config.h".
// Copy-paste sketches on the lab page already inline the same values.

#pragma once

${pins}
`;

export const sketch01 = `${sketchBanner}
// Module 01. ESP32-C3 bring-up. No servos. No OLED. No buzzer.

${pins}

// LED_BUILTIN caveat:
// On many ESP32-C3 boards LED_BUILTIN is GPIO ${hardware.pins.oledSda}.
// GPIO ${hardware.pins.oledSda} is OLED SDA on this robot. Do not blink it.

void setup() {
  Serial.begin(SERIAL_BAUD);
  delay(400);
  Serial.println("Albert Mini");
  Serial.println("Module 01 ESP32-C3 setup");
  Serial.println("Serial OK at 115200");
  Serial.println("Board: ESP32C3 Dev Module");
  Serial.println("Enable USB CDC On Boot if the port disappears after upload.");
  Serial.println("GPIO map: see lab hardware section.");
}

void loop() {
  Serial.println("heartbeat");
  delay(1000);
}
`;

export const sketch02 = `${sketchBanner}
// Module 02. 0.96 inch SH1106 OLED on I2C.
// Library: Adafruit SH110X + Adafruit GFX. Not Adafruit SSD1306.

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>

${pins}

Adafruit_SH1106G display(OLED_WIDTH, OLED_HEIGHT, &Wire, -1);

void setup() {
  Serial.begin(SERIAL_BAUD);
  delay(400);
  Serial.println("Module 02 OLED SH1106");
  Wire.begin(OLED_SDA, OLED_SCL);

  if (!display.begin(OLED_ADDR, true)) {
    Serial.println("SH1106 not found at ${hardware.oled.addressHex}");
    Serial.println("Check SDA GPIO ${hardware.pins.oledSda}, SCL GPIO ${hardware.pins.oledScl}, VCC, GND.");
    while (true) {
      delay(1000);
    }
  }

  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SH110X_WHITE);
  display.setCursor(0, 0);
  display.println("Albert Mini");
  display.println("SH1106 OLED OK");
  display.println("SDA GPIO ${hardware.pins.oledSda}");
  display.println("SCL GPIO ${hardware.pins.oledScl}");
  display.println("addr ${hardware.oled.addressHex}");
  display.display();
  Serial.println("OLED init OK. Text should be on the screen.");
}

void loop() {}
`;

export const sketch03 = `${sketchBanner}
// Module 03. Four servo test. Direct ESP32-C3 PWM. No PCA9685.
// Serial commands: S1 90   S2 90   S3 90   S4 90   CENTER   SWEEP
// GPIO is SIGNAL only. Servo VCC is the servo power rail. Never a GPIO pin.

#include <ESP32Servo.h>

${pins}

Servo servos[4];
const int SERVO_PINS[4] = {SERVO1_PIN, SERVO2_PIN, SERVO3_PIN, SERVO4_PIN};
String line;

void attachAll() {
  for (int i = 0; i < 4; i++) {
    servos[i].setPeriodHertz(50);
    servos[i].attach(SERVO_PINS[i], SERVO_PULSE_MIN, SERVO_PULSE_MAX);
  }
}

void writeServo(int index, int angle) {
  angle = constrain(angle, SERVO_MIN, SERVO_MAX);
  servos[index].write(angle);
  Serial.print("S");
  Serial.print(index + 1);
  Serial.print(" GPIO ");
  Serial.print(SERVO_PINS[index]);
  Serial.print(" -> ");
  Serial.println(angle);
}

void centerAll() {
  for (int i = 0; i < 4; i++) {
    writeServo(i, CENTER_ANGLE);
  }
}

void handle(String cmd) {
  cmd.trim();
  cmd.toUpperCase();
  if (cmd.length() == 0) return;

  if (cmd == "CENTER") {
    centerAll();
    return;
  }

  if (cmd == "SWEEP") {
    for (int a = 70; a <= 110; a += 10) {
      for (int i = 0; i < 4; i++) writeServo(i, a);
      delay(250);
    }
    centerAll();
    return;
  }

  if (cmd.charAt(0) == 'S' && cmd.length() >= 4) {
    int id = cmd.charAt(1) - '1';
    int space = cmd.indexOf(' ');
    if (id >= 0 && id < 4 && space > 0) {
      int angle = cmd.substring(space + 1).toInt();
      writeServo(id, angle);
      return;
    }
  }

  Serial.println("Commands: S1 90  S2 90  S3 90  S4 90  CENTER  SWEEP");
}

void setup() {
  Serial.begin(SERIAL_BAUD);
  delay(400);
  Serial.println("Module 03 four servo test");
  Serial.println("S1 GPIO ${hardware.pins.servo1} | S2 GPIO ${hardware.pins.servo2} | S3 GPIO ${hardware.pins.servo3} | S4 GPIO ${hardware.pins.servo4}");
  Serial.println("GPIO ${hardware.pins.buzzer} is the buzzer. Do not treat GPIO ${hardware.pins.buzzer} as a servo.");
  Serial.println("Power servos from the servo rail. GPIO is signal only.");
  attachAll();
  centerAll();
  Serial.println("Ready. Type S1 90");
}

void loop() {
  while (Serial.available()) {
    char ch = Serial.read();
    if (ch == '\\n' || ch == '\\r') {
      handle(line);
      line = "";
    } else {
      line += ch;
    }
  }
}
`;

export const sketch04 = `${sketchBanner}
// Module 04. Calibration. Named S1-S4 on the current GPIOs.
// Tune servoOffsets[4] until the stance is square. Do not copy someone else's numbers.

#include <ESP32Servo.h>

${pins}

Servo servos[4];
const int SERVO_PINS[4] = {SERVO1_PIN, SERVO2_PIN, SERVO3_PIN, SERVO4_PIN};

// Per-servo mechanical zero. Start at 0. Change after you align horns.
int servoOffsets[4] = {0, 0, 0, 0};

String line;

void attachAll() {
  for (int i = 0; i < 4; i++) {
    servos[i].setPeriodHertz(50);
    servos[i].attach(SERVO_PINS[i], SERVO_PULSE_MIN, SERVO_PULSE_MAX);
  }
}

int safeAngle(int index, int angle) {
  return constrain(angle + servoOffsets[index], SERVO_MIN, SERVO_MAX);
}

void writeServo(int index, int angle) {
  int out = safeAngle(index, angle);
  servos[index].write(out);
  Serial.print("S");
  Serial.print(index + 1);
  Serial.print(" cmd ");
  Serial.print(angle);
  Serial.print(" offset ");
  Serial.print(servoOffsets[index]);
  Serial.print(" out ");
  Serial.println(out);
}

void applyCenter() {
  for (int i = 0; i < 4; i++) {
    writeServo(i, CENTER_ANGLE);
  }
}

void handle(String cmd) {
  cmd.trim();
  cmd.toUpperCase();
  if (cmd.length() == 0) return;

  if (cmd == "CENTER") {
    applyCenter();
    return;
  }

  if (cmd.startsWith("O") && cmd.length() >= 4) {
    int id = cmd.charAt(1) - '1';
    int space = cmd.indexOf(' ');
    if (id >= 0 && id < 4 && space > 0) {
      servoOffsets[id] = cmd.substring(space + 1).toInt();
      writeServo(id, CENTER_ANGLE);
      return;
    }
  }

  if (cmd.charAt(0) == 'S' && cmd.length() >= 4) {
    int id = cmd.charAt(1) - '1';
    int space = cmd.indexOf(' ');
    if (id >= 0 && id < 4 && space > 0) {
      writeServo(id, cmd.substring(space + 1).toInt());
      return;
    }
  }

  Serial.println("S1 90  O1 5  CENTER   (O1 sets servoOffsets[0])");
}

void setup() {
  Serial.begin(SERIAL_BAUD);
  delay(400);
  Serial.println("Module 04 calibration");
  Serial.println("Center is mechanical zero plus servoOffsets.");
  Serial.println("Align horns at CENTER before you tighten the screw.");
  Serial.println("Stay inside SERVO_MIN and SERVO_MAX so linkages do not bind.");
  attachAll();
  applyCenter();
}

void loop() {
  while (Serial.available()) {
    char ch = Serial.read();
    if (ch == '\\n' || ch == '\\r') {
      handle(line);
      line = "";
    } else {
      line += ch;
    }
  }
}
`;

export const sketch05 = `${sketchBanner}
// Module 05. Poses. Coordinated angles. This is not a gait yet.

#include <ESP32Servo.h>

${pins}

Servo servos[4];
const int SERVO_PINS[4] = {SERVO1_PIN, SERVO2_PIN, SERVO3_PIN, SERVO4_PIN};
int servoOffsets[4] = {0, 0, 0, 0};
String line;

void attachAll() {
  for (int i = 0; i < 4; i++) {
    servos[i].setPeriodHertz(50);
    servos[i].attach(SERVO_PINS[i], SERVO_PULSE_MIN, SERVO_PULSE_MAX);
  }
}

void writeRaw(int i, int angle) {
  servos[i].write(constrain(angle + servoOffsets[i], SERVO_MIN, SERVO_MAX));
}

void pose(int a, int b, int c, int d) {
  writeRaw(0, a);
  writeRaw(1, b);
  writeRaw(2, c);
  writeRaw(3, d);
}

void poseCenter() { pose(CENTER_ANGLE, CENTER_ANGLE, CENTER_ANGLE, CENTER_ANGLE); }

void poseStand() {
  pose(CENTER_ANGLE, CENTER_ANGLE, CENTER_ANGLE, CENTER_ANGLE);
}

void poseRest() {
  pose(CENTER_ANGLE + 8, CENTER_ANGLE - 8, CENTER_ANGLE - 8, CENTER_ANGLE + 8);
}

void poseSit() {
  pose(CENTER_ANGLE + 16, CENTER_ANGLE - 16, CENTER_ANGLE - 12, CENTER_ANGLE + 12);
}

void poseDown() {
  pose(CENTER_ANGLE + 22, CENTER_ANGLE - 22, CENTER_ANGLE - 22, CENTER_ANGLE + 22);
}

void handle(String cmd) {
  cmd.trim();
  cmd.toUpperCase();
  if (cmd == "CENTER") poseCenter();
  else if (cmd == "STAND") poseStand();
  else if (cmd == "REST") poseRest();
  else if (cmd == "SIT") poseSit();
  else if (cmd == "DOWN") poseDown();
  else Serial.println("CENTER STAND REST SIT DOWN");
}

void setup() {
  Serial.begin(SERIAL_BAUD);
  delay(400);
  Serial.println("Module 05 poses");
  Serial.println("A pose is four angles at one time. A gait is poses over time.");
  attachAll();
  poseCenter();
}

void loop() {
  while (Serial.available()) {
    char ch = Serial.read();
    if (ch == '\\n' || ch == '\\r') {
      handle(line);
      line = "";
    } else {
      line += ch;
    }
  }
}
`;

export const sketch06 = `${sketchBanner}
// Module 06. Conservative quadruped gait. Tunable parameters. Not a claimed arena gait.

#include <ESP32Servo.h>

${pins}

Servo servos[4];
const int SERVO_PINS[4] = {SERVO1_PIN, SERVO2_PIN, SERVO3_PIN, SERVO4_PIN};
int servoOffsets[4] = {0, 0, 0, 0};

int current[4] = {CENTER_ANGLE, CENTER_ANGLE, CENTER_ANGLE, CENTER_ANGLE};
int phase = 0;
unsigned long lastStep = 0;
int dir = 1; // 1 walk forward, -1 back
int turn = 0; // -1 left, 0 straight, 1 right
bool walking = true;

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

void stand() {
  int t[4] = {CENTER_ANGLE, CENTER_ANGLE, CENTER_ANGLE, CENTER_ANGLE};
  apply(t);
}

void gaitPhase(int p) {
  int a = STEP_ANGLE * dir;
  int biasL = turn < 0 ? STEP_ANGLE / 2 : 0;
  int biasR = turn > 0 ? STEP_ANGLE / 2 : 0;
  int t[4];
  t[0] = CENTER_ANGLE;
  t[1] = CENTER_ANGLE;
  t[2] = CENTER_ANGLE;
  t[3] = CENTER_ANGLE;

  // Two-beat diagonal. Stance holds center. Swing adds STEP_ANGLE.
  if (p == 0) {
    t[0] = CENTER_ANGLE + a - biasL;
    t[3] = CENTER_ANGLE - a + biasR;
  } else if (p == 1) {
    stand();
    return;
  } else if (p == 2) {
    t[1] = CENTER_ANGLE - a + biasR;
    t[2] = CENTER_ANGLE + a - biasL;
  } else {
    stand();
    return;
  }
  apply(t);
}

void setup() {
  Serial.begin(SERIAL_BAUD);
  delay(400);
  Serial.println("Module 06 gait");
  Serial.println("STEP_TIME STEP_ANGLE CENTER_ANGLE SERVO_MIN SERVO_MAX");
  Serial.println("Slow first. Raise STEP_ANGLE only after the robot stays up.");
  Serial.println("Serial: WALK STOP BACK LEFT RIGHT");
  attachAll();
  stand();
  lastStep = millis();
}

void loop() {
  if (Serial.available()) {
    String cmd = Serial.readStringUntil('\\n');
    cmd.trim();
    cmd.toUpperCase();
    if (cmd == "STOP") {
      walking = false;
      stand();
    } else if (cmd == "WALK") {
      walking = true;
      dir = 1;
      turn = 0;
    } else if (cmd == "BACK") {
      walking = true;
      dir = -1;
      turn = 0;
    } else if (cmd == "LEFT") {
      walking = true;
      dir = 1;
      turn = -1;
    } else if (cmd == "RIGHT") {
      walking = true;
      dir = 1;
      turn = 1;
    }
  }

  if (!walking) return;
  if (millis() - lastStep < (unsigned long)STEP_TIME) return;
  lastStep = millis();
  gaitPhase(phase);
  phase = (phase + 1) % 4;
}
`;

export const sketch07 = `${sketchBanner}
// Module 07. SH1106 eyes with Adafruit GFX. No third-party eye library.

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>

${pins}

Adafruit_SH1106G display(OLED_WIDTH, OLED_HEIGHT, &Wire, -1);

enum Face { FACE_NEUTRAL, FACE_HAPPY, FACE_ANGRY, FACE_SLEEPY, FACE_BLINK };
Face face = FACE_NEUTRAL;
unsigned long lastBlink = 0;

void drawFace(Face f, const char *status) {
  display.clearDisplay();
  int ly = 24;
  int ry = 24;
  int lx = 40;
  int rx = 88;

  if (f == FACE_BLINK) {
    display.drawLine(lx - 12, ly, lx + 12, ly, SH110X_WHITE);
    display.drawLine(rx - 12, ry, rx + 12, ry, SH110X_WHITE);
  } else {
    display.fillCircle(lx, ly, 14, SH110X_WHITE);
    display.fillCircle(rx, ry, 14, SH110X_WHITE);
    int pupil = (f == FACE_SLEEPY) ? 3 : 5;
    display.fillCircle(lx, ly + 2, pupil, 0);
    display.fillCircle(rx, ry + 2, pupil, 0);
    if (f == FACE_ANGRY) {
      display.drawLine(lx - 14, 6, lx + 10, 14, SH110X_WHITE);
      display.drawLine(rx + 14, 6, rx - 10, 14, SH110X_WHITE);
    }
    if (f == FACE_SLEEPY) {
      display.fillRect(lx - 14, ly - 14, 28, 12, 0);
      display.fillRect(rx - 14, ry - 14, 28, 12, 0);
    }
  }

  if (f == FACE_HAPPY) {
    display.drawLine(54, 48, 64, 54, SH110X_WHITE);
    display.drawLine(64, 54, 74, 48, SH110X_WHITE);
  } else if (f == FACE_SLEEPY) {
    display.drawLine(56, 50, 72, 50, SH110X_WHITE);
  } else {
    display.drawLine(56, 50, 72, 50, SH110X_WHITE);
  }

  display.setTextSize(1);
  display.setTextColor(SH110X_WHITE);
  display.setCursor(0, 56);
  display.print(status);
  display.display();
}

void setup() {
  Serial.begin(SERIAL_BAUD);
  Wire.begin(OLED_SDA, OLED_SCL);
  if (!display.begin(OLED_ADDR, true)) {
    Serial.println("SH1106 not found");
    while (true) delay(1000);
  }
  drawFace(FACE_NEUTRAL, "idle");
  Serial.println("Module 07 eyes. Serial: NEUTRAL HAPPY ANGRY SLEEPY");
}

void loop() {
  if (Serial.available()) {
    String cmd = Serial.readStringUntil('\\n');
    cmd.trim();
    cmd.toUpperCase();
    if (cmd == "HAPPY") face = FACE_HAPPY;
    else if (cmd == "ANGRY") face = FACE_ANGRY;
    else if (cmd == "SLEEPY") face = FACE_SLEEPY;
    else if (cmd == "NEUTRAL") face = FACE_NEUTRAL;
  }

  if (millis() - lastBlink > 2400) {
    drawFace(FACE_BLINK, "blink");
    delay(90);
    lastBlink = millis();
  }
  const char *label = "idle";
  if (face == FACE_HAPPY) label = "happy";
  if (face == FACE_ANGRY) label = "angry";
  if (face == FACE_SLEEPY) label = "sleepy";
  drawFace(face, label);
  delay(40);
}
`;

export const sketch08 = `${sketchBanner}
// Module 08. Real BLE control. Device name AlbertMini.
// Phone writes ASCII to the RX characteristic. Serial is a debug fallback only.

#include <ESP32Servo.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

${pins}

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
    if (ch == '\\n' || ch == '\\r') {
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
`;

export const sketch09 = `${sketchBanner}
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

${pins}

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
  Serial.println("S1 GPIO ${hardware.pins.servo1} | S2 GPIO ${hardware.pins.servo2} | S3 GPIO ${hardware.pins.servo3} | S4 GPIO ${hardware.pins.servo4}");
  Serial.println("Buzzer GPIO ${hardware.pins.buzzer} | OLED SH1106 SDA ${hardware.pins.oledSda} SCL ${hardware.pins.oledScl} addr ${hardware.oled.addressHex}");
  Serial.print("BLE name ");
  Serial.println(BLE_NAME);
  Serial.println("Core: ${coreCommands.join(" ")}");
  Serial.println("Fun (complete firmware only): ${funCommands.join(" ")}");
  Serial.println("Debug (complete firmware only): ${debugCommands.join(" ")}");
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
    if (ch == '\\n' || ch == '\\r') {
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
`;

export const sketch10 = `# Challenges

Work from Module 09 or the matching earlier module. Do not paste a full solution here. Ship one idea cleanly.

## Challenge 1. One servo at a time

Goal: Prove each leg channel is alive on the current pin map.
Starting point: Module 03.
Hint: Send S1 80 then S1 100. Repeat for S2, S3, S4. GPIO ${hardware.pins.buzzer} is the buzzer. Leave it alone.
Expected behavior: Only the named servo moves. Serial prints the GPIO you commanded.
Optional extension: Add a Serial command that sweeps one servo and holds the others at CENTER_ANGLE.

## Challenge 2. Standing pose

Goal: Make a stance that does not sag.
Starting point: Module 04 offsets plus Module 05 STAND.
Hint: Change servoOffsets[4], not random write() calls in loop.
Expected behavior: Robot holds STAND for 10 seconds without walking.
Optional extension: Save your four offsets on paper and in a comment at the top of the sketch.

## Challenge 3. Your own gait

Goal: Change timing or STEP_ANGLE without breaking SERVO_MIN and SERVO_MAX.
Starting point: Module 06.
Hint: Slow STEP_TIME first. Raise STEP_ANGLE in small steps.
Expected behavior: Repeatable forward motion that you can STOP into CENTER.
Optional extension: Add a second gait with a different STEP_TIME and switch with Serial.

## Challenge 4. New BLE command

Goal: Add one command word the phone can send to AlbertMini.
Starting point: Module 08 or 09 handleCommand().
Hint: Reuse the same parser for BLE RX and Serial debug. Do not invent a second protocol.
Expected behavior: Phone write and Serial type both trigger the same motion.
Optional extension: Notify the phone on the TX characteristic when the command is accepted.

## Challenge 5. New eye expression

Goal: Draw a face state that is not in Module 07.
Starting point: Module 07 drawFace().
Hint: Stay on Adafruit_SH110X GFX calls. Do not add an untested eye library.
Expected behavior: Named Serial command shows the new face on the SH1106.
Optional extension: Show the last BLE command on the bottom status row.

## Challenge 6. Buzzer event

Goal: Beep on a real event, not in an empty loop.
Starting point: Module 09. Buzzer is GPIO ${hardware.pins.buzzer}.
Hint: Beep on BLE connect, on STOP, or when Serial gets an unknown word.
Expected behavior: You can hear the event. Servos still use GPIO ${hardware.pins.servo1}, ${hardware.pins.servo2}, ${hardware.pins.servo3}, ${hardware.pins.servo4}.
Optional extension: Two beep patterns. Short for OK. Longer for error.

## Challenge 7. Custom dance

Goal: A 5 to 8 second routine using poses you already trust.
Starting point: Module 05 poses plus Module 09 modes.
Hint: Sequence CENTER, SIT, STAND with delays you measured. Keep angles inside SERVO_MIN and SERVO_MAX.
Expected behavior: Dance ends in CENTER. You can start it from BLE or Serial with one word.
Optional extension: Loop the dance until STOP.

## Challenge 8. Fault diagnosis

Goal: Find a planted mistake without rewriting the whole sketch.
Starting point: A copy of Module 09 where one of these is wrong: S3 pin set to ${hardware.pins.buzzer}, OLED library swapped to SSD1306, or BLE name not AlbertMini.
Hint: Use the hardware table. GPIO ${hardware.pins.servo3} is Servo 3. GPIO ${hardware.pins.buzzer} is the buzzer.
Expected behavior: You name the symptom, the cause, the check, and the fix.
Optional extension: Write that diagnosis in your vlog as SYMPTOM / CAUSE / CHECK / FIX.
`;

export const sketch11 = `# Troubleshooting

Use this order: power, wiring, then firmware. Serial Monitor at 115200 is the debug path. BLE is the phone path.

## ESP32 does not upload

SYMPTOM: Arduino IDE cannot write the sketch.
LIKELY CAUSE: Wrong board, wrong port, charge-only cable, or USB CDC Off.
CHECK: Board is ESP32C3 Dev Module. A COM port appears when USB is plugged in. Cable carries data.
FIX: Enable USB CDC On Boot. Hold BOOT if your expansion board needs it. Retry upload.

## OLED not detected

SYMPTOM: Serial prints SH1106 not found.
LIKELY CAUSE: SDA/SCL swapped, power missing, or address not ${hardware.oled.addressHex}.
CHECK: SDA is GPIO ${hardware.pins.oledSda}. SCL is GPIO ${hardware.pins.oledScl}. VCC and GND are on the logic rail. Address ${hardware.oled.addressHex}.
FIX: Use Adafruit SH110X, not Adafruit SSD1306. Call Wire.begin(${hardware.pins.oledSda}, ${hardware.pins.oledScl}) before display.begin(${hardware.oled.addressHex}, true).

## OLED detected but blank

SYMPTOM: Init succeeds. Screen stays dark.
LIKELY CAUSE: Missing display.display(), contrast, or SH1106 memory offset vs SSD1306 code.
CHECK: You call display.display() after drawing. Library is Adafruit SH110X.
FIX: Stop using SSD1306_SWITCHCAPVCC sketches. Redraw with SH110X_WHITE.

## Servo does not move

SYMPTOM: One or all servos stay still.
LIKELY CAUSE: No servo-rail power, no common GND, or wrong GPIO.
CHECK: Battery and slide switch. Common GND. S1=${hardware.pins.servo1} S2=${hardware.pins.servo2} S3=${hardware.pins.servo3} S4=${hardware.pins.servo4}. Signal wire on the servo header.
FIX: Run Module 03. Command one servo. Do not power the servo from the GPIO pin.

## Servo moves incorrectly

SYMPTOM: Wrong leg, reversed, or binding.
LIKELY CAUSE: Horn 180 degrees off, offset not calibrated, or swapped connectors.
CHECK: CENTER pose with horns aligned. servoOffsets[4] notes. Plug S3 is GPIO ${hardware.pins.servo3}, not GPIO ${hardware.pins.buzzer}.
FIX: Recenter horns. Then trim offsets. Stay inside SERVO_MIN and SERVO_MAX.

## One servo resets the ESP32

SYMPTOM: Board reboots when that servo commands.
LIKELY CAUSE: Stall current, mechanical bind, or a short on that channel.
CHECK: Move that servo by hand with power off. Watch Serial for brownout or boot messages.
FIX: Free the linkage. Confirm the signal is GPIO, not VCC. Test that servo alone.

## BLE does not advertise

SYMPTOM: Phone cannot see AlbertMini.
LIKELY CAUSE: Sketch has no BLE init, wrong name, or upload failed.
CHECK: Serial prints "BLE advertising as AlbertMini". Module 08/09, not an older Serial-only stub.
FIX: Flash Module 08 or 09. Scan for the exact name AlbertMini. nRF Connect or a UART BLE app. Write ASCII to the RX characteristic.

## BLE connects then disconnects

SYMPTOM: Link drops, often when legs move.
LIKELY CAUSE: Often power, not a BLE bug. Servo current spike, brownout, bad ground, stall, or a firmware crash.
CHECK: Serial while you walk. If you see boot or reset text after motion, it is power or a crash. If Serial stays up and only BLE dies, then inspect the BLE stack and phone app.
FIX: Fresh battery. Optional 470 µF on the servo rail. Slow STEP_TIME. Common GND. Then revisit BLE code.

## BLE command does not execute

SYMPTOM: Connected, but the robot ignores the phone.
LIKELY CAUSE: Wrong characteristic, extra spaces, or a parser that never sees the word.
CHECK: Type the same word in Serial. If Serial works, the parser is fine and the BLE write path is wrong. If both fail, fix handleCommand().
FIX: Write ASCII WALK to RX UUID ${hardware.ble.rxUuid}. Trim newlines. Core words: ${coreCommands.join(" ")}.

## Robot resets when servos move

SYMPTOM: OLED blinks off. BLE drops. Serial shows a reboot.
LIKELY CAUSE: Servo current spike on a weak cell or a shared rail dip.
CHECK: Voltage under load. Switch on. Optional 470 µF. USB-only power with four servos is a common fail.
FIX: Battery on the holder. Reduce STEP_ANGLE. Do not add a PCA9685 to "fix" power. This kit drives servos from the ESP32-C3.

## Buzzer does not work

SYMPTOM: No beep on BEEP.
LIKELY CAUSE: Wired to a servo pin, or GPIO ${hardware.pins.buzzer} still treated as an old servo map.
CHECK: Buzzer signal is GPIO ${hardware.pins.buzzer}. Servo 3 is GPIO ${hardware.pins.servo3}. Common GND.
FIX: Module 09 BEEP. Do not attach a Servo object to GPIO ${hardware.pins.buzzer}.

## Wrong servo direction

SYMPTOM: Walks backward or twists.
LIKELY CAUSE: Mirrored horn or inverted offset.
CHECK: CENTER, then one STEP_ANGLE on S1 only.
FIX: Flip the horn or negate that servoOffsets entry. Recalibrate before you rewrite gait math.

## Gait is unstable / robot falls

SYMPTOM: Tips, chatters, or splits.
LIKELY CAUSE: STEP_ANGLE too large, STEP_TIME too short, neutrals still wrong.
CHECK: STAND for 10 seconds. Then walk with STEP_ANGLE 8 and a slower STEP_TIME.
FIX: Calibrate first. Conservative parameters are the workshop default. Smooth later.

## Serial vs BLE debug path

Phone -> BLE AlbertMini -> ESP32-C3 parser -> robot action.

Serial Monitor -> ESP32-C3 parser -> robot action.

If the command works on Serial and fails on BLE, debug BLE writes and advertising.
If it fails on both, debug poses, power, and wiring.
If BLE drops and Serial shows a reset, debug power before you rewrite BLE.

## BLE disconnect vs power

BLE disconnect is not automatically a software bug.
Servo spikes can reset the ESP32. A reset looks like a BLE drop.
Watch Serial for rst: or brownout after a step.
Optional 470 µF is stabilization, not a bigger battery.
Power switching and rails are as on the expansion board.

## Never

Do not add an external PCA9685 for this kit.
Do not power a servo from GPIO.
Do not put a servo on GPIO 2 or GPIO 5 because an older page said so.
Do not put a servo on GPIO ${hardware.pins.buzzer}. GPIO ${hardware.pins.buzzer} is the buzzer.
`;

export const firmwareReadme = `# Albert Mini firmware

Current workshop robot. Organizer: Robotics & Automation Club, TSEC. Aurigen hosts the lab page. Aurigen is not the organizer.

These files are generated from \`src/content/labs/esp32-walking-robot/firmware.ts\` and \`hardware.ts\`.

Pin map:

- Servo 1 GPIO ${hardware.pins.servo1}
- Servo 2 GPIO ${hardware.pins.servo2}
- Servo 3 GPIO ${hardware.pins.servo3}
- Buzzer GPIO ${hardware.pins.buzzer}
- OLED SH1106 SDA GPIO ${hardware.pins.oledSda}
- OLED SH1106 SCL GPIO ${hardware.pins.oledScl}
- Servo 4 GPIO ${hardware.pins.servo4}

OLED controller is SH1106 at ${hardware.oled.addressHex}. BLE name is ${hardware.ble.deviceName}.

Core commands: ${coreCommands.join(" ")}
Fun commands (complete firmware only, 09_complete.ino): ${funCommands.join(" ")}
Debug (complete firmware only): ${debugCommands.join(" ")}

Sketches are a reference implementation. Compile on your laptop with Arduino IDE and the libraries listed on the lab page.
`;

export const firmwareFiles: Record<string, string> = {
  "config.h": configH,
  "01_setup.ino": sketch01,
  "02_oled.ino": sketch02,
  "03_servo_test.ino": sketch03,
  "04_calibration.ino": sketch04,
  "05_poses.ino": sketch05,
  "06_gait.ino": sketch06,
  "07_eyes.ino": sketch07,
  "08_ble_control.ino": sketch08,
  "09_complete.ino": sketch09,
  "10_challenges.md": sketch10,
  "11_troubleshooting.md": sketch11,
  "README.md": firmwareReadme,
};
