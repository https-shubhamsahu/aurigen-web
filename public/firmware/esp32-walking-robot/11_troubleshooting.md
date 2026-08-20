# Troubleshooting

Use this order: power, wiring, then firmware. Serial Monitor at 115200 is the debug path. BLE is the phone path.

## ESP32 does not upload

SYMPTOM: Arduino IDE cannot write the sketch.
LIKELY CAUSE: Wrong board, wrong port, charge-only cable, or USB CDC Off.
CHECK: Board is ESP32C3 Dev Module. A COM port appears when USB is plugged in. Cable carries data.
FIX: Enable USB CDC On Boot. Hold BOOT if your expansion board needs it. Retry upload.

## OLED not detected

SYMPTOM: Serial prints SH1106 not found.
LIKELY CAUSE: SDA/SCL swapped, power missing, or address not 0x3C.
CHECK: SDA is GPIO 8. SCL is GPIO 9. VCC and GND are on the logic rail. Address 0x3C.
FIX: Use Adafruit SH110X, not Adafruit SSD1306. Call Wire.begin(8, 9) before display.begin(0x3C, true).

## OLED detected but blank

SYMPTOM: Init succeeds. Screen stays dark.
LIKELY CAUSE: Missing display.display(), contrast, or SH1106 memory offset vs SSD1306 code.
CHECK: You call display.display() after drawing. Library is Adafruit SH110X.
FIX: Stop using SSD1306_SWITCHCAPVCC sketches. Redraw with SH110X_WHITE.

## Servo does not move

SYMPTOM: One or all servos stay still.
LIKELY CAUSE: No servo-rail power, no common GND, or wrong GPIO.
CHECK: Battery and slide switch. Common GND. S1=0 S2=1 S3=3 S4=10. Signal wire on the servo header.
FIX: Run Module 03. Command one servo. Do not power the servo from the GPIO pin.

## Servo moves incorrectly

SYMPTOM: Wrong leg, reversed, or binding.
LIKELY CAUSE: Horn 180 degrees off, offset not calibrated, or swapped connectors.
CHECK: CENTER pose with horns aligned. servoOffsets[4] notes. Plug S3 is GPIO 3, not GPIO 4.
FIX: Recenter horns. Then trim offsets. Stay inside SERVO_MIN and SERVO_MAX.

## One servo resets the ESP32

SYMPTOM: Board reboots when that servo commands.
LIKELY CAUSE: Stall current, mechanical bind, or a short on that channel.
CHECK: Move that servo by hand with power off. Watch Serial for brownout or boot messages.
FIX: Free the linkage. Confirm the signal is GPIO, not VCC. Test that servo alone.

## BLE does not advertise

SYMPTOM: Phone cannot see AlbertMini.
LIKELY CAUSE: Sketch has no BLE init, wrong name, or upload failed.
CHECK: Serial prints "BLE advertising as AlbertMini". Module 08/09, not an older Serial-only stub.
FIX: Flash Module 08 or 09. Scan for the exact name AlbertMini. nRF Connect or a UART BLE app. Write ASCII to the RX characteristic.

## BLE connects then disconnects

SYMPTOM: Link drops, often when legs move.
LIKELY CAUSE: Often power, not a BLE bug. Servo current spike, brownout, bad ground, stall, or a firmware crash.
CHECK: Serial while you walk. If you see boot or reset text after motion, it is power or a crash. If Serial stays up and only BLE dies, then inspect the BLE stack and phone app.
FIX: Fresh battery. Optional 470 µF on the servo rail. Slow STEP_TIME. Common GND. Then revisit BLE code.

## BLE command does not execute

SYMPTOM: Connected, but the robot ignores the phone.
LIKELY CAUSE: Wrong characteristic, extra spaces, or a parser that never sees the word.
CHECK: Type the same word in Serial. If Serial works, the parser is fine and the BLE write path is wrong. If both fail, fix handleCommand().
FIX: Write ASCII WALK to RX UUID 6E400002-B5A3-F393-E0A9-E50E24DCCA9E. Trim newlines. Core words: WALK STOP CENTER LEFT RIGHT BACK REST BEEP.

## Robot resets when servos move

SYMPTOM: OLED blinks off. BLE drops. Serial shows a reboot.
LIKELY CAUSE: Servo current spike on a weak cell or a shared rail dip.
CHECK: Voltage under load. Switch on. Optional 470 µF. USB-only power with four servos is a common fail.
FIX: Battery on the holder. Reduce STEP_ANGLE. Do not add a PCA9685 to "fix" power. This kit drives servos from the ESP32-C3.

## Buzzer does not work

SYMPTOM: No beep on BEEP.
LIKELY CAUSE: Wired to a servo pin, or GPIO 4 still treated as an old servo map.
CHECK: Buzzer signal is GPIO 4. Servo 3 is GPIO 3. Common GND.
FIX: Module 09 BEEP. Do not attach a Servo object to GPIO 4.

## Wrong servo direction

SYMPTOM: Walks backward or twists.
LIKELY CAUSE: Mirrored horn or inverted offset.
CHECK: CENTER, then one STEP_ANGLE on S1 only.
FIX: Flip the horn or negate that servoOffsets entry. Recalibrate before you rewrite gait math.

## Gait is unstable / robot falls

SYMPTOM: Tips, chatters, or splits.
LIKELY CAUSE: STEP_ANGLE too large, STEP_TIME too short, neutrals still wrong.
CHECK: STAND for 10 seconds. Then walk with STEP_ANGLE 8 and a slower STEP_TIME.
FIX: Calibrate first. Conservative parameters are the workshop default. Smooth later.

## Serial vs BLE debug path

Phone -> BLE AlbertMini -> ESP32-C3 parser -> robot action.

Serial Monitor -> ESP32-C3 parser -> robot action.

If the command works on Serial and fails on BLE, debug BLE writes and advertising.
If it fails on both, debug poses, power, and wiring.
If BLE drops and Serial shows a reset, debug power before you rewrite BLE.

## BLE disconnect vs power

BLE disconnect is not automatically a software bug.
Servo spikes can reset the ESP32. A reset looks like a BLE drop.
Watch Serial for rst: or brownout after a step.
Optional 470 µF is stabilization, not a bigger battery.
Power switching and rails are as on the expansion board.

## Never

Do not add an external PCA9685 for this kit.
Do not power a servo from GPIO.
Do not put a servo on GPIO 2 or GPIO 5 because an older page said so.
Do not put a servo on GPIO 4. GPIO 4 is the buzzer.
