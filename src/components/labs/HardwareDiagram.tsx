"use client";

import { useState } from "react";
import { hardware, wiringSignalRows } from "@/content/labs/esp32-walking-robot/hardware";
import { cn } from "@/lib/utils";

type NodeId =
  | "battery"
  | "switch"
  | "board"
  | "esp32"
  | "servo1"
  | "servo2"
  | "servo3"
  | "servo4"
  | "oled"
  | "buzzer"
  | "cap";

type NodeInfo = {
  id: NodeId;
  label: string;
  kind: "power" | "signal" | "both";
  detail: string[];
};

const nodes: NodeInfo[] = [
  {
    id: "battery",
    label: "3.7 V Li-ion",
    kind: "power",
    detail: [
      "One cell in the holder.",
      "This is the energy source for the expansion board rails.",
      "A weak cell looks like a BLE bug when servos move.",
    ],
  },
  {
    id: "switch",
    label: "Slide switch",
    kind: "power",
    detail: [
      "Sits in the power path.",
      "If it is off, nothing on the robot is alive.",
    ],
  },
  {
    id: "board",
    label: "Expansion board rails",
    kind: "power",
    detail: [
      "Power switching and rails as on the expansion board.",
      "This lab does not name a boost converter IC. The workshop source does not document one.",
      "Servo rail and logic rail are not GPIO pins.",
    ],
  },
  {
    id: "esp32",
    label: "ESP32-C3",
    kind: "both",
    detail: [
      `Servo 1 GPIO ${hardware.pins.servo1} (signal)`,
      `Servo 2 GPIO ${hardware.pins.servo2} (signal)`,
      `Servo 3 GPIO ${hardware.pins.servo3} (signal, not buzzer)`,
      `Buzzer GPIO ${hardware.pins.buzzer} (signal, not a servo)`,
      `OLED SDA GPIO ${hardware.pins.oledSda}`,
      `OLED SCL GPIO ${hardware.pins.oledScl}`,
      `Servo 4 GPIO ${hardware.pins.servo4} (signal)`,
      "GPIO is control. Rails are power. GND is common.",
    ],
  },
  {
    id: "servo1",
    label: "Servo 1",
    kind: "both",
    detail: [
      `Signal GPIO ${hardware.pins.servo1}`,
      "VCC to servo power rail",
      "GND to common GND",
    ],
  },
  {
    id: "servo2",
    label: "Servo 2",
    kind: "both",
    detail: [
      `Signal GPIO ${hardware.pins.servo2}`,
      "VCC to servo power rail",
      "GND to common GND",
    ],
  },
  {
    id: "servo3",
    label: "Servo 3",
    kind: "both",
    detail: [
      `Signal GPIO ${hardware.pins.servo3}`,
      `GPIO ${hardware.pins.servo3} is Servo 3. GPIO ${hardware.pins.buzzer} is the buzzer.`,
      "VCC to servo power rail",
      "GND to common GND",
    ],
  },
  {
    id: "servo4",
    label: "Servo 4",
    kind: "both",
    detail: [
      `Signal GPIO ${hardware.pins.servo4}`,
      "VCC to servo power rail",
      "GND to common GND",
    ],
  },
  {
    id: "oled",
    label: "OLED SH1106",
    kind: "both",
    detail: [
      `SDA GPIO ${hardware.pins.oledSda}`,
      `SCL GPIO ${hardware.pins.oledScl}`,
      "VCC to logic supply on the board",
      "GND to common GND",
      `I2C address ${hardware.oled.addressHex}`,
    ],
  },
  {
    id: "buzzer",
    label: "Buzzer",
    kind: "both",
    detail: [
      `Signal GPIO ${hardware.pins.buzzer}`,
      "GND to common GND",
      `Older pages used GPIO ${hardware.pins.buzzer} as a servo. That is not this robot.`,
    ],
  },
  {
    id: "cap",
    label: "Optional 470 µF",
    kind: "power",
    detail: [
      "Across the servo rail near the board.",
      "Bulk stabilization for current spikes.",
      "Not a substitute for a charged cell.",
    ],
  },
];

