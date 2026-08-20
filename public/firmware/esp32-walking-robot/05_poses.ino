// Albert Mini. Current workshop robot.
// Organizer: Robotics & Automation Club, TSEC. Aurigen hosts this lab page. Aurigen is not the organizer.
// Reference implementation. Not labeled as final-tested hardware validation.
// Module 05. Poses. Coordinated angles. This is not a gait yet.

#include <ESP32Servo.h>

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
    if (ch == '\n' || ch == '\r') {
      handle(line);
      line = "";
    } else {
      line += ch;
    }
  }
}
