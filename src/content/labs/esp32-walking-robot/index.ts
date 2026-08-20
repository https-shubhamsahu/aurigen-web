/**
 * Progressive Code Library modules for ESP32-C3 walking robot.
 * Servos driven directly by ESP32-C3 GPIO. No PCA9685.
 */

import type { CodeModule } from "@/types/workshop-ecosystem";

export const labMeta = {
  title: "ESP32 Walking Robot Code | Aurigen Labs",
  description:
    "Progressive ESP32-C3 walking robot modules: setup, OLED, servos, gait, BLE, challenges, and troubleshooting.",
};

export const codeModules: CodeModule[] = [
  {
    id: "01",
    order: 1,
    slug: "esp32-setup",
    title: "ESP32 Setup",
    tier: "start-here",
    difficulty: "beginner",
    objective: "Flash a blink sketch and confirm the ESP32-C3 board is alive.",
    learn: [
      "Install ESP32 board support in Arduino IDE",
      "Select the correct ESP32-C3 board and COM port",
      "Upload firmware and read Serial output",
    ],
    wiring: [
      "USB data cable to the ESP32-C3 expansion board",
      "No servos required for this module",
    ],
    code: [
      {
        filename: "01_esp32_setup.ino",
        language: "cpp",
        code: `// ESP32-C3 Walking Robot - Module 01: Setup
// Board: ESP32C3 Dev Module (or your expansion board profile)

void setup() {
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.println("ESP32-C3 online");
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(400);
  digitalWrite(LED_BUILTIN, LOW);
  delay(400);
}
`,
      },
    ],
    explanation:
      "This proves toolchain, drivers, and board selection before you touch motors. If blink fails, stop and fix USB or board settings.",
    expectedResult:
      "Serial prints ESP32-C3 online. Onboard LED blinks about once per second.",
    commonMistakes: [
      "Wrong board selected (use ESP32-C3, not classic ESP32)",
      "Charge-only USB cable",
      "Wrong COM port",
    ],
    nextStep: "Wire the OLED and run Module 02.",
  },
  {
    id: "02",
    order: 2,
    slug: "oled-test",
    title: "OLED Test",
    tier: "start-here",
    difficulty: "beginner",
    objective: "Show text on the 0.96\" OLED over I2C.",
    learn: [
      "I2C pins on the expansion board",
      "Adafruit SSD1306 / GFX basics",
      "Drawing simple text frames",
    ],
    wiring: [
      "OLED VCC → 3V3",
      "OLED GND → GND",
      "OLED SDA → board SDA (often GPIO8 on ESP32-C3 kits)",
      "OLED SCL → board SCL (often GPIO9)",
      "Confirm pin labels on your expansion board silkscreen",
    ],
    code: [
      {
        filename: "02_oled_test.ino",
        language: "cpp",
        code: `#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_ADDR 0x3C

// Adjust if your expansion board uses different I2C pins
#define I2C_SDA 8
#define I2C_SCL 9

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

void setup() {
  Serial.begin(115200);
  Wire.begin(I2C_SDA, I2C_SCL);

  if (!display.begin(SSD1306_SWITCHCAPVCC, OLED_ADDR)) {
    Serial.println("OLED not found");
    while (true) delay(1000);
  }

  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.println("ESP32-C3");
  display.println("Walking Robot");
  display.println("OLED OK");
  display.display();
}

void loop() {}
`,
      },
    ],
    explanation:
      "The OLED is your debug surface. Get I2C working before complex motion code.",
    expectedResult: "Screen shows ESP32-C3 / Walking Robot / OLED OK.",
    commonMistakes: [
      "Wrong I2C pins for your board",
      "Address 0x3C vs 0x3D",
      "Missing pull-ups (most modules include them)",
    ],
    nextStep: "Attach one servo and run Module 03.",
  },
  {
    id: "03",
    order: 3,
    slug: "servo-test",
    title: "Servo Test",
    tier: "workshop",
    difficulty: "beginner",
    objective: "Drive a single servo with ESP32Servo on a GPIO pin.",
    learn: [
      "ESP32 PWM servo control",
      "Safe angle ranges",
      "Why power and signal grounds must share GND",
    ],
    wiring: [
      "Servo signal → GPIO2 (example; match your loom)",
      "Servo V+ → battery positive (not flimsy USB-only power under load)",
      "Servo GND → common GND with ESP32-C3",
      "Optional 470µF across battery rails near the board",
    ],
    code: [
      {
        filename: "03_servo_test.ino",
        language: "cpp",
        code: `#include <ESP32Servo.h>

// Direct GPIO. No PCA9685.
const int SERVO_PIN = 2;
Servo leg;

void setup() {
  Serial.begin(115200);
  leg.setPeriodHertz(50);
  leg.attach(SERVO_PIN, 500, 2400);
  Serial.println("Servo test");
}

void loop() {
  leg.write(60);
  delay(700);
  leg.write(120);
  delay(700);
}
`,
      },
    ],
    explanation:
      "ESP32-C3 generates servo PWM on GPIO. Keep angles gentle until the mechanics are assembled.",
    expectedResult: "Servo sweeps between two positions smoothly.",
    commonMistakes: [
      "Powering four servos from USB alone",
      "Missing common ground",
      "Angles that bind the mechanical linkage",
    ],
    nextStep: "Calibrate all four servos in Module 04.",
  },
  {
    id: "04",
    order: 4,
    slug: "servo-calibration",
    title: "Servo Calibration",
    tier: "workshop",
    difficulty: "beginner",
    objective: "Find neutral standing angles for all four servos.",
    learn: [
      "Neutral pose mapping",
      "Named pin constants",
      "Serial-assisted tuning",
    ],
    wiring: [
      "Map four servo signals to four GPIOs on the expansion board",
      "Example map: FL=2, FR=3, RL=4, RR=5 (replace with your pinout)",
      "Shared battery power and GND",
    ],
    code: [
      {
        filename: "04_servo_calibration.ino",
        language: "cpp",
        code: `#include <ESP32Servo.h>

const int PIN_FL = 2;
const int PIN_FR = 3;
const int PIN_RL = 4;
const int PIN_RR = 5;

// Tune these until the robot stands square
int NEUTRAL_FL = 90;
int NEUTRAL_FR = 90;
int NEUTRAL_RL = 90;
int NEUTRAL_RR = 90;

Servo fl, fr, rl, rr;

void attachAll() {
  fl.setPeriodHertz(50); fr.setPeriodHertz(50);
  rl.setPeriodHertz(50); rr.setPeriodHertz(50);
  fl.attach(PIN_FL, 500, 2400);
  fr.attach(PIN_FR, 500, 2400);
  rl.attach(PIN_RL, 500, 2400);
  rr.attach(PIN_RR, 500, 2400);
}

void stand() {
  fl.write(NEUTRAL_FL);
  fr.write(NEUTRAL_FR);
  rl.write(NEUTRAL_RL);
  rr.write(NEUTRAL_RR);
}

void setup() {
  Serial.begin(115200);
  attachAll();
  stand();
  Serial.println("Standing at neutrals. Edit NEUTRAL_* and reflash.");
}

void loop() {
  stand();
  delay(1000);
}
`,
      },
    ],
    explanation:
      "Calibration is mechanical truth. Write down your neutrals. Gait code depends on them.",
    expectedResult: "Robot stands level without leaning or scraping.",
    commonMistakes: [
      "Mirrored left/right horns mounted wrong",
      "Skipping written notes of final angles",
      "Calibrating with a dying battery",
    ],
    nextStep: "Build a basic step in Module 05.",
  },
  {
    id: "05",
    order: 5,
    slug: "basic-movement",
    title: "Basic Movement",
    tier: "workshop",
    difficulty: "intermediate",
    objective: "Lift one diagonal pair and shift the body forward.",
    learn: [
      "Diagonal gait idea",
      "Timed sequences",
      "Small deltas from neutral",
    ],
    wiring: ["Same four-servo loom as Module 04"],
    code: [
      {
        filename: "05_basic_movement.ino",
        language: "cpp",
        code: `#include <ESP32Servo.h>

const int PIN_FL = 2, PIN_FR = 3, PIN_RL = 4, PIN_RR = 5;
int N_FL = 90, N_FR = 90, N_RL = 90, N_RR = 90;

Servo fl, fr, rl, rr;

void attachAll() {
  fl.setPeriodHertz(50); fr.setPeriodHertz(50);
  rl.setPeriodHertz(50); rr.setPeriodHertz(50);
  fl.attach(PIN_FL, 500, 2400);
  fr.attach(PIN_FR, 500, 2400);
  rl.attach(PIN_RL, 500, 2400);
  rr.attach(PIN_RR, 500, 2400);
}

void writeAll(int a, int b, int c, int d) {
  fl.write(a); fr.write(b); rl.write(c); rr.write(d);
}

void stand() { writeAll(N_FL, N_FR, N_RL, N_RR); }

void stepForward() {
  // Lift FL + RR
  writeAll(N_FL - 20, N_FR, N_RL, N_RR - 20);
  delay(200);
  // Push body
  writeAll(N_FL - 10, N_FR + 10, N_RL - 10, N_RR - 10);
  delay(200);
  stand();
  delay(200);
  // Lift FR + RL
  writeAll(N_FL, N_FR - 20, N_RL - 20, N_RR);
  delay(200);
  writeAll(N_FL + 10, N_FR - 10, N_RL - 10, N_RR + 10);
  delay(200);
  stand();
}

void setup() {
  Serial.begin(115200);
  attachAll();
  stand();
  delay(800);
}

void loop() {
  stepForward();
  delay(400);
}
`,
      },
    ],
    explanation:
      "Start with tiny angle deltas. Increase only after the robot stays upright.",
    expectedResult: "Robot inches forward without collapsing.",
    commonMistakes: [
      "Huge angles that tip the frame",
      "Delays too short for the mechanics",
      "Neutrals still wrong from Module 04",
    ],
    nextStep: "Turn the step into a repeatable gait in Module 06.",
  },
  {
    id: "06",
    order: 6,
    slug: "robot-gait",
    title: "Robot Gait",
    tier: "workshop",
    difficulty: "intermediate",
    objective: "Package walk cycles into reusable functions with speed control.",
    learn: [
      "Gait functions",
      "Speed vs stability tradeoff",
      "Safe stop / stand",
    ],
    wiring: ["Four servos on calibrated GPIOs"],
    code: [
      {
        filename: "06_robot_gait.ino",
        language: "cpp",
        code: `#include <ESP32Servo.h>

const int PIN_FL = 2, PIN_FR = 3, PIN_RL = 4, PIN_RR = 5;
int N_FL = 90, N_FR = 90, N_RL = 90, N_RR = 90;
int paceMs = 180;

Servo fl, fr, rl, rr;

void attachAll() {
  fl.setPeriodHertz(50); fr.setPeriodHertz(50);
  rl.setPeriodHertz(50); rr.setPeriodHertz(50);
  fl.attach(PIN_FL, 500, 2400);
  fr.attach(PIN_FR, 500, 2400);
  rl.attach(PIN_RL, 500, 2400);
  rr.attach(PIN_RR, 500, 2400);
}

void pose(int a, int b, int c, int d) {
  fl.write(a); fr.write(b); rl.write(c); rr.write(d);
  delay(paceMs);
}

void stand() { pose(N_FL, N_FR, N_RL, N_RR); }

void walkCycle() {
  pose(N_FL - 18, N_FR + 6, N_RL + 6, N_RR - 18);
  pose(N_FL - 8, N_FR + 12, N_RL - 8, N_RR - 8);
  pose(N_FL, N_FR, N_RL, N_RR);
  pose(N_FL + 6, N_FR - 18, N_RL - 18, N_RR + 6);
  pose(N_FL + 12, N_FR - 8, N_RL - 8, N_RR + 12);
  pose(N_FL, N_FR, N_RL, N_RR);
}

void setup() {
  Serial.begin(115200);
  attachAll();
  stand();
}

void loop() {
  walkCycle();
}
`,
      },
    ],
    explanation:
      "paceMs is your main stability knob. Slow first. Speed later.",
    expectedResult: "Continuous walking with a recoverable stand pose.",
    commonMistakes: [
      "Tuning speed before balance",
      "No stand() recovery after crashes",
    ],
    nextStep: "Animate the OLED in Module 07.",
  },
  {
    id: "07",
    order: 7,
    slug: "oled-animation",
    title: "OLED Animation",
    tier: "challenge",
    difficulty: "intermediate",
    objective: "Show a blinking face while the robot is idle or walking.",
    learn: ["Frame timing", "Simple facial states", "Non-blocking friendly patterns"],
    wiring: ["OLED on I2C as in Module 02", "Servos optional for this sketch"],
    code: [
      {
        filename: "07_oled_animation.ino",
        language: "cpp",
        code: `#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define I2C_SDA 8
#define I2C_SCL 9
Adafruit_SSD1306 display(128, 64, &Wire, -1);

void faceOpen() {
  display.clearDisplay();
  display.drawCircle(40, 28, 10, SSD1306_WHITE);
  display.drawCircle(88, 28, 10, SSD1306_WHITE);
  display.fillCircle(40, 28, 3, SSD1306_WHITE);
  display.fillCircle(88, 28, 3, SSD1306_WHITE);
  display.drawLine(48, 48, 80, 48, SSD1306_WHITE);
  display.display();
}

void faceBlink() {
  display.clearDisplay();
  display.drawLine(30, 28, 50, 28, SSD1306_WHITE);
  display.drawLine(78, 28, 98, 28, SSD1306_WHITE);
  display.drawLine(48, 48, 80, 48, SSD1306_WHITE);
  display.display();
}

void setup() {
  Wire.begin(I2C_SDA, I2C_SCL);
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  faceOpen();
}

void loop() {
  faceOpen();
  delay(900);
  faceBlink();
  delay(120);
}
`,
      },
    ],
    explanation:
      "Personality is a product feature. Teams that ship faces stand out in the arena.",
    expectedResult: "Eyes blink on a loop.",
    commonMistakes: ["Blocking delays starving walk loops", "Cluttered full-screen redraws"],
    nextStep: "Add BLE commands in Module 08.",
  },
  {
    id: "08",
    order: 8,
    slug: "ble-control",
    title: "BLE Control",
    tier: "workshop",
    difficulty: "intermediate",
    objective: "Accept simple BLE UART commands to stand or walk.",
    learn: ["NimBLE or ESP32 BLE UART patterns", "Command parsing", "Fail-safe stand"],
    wiring: ["Fully assembled robot", "Phone with a BLE serial app"],
    code: [
      {
        filename: "08_ble_control.ino",
        language: "cpp",
        code: `// Simplified BLE command stub for ESP32-C3.
// Install a BLE UART library matching your Arduino-ESP32 core
// (e.g. ESP32 BLE Arduino examples) and merge with gait functions.

#include <ESP32Servo.h>

const int PIN_FL = 2, PIN_FR = 3, PIN_RL = 4, PIN_RR = 5;
int N_FL = 90, N_FR = 90, N_RL = 90, N_RR = 90;
Servo fl, fr, rl, rr;
String cmd;

void stand() {
  fl.write(N_FL); fr.write(N_FR); rl.write(N_RL); rr.write(N_RR);
}

void setup() {
  Serial.begin(115200);
  fl.attach(PIN_FL, 500, 2400);
  fr.attach(PIN_FR, 500, 2400);
  rl.attach(PIN_RL, 500, 2400);
  rr.attach(PIN_RR, 500, 2400);
  stand();
  Serial.println("BLE merge point: map RX text to commands");
  Serial.println("Commands: STAND / WALK");
}

void handle(const String& c) {
  if (c == "STAND") stand();
  if (c == "WALK") Serial.println("Call walkCycle() here");
}

void loop() {
  // Replace Serial with BLE UART RX when library is linked
  while (Serial.available()) {
    char ch = Serial.read();
    if (ch == '\\n') {
      cmd.trim();
      handle(cmd);
      cmd = "";
    } else {
      cmd += ch;
    }
  }
}
`,
      },
    ],
    explanation:
      "Keep motion functions pure. BLE only sends verbs. Stand is always available.",
    expectedResult: "STAND / WALK commands trigger matching behavior.",
    commonMistakes: [
      "Blocking BLE callbacks with long delays",
      "No stand fail-safe",
    ],
    nextStep: "Merge OLED + gait + BLE in Module 09.",
  },
  {
    id: "09",
    order: 9,
    slug: "combined-firmware",
    title: "Combined Robot Firmware",
    tier: "workshop",
    difficulty: "advanced",
    objective: "Ship a baseline workshop firmware structure teams can fork.",
    learn: ["File structure", "State machine sketch", "Workshop baseline"],
    wiring: ["Full robot: ESP32-C3, 4 servos, OLED, battery, switch"],
    code: [
      {
        filename: "09_combined_robot.ino",
        language: "cpp",
        code: `// Workshop baseline structure (ESP32-C3 direct servos)
// Expand with your calibrated neutrals + walkCycle + OLED frames.

enum Mode { MODE_STAND, MODE_WALK, MODE_DANCE };
Mode mode = MODE_STAND;

void setupRobot() {
  // attach servos, init OLED, optional BLE
}

void updateStand() { /* neutrals */ }
void updateWalk() { /* walkCycle */ }
void updateDance() { /* challenge hook */ }

void setup() {
  Serial.begin(115200);
  setupRobot();
}

void loop() {
  switch (mode) {
    case MODE_STAND: updateStand(); break;
    case MODE_WALK: updateWalk(); break;
    case MODE_DANCE: updateDance(); break;
  }
}
`,
      },
    ],
    explanation:
      "A tiny state machine keeps challenges from becoming spaghetti.",
    expectedResult: "Clear modes you can switch from Serial or BLE.",
    commonMistakes: ["Copy-pasting three full sketches with conflicting pins"],
    nextStep: "Pick a challenge from Module 10.",
  },
  {
    id: "10",
    order: 10,
    slug: "challenges",
    title: "Challenges",
    tier: "challenge",
    difficulty: "advanced",
    objective: "Pick one arena challenge and ship it cleanly.",
    learn: ["Scope control", "Demo readiness", "Feature cut lines"],
    wiring: ["Stable walk first, then challenge hardware/software only"],
    code: [
      {
        filename: "10_challenges.md",
        language: "markdown",
        code: `# Challenge menu

1. Servo Challenge: smoother motion, less jitter
2. OLED Challenge: expressive face + battery status
3. BLE Challenge: at least three reliable commands
4. Robot Personality: idle animations that feel alive
5. Hack the Robot: one bold custom feature
6. Robot Arena: compete with what you actually finished

Rule: one primary challenge for judging. Extras are bonus.
`,
      },
    ],
    explanation:
      "Finished beats fancy. Judges notice reliability.",
    expectedResult: "A demo you can restart in under 30 seconds.",
    commonMistakes: ["Starting three challenges and finishing none"],
    nextStep: "Use Module 11 when something breaks.",
  },
  {
    id: "11",
    order: 11,
    slug: "troubleshooting",
    title: "Troubleshooting",
    tier: "start-here",
    difficulty: "beginner",
    objective: "Debug power, wiring, and firmware failures systematically.",
    learn: ["Power first", "Signal second", "Code third", "Mechanics last"],
    wiring: ["Recheck battery polarity, switch, common GND, servo plugs"],
    code: [
      {
        filename: "11_troubleshooting.md",
        language: "markdown",
        code: `# Debug order

1. Battery voltage under load
2. Slide switch actually on
3. Common GND between battery rail and ESP32
4. One servo alone on known-good GPIO
5. OLED I2C scan
6. Neutral angles on paper
7. Reduce gait deltas by half

# Symptoms

- Brownout / reboot while walking: power or missing capacitor
- One leg dead: signal wire or attach pin
- OLED blank: I2C pins / address
- Spins in place: mirrored neutrals

# Never

Do not add an external PCA9685 for this workshop kit.
Servos are driven directly by the ESP32-C3.
`,
      },
    ],
    explanation:
      "Most arena failures are power and calibration, not clever code.",
    expectedResult: "A checklist you can run in two minutes.",
    commonMistakes: ["Rewriting gait before measuring battery voltage"],
    nextStep: "Return to the hub and ship your builder profile.",
  },
];

export function getModule(id: string): CodeModule | undefined {
  return codeModules.find((m) => m.id === id || m.slug === id);
}

export const labSections = [
  {
    id: "start-here",
    title: "Start Here",
    detail: "Board bring-up and first sensors.",
    tier: "start-here" as const,
  },
  {
    id: "workshop",
    title: "Workshop Version",
    detail: "Baseline path used during Day 1 and Day 2.",
    tier: "workshop" as const,
  },
  {
    id: "challenge",
    title: "Challenge Version",
    detail: "Personality, hacks, and arena extras.",
    tier: "challenge" as const,
  },
  {
    id: "community",
    title: "Community Contributions",
    detail: "Team forks and improvements land here later.",
    tier: "community" as const,
  },
] as const;
