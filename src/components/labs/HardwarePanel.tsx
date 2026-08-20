import type { ReactNode } from "react";
import {
  coreCommands,
  debugCommands,
  firmwareDownloadPath,
  funCommands,
  hardware,
  ledBuiltinCaveat,
  libraries,
  wiringPowerNotes,
  wiringSignalRows,
} from "@/content/labs/esp32-walking-robot/hardware";
import { HardwareDiagram } from "@/components/labs/HardwareDiagram";

export function HardwarePanel() {
  const p = hardware.pins;

  return (
    <section id="hardware" className="scroll-mt-28 border-b border-white/10 py-10 md:py-12">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
        Current hardware
      </p>
      <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight">
        Albert Mini pin map
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
        Physical kit is the source of truth. Four servos are driven directly by the
        ESP32-C3. No PCA9685. OLED is SH1106, not SSD1306. RAC TSEC organizes the
        workshop. Aurigen hosts this page.
      </p>

      <div className="mt-8 overflow-x-auto rounded-md border border-white/10">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead className="bg-white/5 font-heading text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Component</th>
              <th className="px-4 py-3">Signal</th>
              <th className="px-4 py-3">ESP32-C3</th>
              <th className="px-4 py-3">Note</th>
            </tr>
          </thead>
          <tbody>
            {wiringSignalRows.map((row) => (
              <tr
                key={`${row.component}-${row.signal}`}
                className="border-t border-white/10"
              >
                <td className="px-4 py-3 text-foreground">{row.component}</td>
                <td className="px-4 py-3 font-mono text-cyan-400">{row.signal}</td>
                <td className="px-4 py-3 font-mono text-accent">GPIO {row.gpio}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Callout title="GPIO is SIGNAL ONLY">
          The ESP32-C3 pin is a control line. It is not a power pin. Never feed a
          servo from GPIO {p.servo1}, {p.servo2}, {p.servo3}, or {p.servo4}.
        </Callout>
        <Callout title="Servo power comes from the servo power rail">
          Servo VCC uses the servo rail on the expansion board. OLED VCC uses the
          logic supply. Match the silkscreen.
        </Callout>
        <Callout title="All modules share common GND">
          Battery negative, ESP32 GND, servo GND, OLED GND, and buzzer GND share
          one reference.
        </Callout>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 font-heading text-xl font-semibold">Interactive diagram</h3>
        <HardwareDiagram />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-3 font-heading text-xl font-semibold">Power</h3>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
            {wiringPowerNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Servo current spikes can reset the ESP32-C3. A reset looks like a BLE
            disconnect. Watch Serial for boot text after a step.
          </p>
        </div>
        <div>
          <h3 className="mb-3 font-heading text-xl font-semibold">LED_BUILTIN</h3>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
            {ledBuiltinCaveat.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <h3 className="mb-3 mt-8 font-heading text-xl font-semibold">Libraries</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {libraries.map((lib) => (
              <li key={lib.name}>
                <span className="font-heading text-foreground">{lib.name}.</span>{" "}
                {lib.via} {lib.requiredFor}.
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 rounded-md border border-white/10 bg-card p-5">
        <h3 className="font-heading text-xl font-semibold">BLE and commands</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Advertise as {hardware.ble.deviceName}. Phone writes ASCII to the RX
          characteristic. Serial Monitor can send the same words as a debug
          fallback. Serial is not BLE.
        </p>
        <p className="mt-4 text-xs font-heading uppercase tracking-wider text-muted-foreground">
          Core workshop commands
        </p>
        <p className="mt-1 font-mono text-sm text-accent">{coreCommands.join("  ")}</p>
        <p className="mt-4 text-xs font-heading uppercase tracking-wider text-muted-foreground">
          Complete firmware only
        </p>
        <p className="mt-1 font-mono text-sm text-foreground">{funCommands.join("  ")}</p>
        <p className="mt-4 text-xs font-heading uppercase tracking-wider text-muted-foreground">
          Debug, complete firmware only
        </p>
        <p className="mt-1 font-mono text-sm text-foreground">{debugCommands.join("  ")}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          Firmware files:{" "}
          <a
            href={firmwareDownloadPath("README.md")}
            className="text-accent hover:underline"
          >
            {firmwareDownloadPath("README.md")}
          </a>
        </p>
      </div>
    </section>
  );
}

function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-md border border-white/10 bg-card p-4">
      <h3 className="font-heading font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

export function ArduinoIdeNotes() {
  return (
    <div className="rounded-md border border-white/10 bg-card/60 p-4 text-sm text-muted-foreground">
      <h3 className="font-heading text-foreground">Open in Arduino IDE</h3>
      <ol className="mt-3 list-decimal space-y-1 pl-5">
        <li>Arduino IDE 2. Boards Manager: esp32 by Espressif.</li>
        <li>Tools, Board: ESP32C3 Dev Module.</li>
        <li>Tools, USB CDC On Boot: On.</li>
        <li>Tools, Port: the COM port for this board.</li>
        <li>Library Manager: ESP32Servo, Adafruit GFX, Adafruit SH110X, Adafruit BusIO.</li>
        <li>Copy or download the sketch. Serial Monitor 115200.</li>
        <li>BLE apps: nRF Connect or a UART terminal. Device name {hardware.ble.deviceName}.</li>
      </ol>
    </div>
  );
}
