# Challenges

Work from Module 09 or the matching earlier module. Do not paste a full solution here. Ship one idea cleanly.

## Challenge 1. One servo at a time

Goal: Prove each leg channel is alive on the current pin map.
Starting point: Module 03.
Hint: Send S1 80 then S1 100. Repeat for S2, S3, S4. GPIO 4 is the buzzer. Leave it alone.
Expected behavior: Only the named servo moves. Serial prints the GPIO you commanded.
Optional extension: Add a Serial command that sweeps one servo and holds the others at CENTER_ANGLE.

## Challenge 2. Standing pose

Goal: Make a stance that does not sag.
Starting point: Module 04 offsets plus Module 05 STAND.
Hint: Change servoOffsets[4], not random write() calls in loop.
Expected behavior: Robot holds STAND for 10 seconds without walking.
Optional extension: Save your four offsets on paper and in a comment at the top of the sketch.

## Challenge 3. Your own gait

Goal: Change timing or STEP_ANGLE without breaking SERVO_MIN and SERVO_MAX.
Starting point: Module 06.
Hint: Slow STEP_TIME first. Raise STEP_ANGLE in small steps.
Expected behavior: Repeatable forward motion that you can STOP into CENTER.
Optional extension: Add a second gait with a different STEP_TIME and switch with Serial.

## Challenge 4. New BLE command

Goal: Add one command word the phone can send to AlbertMini.
Starting point: Module 08 or 09 handleCommand().
Hint: Reuse the same parser for BLE RX and Serial debug. Do not invent a second protocol.
Expected behavior: Phone write and Serial type both trigger the same motion.
Optional extension: Notify the phone on the TX characteristic when the command is accepted.

## Challenge 5. New eye expression

Goal: Draw a face state that is not in Module 07.
Starting point: Module 07 drawFace().
Hint: Stay on Adafruit_SH110X GFX calls. Do not add an untested eye library.
Expected behavior: Named Serial command shows the new face on the SH1106.
Optional extension: Show the last BLE command on the bottom status row.

## Challenge 6. Buzzer event

Goal: Beep on a real event, not in an empty loop.
Starting point: Module 09. Buzzer is GPIO 4.
Hint: Beep on BLE connect, on STOP, or when Serial gets an unknown word.
Expected behavior: You can hear the event. Servos still use GPIO 0, 1, 3, 10.
Optional extension: Two beep patterns. Short for OK. Longer for error.

## Challenge 7. Custom dance

Goal: A 5 to 8 second routine using poses you already trust.
Starting point: Module 05 poses plus Module 09 modes.
Hint: Sequence CENTER, SIT, STAND with delays you measured. Keep angles inside SERVO_MIN and SERVO_MAX.
Expected behavior: Dance ends in CENTER. You can start it from BLE or Serial with one word.
Optional extension: Loop the dance until STOP.

## Challenge 8. Fault diagnosis

Goal: Find a planted mistake without rewriting the whole sketch.
Starting point: A copy of Module 09 where one of these is wrong: S3 pin set to 4, OLED library swapped to SSD1306, or BLE name not AlbertMini.
Hint: Use the hardware table. GPIO 3 is Servo 3. GPIO 4 is the buzzer.
Expected behavior: You name the symptom, the cause, the check, and the fix.
Optional extension: Write that diagnosis in your vlog as SYMPTOM / CAUSE / CHECK / FIX.