export function HardwareDiagram() {
  const [active, setActive] = useState<NodeId>("esp32");
  const current = nodes.find((n) => n.id === active) ?? nodes[3];
  const highlight = (id: NodeId) => active === id;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-md border border-white/10 bg-zinc-950 p-4 md:p-5">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-wider text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            Power rail
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            Signal
          </span>
          <span>Click a block.</span>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <NodeButton nodeId="battery" active={highlight("battery")} onSelect={setActive} />
            <span className="hidden text-center font-mono text-[10px] text-amber-400/80 sm:block">
              power
            </span>
            <NodeButton nodeId="switch" active={highlight("switch")} onSelect={setActive} />
          </div>

          <Rail label="Power switching and rails as on the expansion board" />
          <NodeButton nodeId="board" active={highlight("board")} onSelect={setActive} wide />
          <NodeButton nodeId="esp32" active={highlight("esp32")} onSelect={setActive} wide accent />

          <div className="grid gap-2 sm:grid-cols-2">
            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-cyan-400/80">
                Signal GPIOs
              </p>
              <div className="grid grid-cols-2 gap-2">
                <NodeButton nodeId="servo1" active={highlight("servo1")} onSelect={setActive} />
                <NodeButton nodeId="servo2" active={highlight("servo2")} onSelect={setActive} />
                <NodeButton nodeId="servo3" active={highlight("servo3")} onSelect={setActive} />
                <NodeButton nodeId="servo4" active={highlight("servo4")} onSelect={setActive} />
              </div>
            </div>
            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-cyan-400/80">
                I2C and buzzer
              </p>
              <div className="grid gap-2">
                <NodeButton nodeId="oled" active={highlight("oled")} onSelect={setActive} />
                <NodeButton nodeId="buzzer" active={highlight("buzzer")} onSelect={setActive} />
                <NodeButton nodeId="cap" active={highlight("cap")} onSelect={setActive} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <aside className="rounded-md border border-white/10 bg-card p-5">
        <p className="text-[11px] font-heading uppercase tracking-wider text-muted-foreground">
          {current.kind === "power" ? "Power" : current.kind === "signal" ? "Signal" : "Signal and power"}
        </p>
        <h3 className="mt-1 font-heading text-xl font-semibold">{current.label}</h3>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
          {current.detail.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        {current.id === "esp32" ? (
          <ul className="mt-4 space-y-1 font-mono text-xs text-accent">
            {wiringSignalRows.map((row) => (
              <li key={`${row.component}-${row.signal}`}>
                {row.component} {row.signal} GPIO {row.gpio}
              </li>
            ))}
          </ul>
        ) : null}
      </aside>
    </div>
  );
}

function Rail({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-amber-400/40" />
      <p className="max-w-[16rem] text-center text-[10px] leading-snug text-amber-200/70">
        {label}
      </p>
      <div className="h-px flex-1 bg-amber-400/40" />
    </div>
  );
}

function NodeButton({
  nodeId,
  active,
  onSelect,
  wide,
  accent,
}: {
  nodeId: NodeId;
  active: boolean;
  onSelect: (id: NodeId) => void;
  wide?: boolean;
  accent?: boolean;
}) {
  const node = nodes.find((n) => n.id === nodeId);
  if (!node) return null;
  return (
    <button
      type="button"
      onClick={() => onSelect(nodeId)}
      className={cn(
        "min-h-11 rounded-md border px-3 py-2 text-left text-sm transition-colors",
        wide && "w-full",
        accent && "font-heading font-semibold",
        active
          ? "border-accent bg-accent/15 text-foreground"
          : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/20 hover:text-foreground",
      )}
    >
      <span className="block">{node.label}</span>
      {nodeId.startsWith("servo") ? (
        <span className="mt-0.5 block font-mono text-[10px] text-cyan-400">
          signal GPIO {hardware.pins[nodeId as "servo1" | "servo2" | "servo3" | "servo4"]}
        </span>
      ) : null}
      {nodeId === "oled" ? (
        <span className="mt-0.5 block font-mono text-[10px] text-cyan-400">
          SDA {hardware.pins.oledSda} SCL {hardware.pins.oledScl}
        </span>
      ) : null}
      {nodeId === "buzzer" ? (
        <span className="mt-0.5 block font-mono text-[10px] text-cyan-400">
          signal GPIO {hardware.pins.buzzer}
        </span>
      ) : null}
    </button>
  );
}
