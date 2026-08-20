// Albert Mini. Current workshop robot.
// Organizer: Robotics & Automation Club, TSEC. Aurigen hosts this lab page. Aurigen is not the organizer.
// Reference implementation. Not labeled as final-tested hardware validation.
// Module 03. Four servo test. Direct ESP32-C3 PWM. No PCA9685.
// Serial commands: S1 90   S2 90   S3 90   S4 90   CENTER   SWEEP
// GPIO is SIGNAL only. Servo VCC is the servo power rail. Never a GPIO pin.

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
  Serial.println("S1 GPIO 0 | S2 GPIO 1 | S3 GPIO 3 | S4 GPIO 10");
  Serial.println("GPIO 4 is the buzzer. Do not treat GPIO 4 as a servo.");
  Serial.println("Power servos from the servo rail. GPIO is signal only.");
  attachAll();
  centerAll();
  Serial.println("Ready. Type S1 90");
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
