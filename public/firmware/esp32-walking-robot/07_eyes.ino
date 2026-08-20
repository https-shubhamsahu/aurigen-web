// Albert Mini. Current workshop robot.
// Organizer: Robotics & Automation Club, TSEC. Aurigen hosts this lab page. Aurigen is not the organizer.
// Reference implementation. Not labeled as final-tested hardware validation.
// Module 07. SH1106 eyes with Adafruit GFX. No third-party eye library.

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>

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
    String cmd = Serial.readStringUntil('\n');
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
