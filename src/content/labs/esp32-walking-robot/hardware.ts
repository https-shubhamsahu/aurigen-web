/**
 * Current workshop hardware. Single source of truth for pins, BLE, and libraries.
 * Physical robot is authoritative. Do not teach GPIO 2-5 as servo pins.
 */

export const FIRMWARE_PUBLIC_DIR = "/firmware/esp32-walking-robot";

export const hardware = {
  robotName: "Albert Mini",
  boardLabel: "ESP32C3 Dev Module",
  organizer: "Robotics & Automation Club, TSEC",
  oled: {
    controller: "SH1106",
    sizeInches: "0.96",
    width: 128,
    height: 64,
    address: 0x3c,
    addressHex: "0x3C",
  },
  pins: {
    servo1: 0,
    servo2: 1,
    servo3: 3,
    buzzer: 4,
    oledSda: 8,
    oledScl: 9,
    servo4: 10,
  },
  ble: {
    deviceName: "AlbertMini",
    serviceUuid: "6E400001-B5A3-F393-E0A9-E50E24DCCA9E",
    rxUuid: "6E400002-B5A3-F393-E0A9-E50E24DCCA9E",
    txUuid: "6E400003-B5A3-F393-E0A9-E50E24DCCA9E",
  },
  gait: {
    stepTime: 180,
    stepAngle: 12,
    centerAngle: 90,
    servoMin: 50,
    servoMax: 130,
  },
  servoPulseUs: { min: 500, max: 2400 },
  serialBaud: 115200,
} as const;

export const coreCommands = [
  "WALK",
  "STOP",
  "CENTER",
  "LEFT",
  "RIGHT",
  "BACK",
  "REST",
  "BEEP",
] as const;

export const funCommands = ["PUSHUPS", "SWING", "GALLOP"] as const;

export const debugCommands = ["INFO"] as const;

export const libraries = [
  {
    name: "esp32 board support",
    via: "Arduino Boards Manager. Package: esp32 by Espressif Systems.",
    requiredFor: "All modules",
  },
  {
    name: "ESP32Servo",
    via: "Library Manager",
    requiredFor: "Modules 03-06, 08, 09",
  },
  {
    name: "Adafruit GFX Library",
    via: "Library Manager",
    requiredFor: "Modules 02, 07, 09",
  },
  {
    name: "Adafruit SH110X",
    via: "Library Manager. This is SH1106. Not Adafruit SSD1306.",
    requiredFor: "Modules 02, 07, 09",
  },
  {
    name: "Adafruit BusIO",
    via: "Library Manager. Dependency of Adafruit SH110X.",
    requiredFor: "Modules 02, 07, 09",
  },
  {
    name: "ESP32 BLE (Bluedroid)",
    via: "Bundled with the esp32 core. Headers BLEDevice.h, BLEServer.h, BLEUtils.h, BLE2902.h.",
    requiredFor: "Modules 08 and 09",
  },
] as const;

export const wiringSignalRows = [
  {
    component: "Servo 1",
    signal: "Signal",
    gpio: hardware.pins.servo1,
    note: "PWM control only. Not power.",
  },
  {
    component: "Servo 2",
    signal: "Signal",
    gpio: hardware.pins.servo2,
    note: "PWM control only. Not power.",
  },
  {
    component: "Servo 3",
    signal: "Signal",
    gpio: hardware.pins.servo3,
    note: `GPIO ${hardware.pins.servo3} is Servo 3. It is not the buzzer.`,
  },
  {
    component: "Servo 4",
    signal: "Signal",
    gpio: hardware.pins.servo4,
    note: "PWM control only. Not power.",
  },
  {
    component: "Buzzer",
    signal: "Signal",
    gpio: hardware.pins.buzzer,
    note: `GPIO ${hardware.pins.buzzer} is the buzzer. Older examples used GPIO ${hardware.pins.buzzer} as a servo. That is not this robot.`,
  },
  {
    component: "OLED SH1106",
    signal: "SDA",
    gpio: hardware.pins.oledSda,
    note: `I2C data. Address ${hardware.oled.addressHex}.`,
  },
  {
    component: "OLED SH1106",
    signal: "SCL",
    gpio: hardware.pins.oledScl,
    note: "I2C clock.",
  },
] as const;

export const wiringPowerNotes = [
  "Servo VCC goes to the servo power rail on the expansion board. Never to a GPIO pin.",
  "Servo GND, OLED GND, buzzer GND, and ESP32 GND share one common ground.",
  "OLED VCC goes to the logic supply on the expansion board, usually 3.3 V. Match the silkscreen.",
  "Battery is one 3.7 V Li-ion cell in the holder. The slide switch sits in the power path.",
  "Power switching and rails are as built on the expansion board. This lab does not name a boost converter IC because the workshop source does not document one.",
  "Optional 470 µF across the servo rail near the board. That is bulk stabilization for servo current spikes. It is not a substitute for a healthy battery.",
] as const;

export const ledBuiltinCaveat = [
  `On many ESP32-C3 boards, LED_BUILTIN is GPIO ${hardware.pins.oledSda}.`,
  `GPIO ${hardware.pins.oledSda} is OLED SDA on the current workshop robot.`,
  "Do not blink LED_BUILTIN while the OLED is wired. You will glitch I2C.",
  "Module 01 uses Serial as the alive check.",
] as const;

export function cPinDefines(): string {
  const p = hardware.pins;
  const g = hardware.gait;
  const ble = hardware.ble;
  return `// Current workshop robot. GPIO is SIGNAL only. Do not power a servo from a GPIO pin.
// Servo 1 GPIO ${p.servo1} | Servo 2 GPIO ${p.servo2} | Servo 3 GPIO ${p.servo3} | Servo 4 GPIO ${p.servo4}
// Buzzer GPIO ${p.buzzer} (not a servo) | OLED SH1106 SDA GPIO ${p.oledSda} SCL GPIO ${p.oledScl} addr ${hardware.oled.addressHex}

#define SERVO1_PIN ${p.servo1}
#define SERVO2_PIN ${p.servo2}
#define SERVO3_PIN ${p.servo3}
#define SERVO4_PIN ${p.servo4}
#define BUZZER_PIN ${p.buzzer}
#define OLED_SDA ${p.oledSda}
#define OLED_SCL ${p.oledScl}
#define OLED_ADDR ${hardware.oled.addressHex}
#define OLED_WIDTH ${hardware.oled.width}
#define OLED_HEIGHT ${hardware.oled.height}

#define BLE_NAME "${ble.deviceName}"
#define BLE_SERVICE_UUID "${ble.serviceUuid}"
#define BLE_RX_UUID "${ble.rxUuid}"
#define BLE_TX_UUID "${ble.txUuid}"

#define CENTER_ANGLE ${g.centerAngle}
#define STEP_ANGLE ${g.stepAngle}
#define STEP_TIME ${g.stepTime}
#define SERVO_MIN ${g.servoMin}
#define SERVO_MAX ${g.servoMax}
#define SERVO_PULSE_MIN ${hardware.servoPulseUs.min}
#define SERVO_PULSE_MAX ${hardware.servoPulseUs.max}
#define SERIAL_BAUD ${hardware.serialBaud}`;
}

export function firmwareDownloadPath(filename: string): string {
  return `${FIRMWARE_PUBLIC_DIR}/${filename}`;
}
