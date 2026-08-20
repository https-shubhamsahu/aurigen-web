/**
 * Progressive Code Library for the current Albert Mini workshop robot.
 * Pins, BLE, and sketches come from hardware.ts and firmware.ts.
 */

import type { CodeModule } from "@/types/workshop-ecosystem";
import { coreCommands, funCommands, hardware } from "./hardware";
import {
  sketch01,
  sketch02,
  sketch03,
  sketch04,
  sketch05,
  sketch06,
  sketch07,
  sketch08,
  sketch09,
  sketch10,
  sketch11,
} from "./firmware";

export { hardware } from "./hardware";
export { firmwareFiles } from "./firmware";

export const labMeta = {
  title: "ESP32 Walking Robot Code | Aurigen Labs",
  description:
    "Progressive ESP32-C3 walking robot modules for the current Albert Mini kit. SH1106 OLED, direct servo GPIO, real BLE as AlbertMini.",
};

const p = hardware.pins;

export const codeModules: CodeModule[] = [
  {
    id: "01",
    order: 1,
    slug: "esp32-setup",
    title: "ESP32-C3 Setup",
    tier: "start-here",
    difficulty: "beginner",
    badge: "Example code",
    objective:
      "Install Arduino IDE, select ESP32C3 Dev Module, upload a sketch, and prove Serial works.",
    learn: [
      "Arduino IDE 2 and Espressif ESP32 board support",
      "Board ESP32C3 Dev Module and the COM port",
      "USB CDC On Boot for ESP32-C3 Serial",
      "GPIO numbers come from this kit, not a generic ESP32 pinout",
    ],
    wiring: [
      "USB data cable to the ESP32-C3 expansion board",
      "No servos, OLED, or buzzer required",
      `Do not blink LED_BUILTIN. On many C3 boards it is GPIO ${p.oledSda}, which is OLED SDA on this robot.`,
    ],
    code: [
      {
        filename: "01_setup.ino",
        language: "cpp",
        code: sketch01,
      },
    ],
    explanation:
      "This module only proves the toolchain. Serial at 115200 is the alive check. GPIO assignments for the rest of the lab live in the hardware section. RAC TSEC organizes the workshop. Aurigen hosts this page.",
    expectedResult:
      "Serial Monitor prints Albert Mini, Module 01, Serial OK, then heartbeat once a second.",
    commonMistakes: [
      "Classic ESP32 selected instead of ESP32-C3",
      "Charge-only USB cable",
      "USB CDC On Boot left disabled so the COM port vanishes after reset",
      "Blinking LED_BUILTIN and fighting the OLED later",
    ],
    nextStep: "Wire the SH1106 OLED and run Module 02.",
  },
  {
    id: "02",
    order: 2,
    slug: "oled-test",
    title: "OLED Test",
    tier: "start-here",
    difficulty: "beginner",
    badge: "Example code",
    objective: `Show text on the ${hardware.oled.sizeInches}-inch SH1106 128x64 I2C display at ${hardware.oled.addressHex}.`,
    learn: [
      "I2C is two wires plus power and ground",
      `SDA GPIO ${p.oledSda}, SCL GPIO ${p.oledScl}, address ${hardware.oled.addressHex}`,
      "Adafruit SH110X is the SH1106 library. Adafruit SSD1306 is the wrong controller.",
    ],
    wiring: [
      "OLED VCC to the logic supply on the expansion board (usually 3.3 V, match silkscreen)",
      "OLED GND to common GND",
      `OLED SDA to GPIO ${p.oledSda}`,
      `OLED SCL to GPIO ${p.oledScl}`,
      `I2C address ${hardware.oled.addressHex}`,
    ],
    code: [
      {
        filename: "02_oled.ino",
        language: "cpp",
        code: sketch02,
      },
    ],
    explanation:
      `Install Adafruit GFX, Adafruit SH110X, and Adafruit BusIO. Call Wire.begin(${p.oledSda}, ${p.oledScl}) then display.begin(${hardware.oled.addressHex}, true). Serial should print OLED init OK. The panel should show Albert Mini and SH1106 OLED OK.`,
    expectedResult:
      `Serial: Module 02 OLED SH1106, then OLED init OK. Screen: Albert Mini, SH1106 OLED OK, SDA GPIO ${p.oledSda}, SCL GPIO ${p.oledScl}, addr ${hardware.oled.addressHex}.`,
    commonMistakes: [
      "Installing Adafruit SSD1306 for a SH1106 panel",
      "SDA and SCL swapped",
      `Address 0x3D on a module that is ${hardware.oled.addressHex}`,
      "Forgetting display.display()",
    ],
    nextStep: "Attach four servo signal wires and run Module 03.",
  },
  {
    id: "03",
    order: 3,
    slug: "servo-test",
    title: "Four Servo Test",
    tier: "workshop",
    difficulty: "beginner",
    badge: "Example code",
    objective:
      "Attach all four servos on the current GPIOs, center them, and move them from Serial.",
    learn: [
      "ESP32Servo PWM on the ESP32-C3. No PCA9685.",
      "Commands S1 90, S2 90, S3 90, S4 90",
      "GPIO is signal. The servo rail is power.",
    ],
    wiring: [
      `Servo 1 signal GPIO ${p.servo1}`,
      `Servo 2 signal GPIO ${p.servo2}`,
      `Servo 3 signal GPIO ${p.servo3} (this is not the buzzer)`,
      `Servo 4 signal GPIO ${p.servo4}`,
      "Each servo VCC to the servo power rail. Each servo GND to common GND.",
      `Buzzer stays on GPIO ${p.buzzer}. Do not plug a servo there.`,
      "Optional 470 µF across the servo rail near the board.",
    ],
    code: [
      {
        filename: "03_servo_test.ino",
        language: "cpp",
        code: sketch03,
      },
    ],
    explanation:
      "SERVOS ARE POWERED FROM THE SERVO POWER RAIL. ESP32 GPIO PROVIDES THE CONTROL SIGNAL. DO NOT POWER A SERVO FROM A GPIO PIN. Type S1 90 in Serial. Then S1 70 and S1 110. Repeat for S2, S3, S4. CENTER sends all four to 90.",
    expectedResult:
      "All four servos hold center after boot. Named Serial commands move only that servo. Serial prints the GPIO that moved.",
    commonMistakes: [
      "Powering four servos from USB alone",
      "Missing common ground",
      "Using the old map GPIO 2, 3, 4, 5",
      `Driving a servo on GPIO ${p.buzzer}, which is the buzzer on this robot`,
    ],
    nextStep: "Set servoOffsets in Module 04.",
  },
  {
    id: "04",
    order: 4,
    slug: "servo-calibration",
    title: "Servo Calibration",
    tier: "workshop",
    difficulty: "beginner",
    badge: "Example code",
    objective:
      "Find mechanical zero for S1-S4 using servoOffsets[4]. Do not copy another robot's numbers.",
    learn: [
      "Center, horn alignment, mechanical zero",
      "Minimum and maximum safe angles",
      "Why each servo needs its own offset",
    ],
    wiring: [
      `S1 GPIO ${p.servo1}, S2 GPIO ${p.servo2}, S3 GPIO ${p.servo3}, S4 GPIO ${p.servo4}`,
      "Same power rules as Module 03",
      "Calibrate on a charged cell with the slide switch on",
    ],
    code: [
      {
        filename: "04_calibration.ino",
        language: "cpp",
        code: sketch04,
      },
    ],
    explanation:
      "Put horns on at CENTER so the legs look square. Then trim with O1 5 style commands. Output angle is command plus offset, then clamped to SERVO_MIN and SERVO_MAX. Write the four offsets down. Gait code depends on them.",
    expectedResult:
      "Robot stands square at CENTER. Serial shows cmd, offset, and out for each move.",
    commonMistakes: [
      "Forcing every robot to use offset 0 forever",
      "Calibrating with a dying battery",
      "Skipping the horn alignment step",
      "Using FL=2 FR=3 labels from an older GPIO map",
    ],
    nextStep: "Build named poses in Module 05.",
  },
  {
    id: "05",
    order: 5,
    slug: "basic-movement",
    title: "Basic Movement",
    tier: "workshop",
    difficulty: "intermediate",
    badge: "Example code",
    objective:
      "Move from one servo at a time to named robot poses. A pose is not a walk.",
    learn: [
      "Individual control, then coordinated angles, then poses",
      "CENTER STAND REST SIT DOWN",
      "A gait is a sequence of poses over time. That is Module 06.",
    ],
    wiring: ["Same four-servo loom as Module 04"],
    code: [
      {
        filename: "05_poses.ino",
        language: "cpp",
        code: sketch05,
      },
    ],
    explanation:
      "Type CENTER, STAND, REST, SIT, DOWN. STAND matches CENTER until you change it. REST, SIT, and DOWN are conservative offsets from center. If a pose binds, lower the deltas. Keep SERVO_MIN and SERVO_MAX.",
    expectedResult:
      "Each command name holds a still pose. The robot does not walk by itself.",
    commonMistakes: [
      "Calling a single servo sweep a gait",
      "Huge sit angles that tip the frame",
      "Offsets still wrong from Module 04",
    ],
    nextStep: "Turn poses into a timed gait in Module 06.",
  },
  {
    id: "06",
    order: 6,
    slug: "robot-gait",
    title: "Quadruped Gait",
    tier: "workshop",
    difficulty: "intermediate",
    badge: "Example code",
    objective:
      "Run a conservative two-beat diagonal gait with named, tunable parameters.",
    learn: [
      "Stance phase vs swing phase",
      "Diagonal pairing, timing, step height, stride as STEP_ANGLE",
      "SERVO_MIN and SERVO_MAX as hard limits",
      "Interpolation here is a stepped pose sequence. Tune slowly.",
    ],
    wiring: ["Four servos on S1-S4 GPIOs. Battery on. Switch on."],
    code: [
      {
        filename: "06_gait.ino",
        language: "cpp",
        code: sketch06,
      },
    ],
    explanation:
      "STEP_TIME is the delay between phases. STEP_ANGLE is how far a swing moves from CENTER_ANGLE. SERVO_MIN and SERVO_MAX clamp every write. This is a teaching gait, not a claimed competition gait. Send STOP to freeze in stand. Send WALK BACK LEFT RIGHT to run the same four-servo gait. BLE is Module 08.",
    expectedResult:
      "Repeatable stepping you can stop. Robot stays inside the angle limits.",
    commonMistakes: [
      "Raising STEP_ANGLE before STAND is stable",
      "STEP_TIME so short the mechanics cannot follow",
      "Treating this sketch as validated arena choreography",
    ],
    nextStep: "Give the SH1106 a face in Module 07.",
  },
  {
    id: "07",
    order: 7,
    slug: "oled-animation",
    title: "OLED Eye Expressions",
    tier: "challenge",
    difficulty: "intermediate",
    badge: "Example code",
    objective:
      "Draw neutral, happy, angry, sleepy, and blink faces on the SH1106 with Adafruit GFX.",
    learn: [
      "Frame timing and a status line",
      "GFX circles and lines compile against Adafruit SH110X",
      "Do not publish an unverified RoboEyes API",
    ],
    wiring: [
      `OLED SH1106 SDA GPIO ${p.oledSda}, SCL GPIO ${p.oledScl}, addr ${hardware.oled.addressHex}`,
      "Servos optional for this sketch",
    ],
    code: [
      {
        filename: "07_eyes.ino",
        language: "cpp",
        code: sketch07,
      },
    ],
    explanation:
      "Serial words NEUTRAL HAPPY ANGRY SLEEPY change the face. Blink is automatic. This uses Adafruit GFX on SH1106 so it can compile with the same libraries as Module 02.",
    expectedResult:
      "Eyes on the 128x64 panel. Status text on the bottom row. Blink every few seconds.",
    commonMistakes: [
      "Copying SSD1306 color constants into this sketch",
      "Adding a RoboEyes library that does not match this hardware",
      "Blocking delays so long the face never updates",
    ],
    nextStep: "Add real BLE in Module 08.",
  },
  {
    id: "08",
    order: 8,
    slug: "ble-control",
    title: "BLE Control",
    tier: "workshop",
    difficulty: "intermediate",
    badge: "Reference implementation",
    objective: `Advertise as ${hardware.ble.deviceName}. Accept real BLE writes. Parse core robot commands.`,
    learn: [
      "Phone to BLE to ESP32-C3 to parser to robot action",
      "Nordic-style UART service with RX and TX characteristics",
      "Serial Monitor is a labeled debug fallback. It is not BLE.",
    ],
    wiring: [
      "Fully assembled robot on battery",
      "Phone with nRF Connect or a BLE UART terminal",
      `Write ASCII to RX ${hardware.ble.rxUuid}`,
    ],
    code: [
      {
        filename: "08_ble_control.ino",
        language: "cpp",
        code: sketch08,
      },
    ],
    explanation:
      `Core commands in this sketch: ${coreCommands.join(" ")}. PUSHUPS SWING GALLOP are complete firmware only (Module 09). If Serial WALK works and the phone does not, debug BLE. If both fail, debug the parser or hardware.`,
    expectedResult:
      `Phone scan sees ${hardware.ble.deviceName}. A write of WALK starts the gait. STOP returns to center. Serial can send the same words and prints [serial debug].`,
    commonMistakes: [
      "Calling a Serial-only sketch BLE",
      "Blocking inside the BLE onWrite callback with multi-second delays",
      "Looking for a different advertised name",
    ],
    nextStep: "Merge eyes, fun modes, and the full parser in Module 09.",
  },
  {
    id: "09",
    order: 9,
    slug: "combined-firmware",
    title: "Complete Robot Firmware",
    tier: "workshop",
    difficulty: "advanced",
    badge: "Reference implementation",
    objective:
      "Run one sketch with servos, SH1106 eyes, BLE, buzzer, poses, gait, and the command parser.",
    learn: [
      "One parser for BLE and Serial",
      "Core commands plus optional fun modes in the same sketch",
      "OLED status shows BLE vs Serial path",
    ],
    wiring: [
      `S1 GPIO ${p.servo1}, S2 GPIO ${p.servo2}, S3 GPIO ${p.servo3}, S4 GPIO ${p.servo4}`,
      `Buzzer GPIO ${p.buzzer}`,
      `OLED SH1106 SDA ${p.oledSda} SCL ${p.oledScl}`,
      "Battery, slide switch, common GND. Optional 470 µF on the servo rail.",
    ],
    code: [
      {
        filename: "09_complete.ino",
        language: "cpp",
        code: sketch09,
      },
    ],
    explanation:
      `This is a reference implementation. It is not labeled final-tested. Core: ${coreCommands.join(" ")}. Complete firmware only: ${funCommands.join(" ")}. Debug: INFO. No PCA9685. No empty skeleton.`,
    expectedResult:
      "Boot beeps, eyes draw, BLE advertises AlbertMini, Serial accepts the same words, OLED status row updates.",
    commonMistakes: [
      "Pasting three old sketches with GPIO 2-5 still in them",
      "Calling this final firmware without compiling on your board",
      "Adding a servo driver board this kit does not use",
    ],
    nextStep: "Pick one challenge in Module 10.",
  },
  {
    id: "10",
    order: 10,
    slug: "challenges",
    title: "Challenges",
    tier: "challenge",
    difficulty: "advanced",
    badge: "Workshop challenges",
    objective: "Pick one challenge. Ship it. Do not start all eight at once.",
    learn: [
      "Goal, starting module, hint, expected behavior, optional extension",
      "Judges notice a demo you can restart",
    ],
    wiring: ["Stable walk first. Then add only the hardware that challenge needs."],
    code: [
      {
        filename: "10_challenges.md",
        language: "markdown",
        code: sketch10,
      },
    ],
    explanation:
      "Each challenge points at a module. Hints are short. Full solutions are not published here on purpose.",
    expectedResult: "One demo you can restart in under 30 seconds.",
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
    badge: "Field guide",
    objective:
      "Debug power, wiring, OLED, servos, BLE, and gait using SYMPTOM, CAUSE, CHECK, FIX.",
    learn: [
      "Power first, signal second, code third, mechanics last",
      "BLE drop vs ESP32 reset",
      "Serial path vs BLE path",
    ],
    wiring: [
      "Recheck battery polarity, slide switch, common GND, servo plugs",
      `S3 is GPIO ${p.servo3}. Buzzer is GPIO ${p.buzzer}.`,
    ],
    code: [
      {
        filename: "11_troubleshooting.md",
        language: "markdown",
        code: sketch11,
      },
    ],
    explanation:
      "If Serial shows a reboot after a step, investigate power before BLE code. Optional 470 µF is bulk stabilization. Power switching and rails are as on the expansion board.",
    expectedResult: "A two-minute checklist that matches this kit.",
    commonMistakes: [
      "Rewriting gait before measuring the cell under load",
      "Assuming every BLE drop is a UUID mistake",
    ],
    nextStep: "Return to the workshop hub and ship your builder profile.",
  },
];

export function getModule(id: string): CodeModule | undefined {
  return codeModules.find((m) => m.id === id || m.slug === id);
}

export const labSections = [
  {
    id: "start-here",
    title: "Start Here",
    detail: "Board bring-up, OLED, and debug.",
    tier: "start-here" as const,
  },
  {
    id: "workshop",
    title: "Workshop Version",
    detail: "Servos, poses, gait, BLE, complete reference firmware.",
    tier: "workshop" as const,
  },
  {
    id: "challenge",
    title: "Challenge Version",
    detail: "Eyes, arena extras, and the challenge menu.",
    tier: "challenge" as const,
  },
  {
    id: "community",
    title: "Community Contributions",
    detail: "Team forks land here later.",
    tier: "community" as const,
  },
] as const;
