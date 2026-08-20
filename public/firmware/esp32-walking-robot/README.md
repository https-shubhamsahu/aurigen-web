# Albert Mini firmware

Current workshop robot. Organizer: Robotics & Automation Club, TSEC. Aurigen hosts the lab page. Aurigen is not the organizer.

These files are generated from `src/content/labs/esp32-walking-robot/firmware.ts` and `hardware.ts`.

Pin map:

- Servo 1 GPIO 0
- Servo 2 GPIO 1
- Servo 3 GPIO 3
- Buzzer GPIO 4
- OLED SH1106 SDA GPIO 8
- OLED SH1106 SCL GPIO 9
- Servo 4 GPIO 10

OLED controller is SH1106 at 0x3C. BLE name is AlbertMini.

Core commands: WALK STOP CENTER LEFT RIGHT BACK REST BEEP
Fun commands (complete firmware only, 09_complete.ino): PUSHUPS SWING GALLOP
Debug (complete firmware only): INFO

Sketches are a reference implementation. Compile on your laptop with Arduino IDE and the libraries listed on the lab page.
