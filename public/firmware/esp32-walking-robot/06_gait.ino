// Albert Mini. Current workshop robot.
// Organizer: Robotics & Automation Club, TSEC. Aurigen hosts this lab page. Aurigen is not the organizer.
// Reference implementation. Not labeled as final-tested hardware validation.
// Module 06. Conservative quadruped gait. Tunable parameters. Not a claimed arena gait.

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
    String cmd = Serial.readStringUntil('\n');
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
