// Albert Mini. Current workshop robot.
// Organizer: Robotics & Automation Club, TSEC. Aurigen hosts this lab page. Aurigen is not the organizer.
// Reference implementation. Not labeled as final-tested hardware validation.
// Module 02. 0.96 inch SH1106 OLED on I2C.
// Library: Adafruit SH110X + Adafruit GFX. Not Adafruit SSD1306.

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

void setup() {
  Serial.begin(SERIAL_BAUD);
  delay(400);
  Serial.println("Module 02 OLED SH1106");
  Wire.begin(OLED_SDA, OLED_SCL);

  if (!display.begin(OLED_ADDR, true)) {
    Serial.println("SH1106 not found at 0x3C");
    Serial.println("Check SDA GPIO 8, SCL GPIO 9, VCC, GND.");
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
  display.println("SDA GPIO 8");
  display.println("SCL GPIO 9");
  display.println("addr 0x3C");
  display.display();
  Serial.println("OLED init OK. Text should be on the screen.");
}

void loop() {}
