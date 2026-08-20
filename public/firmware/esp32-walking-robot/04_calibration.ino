// Albert Mini. Current workshop robot.
// Organizer: Robotics & Automation Club, TSEC. Aurigen hosts this lab page. Aurigen is not the organizer.
// Reference implementation. Not labeled as final-tested hardware validation.
// Module 04. Calibration. Named S1-S4 on the current GPIOs.
// Tune servoOffsets[4] until the stance is square. Do not copy someone else's numbers.

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
    if (ch == '\n' || ch == '\r') {
      handle(line);
      line = "";
    } else {
      line += ch;
    }
  }
}
