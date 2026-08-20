// Albert Mini. Current workshop robot.
// Organizer: Robotics & Automation Club, TSEC. Aurigen hosts this lab page. Aurigen is not the organizer.
// Reference implementation. Not labeled as final-tested hardware validation.
// Module 01. ESP32-C3 bring-up. No servos. No OLED. No buzzer.

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

// LED_BUILTIN caveat:
// On many ESP32-C3 boards LED_BUILTIN is GPIO 8.
// GPIO 8 is OLED SDA on this robot. Do not blink it.

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
