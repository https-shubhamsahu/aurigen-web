"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Eye, ToyBrick, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LogEntry {
  text: string;
  type: "info" | "success" | "warning";
}

export default function Sandbox() {
  const [activeTab, setActiveTab] = useState<"cv" | "robotics">("cv");
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([
    { text: '>_ click "Run Script" to start testing logic', type: "info" }
  ]);

  // CV States
  const [threshold, setThreshold] = useState(0.85);

  // Robotics States
  const [speed, setSpeed] = useState(60);
  const [roverX, setRoverX] = useState(20);
  const [roverY, setRoverY] = useState(25);
  const [roverRot, setRoverRot] = useState(0);
  const [_simStage, setSimStage] = useState(0); // 0: East, 1: Turn South, 2: South, 3: Turn West, 4: West, 5: Done
  const [isScanning, setIsScanning] = useState(false);
  const [sonarDist, setSonarDist] = useState(45);

  const animationRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);
  const speedRef = useRef(60);
  const tabRef = useRef<"cv" | "robotics">("cv");

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    tabRef.current = activeTab;
    resetSimulations();
  }, [activeTab]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const resetSimulations = () => {
    setIsRunning(false);
    isRunningRef.current = false;
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    setRoverX(20);
    setRoverY(25);
    setRoverRot(0);
    setSimStage(0);
    setIsScanning(false);
    setSonarDist(45);
    setLogs([{ text: `>_ profile: loaded template for ${tabRef.current.toUpperCase()}`, type: "info" }]);
  };

  const handleRun = () => {
    setIsRunning(true);
    isRunningRef.current = true;
    setLogs([]);

    if (activeTab === "cv") {
      runCVLogs();
    } else {
      runRoboticsLogs();
    }
  };

  // CV Simulation Log print
  const runCVLogs = () => {
    const sequence = [
      { text: "[INIT] Initializing TensorRT engine...", delay: 0 },
      { text: "[MODEL] YOLOv8 backend configured. GPU thread allocation: OK", delay: 500 },
      { text: "[STREAM] Target device camera bound successfully.", delay: 1000 },
      { text: "[SUCCESS] Inference loop running. Processing stream...", delay: 1500 }
    ];

    sequence.forEach((item) => {
      setTimeout(() => {
        if (isRunningRef.current && tabRef.current === "cv") {
          setLogs((prev) => [
            ...prev,
            { text: item.text, type: item.text.includes("[SUCCESS]") ? "success" : "info" }
          ]);
        }
      }, item.delay);
    });
  };

  // Robotics Pathfinding animation loop
  const runRoboticsLogs = () => {
    const sequence = [
      { text: "[INIT] Compiling binary for COM3...", type: "info" as const, delay: 0 },
      { text: "[SERIAL] Connection verified (COM3, 115200bps)", type: "info" as const, delay: 500 },
      { text: "[ROVER] Sonar sensor calibration: OK", type: "info" as const, delay: 1000 },
      { text: "[ROVER] Moving forward at power " + speedRef.current + "%", type: "info" as const, delay: 1500 }
    ];

    sequence.forEach((item) => {
      setTimeout(() => {
        if (isRunningRef.current && tabRef.current === "robotics") {
          setLogs((prev) => [...prev, { text: item.text, type: item.type }]);
          if (item.text.includes("Moving forward")) {
            setIsScanning(true);
            animationRef.current = requestAnimationFrame(animateRover);
          }
        }
      }, item.delay);
    });
  };

  const animateRover = () => {
    if (!isRunningRef.current || tabRef.current !== "robotics") return;

    const baseSpeed = 0.25;
    const currentSpeed = baseSpeed * (speedRef.current / 60);

    setRoverX((prevX) => {
      setRoverY((prevY) => {
        setRoverRot((prevRot) => {
          setSimStage((stage) => {
            // Stage 0: Move East
            if (stage === 0) {
              const nextX = prevX + currentSpeed;
              const dist = Math.max(0, Math.floor((65 - nextX) * 5));
              setSonarDist(dist);
              if (nextX >= 55) {
                setLogs((p) => [...p, { text: "[SENSOR] Obstacle detected! Distance: 25cm. Stopping.", type: "warning" }]);
                return 1;
              }
              return stage;
            }
            // Stage 1: Turn South (90 deg)
            if (stage === 1) {
              const nextRot = prevRot + 4;
              if (nextRot >= 90) {
                setLogs((p) => [...p, { text: "[ROVER] Obstacle cleared. Driving South.", type: "info" }]);
                return 2;
              }
              return stage;
            }
            // Stage 2: Move South
            if (stage === 2) {
              const nextY = prevY + currentSpeed;
              const dist = Math.max(0, Math.floor((60 - nextY) * 5));
              setSonarDist(dist);
              if (nextY >= 48) {
                setLogs((p) => [...p, { text: "[SENSOR] Obstacle detected! Distance: 20cm. Stopping.", type: "warning" }]);
                return 3;
              }
              return stage;
            }
            // Stage 3: Turn West (180 deg)
            if (stage === 3) {
              const nextRot = prevRot + 4;
              if (nextRot >= 180) {
                setLogs((p) => [...p, { text: "[ROVER] Driving West.", type: "info" }]);
                return 4;
              }
              return stage;
            }
            // Stage 4: Move West
            if (stage === 4) {
              const nextX = prevX - currentSpeed;
              const dist = Math.max(0, Math.floor((nextX - 10) * 5));
              setSonarDist(dist);
              if (nextX <= 20) {
                setLogs((p) => [...p, { text: "[MISSION] Finished run loop. Resetting to checkpoint.", type: "success" }]);
                return 5;
              }
              return stage;
            }
            // Stage 5: Reset
            return stage;
          });

          // Handle rotational logic increment separately in stages
          let finalRot = prevRot;
          setSimStage((currStage) => {
            if (currStage === 1 && prevRot < 90) finalRot = Math.min(90, prevRot + 4);
            if (currStage === 3 && prevRot < 180) finalRot = Math.min(180, prevRot + 4);
            return currStage;
          });

          return finalRot;
        });

        // Update positions based on stage speeds
        let finalY = prevY;
        setSimStage((currStage) => {
          if (currStage === 2) finalY = prevY + currentSpeed;
          return currStage;
        });
        return finalY;
      });

      let finalX = prevX;
      setSimStage((currStage) => {
        if (currStage === 0) finalX = prevX + currentSpeed;
        if (currStage === 4) finalX = prevX - currentSpeed;
        return currStage;
      });
      return finalX;
    });

    setSimStage((currStage) => {
      if (currStage === 5) {
        setTimeout(() => {
          if (tabRef.current === "robotics" && isRunningRef.current) {
            setRoverX(20);
            setRoverY(25);
            setRoverRot(0);
            setSimStage(0);
            setSonarDist(45);
          }
        }, 1000);
      }
      return currStage;
    });

    animationRef.current = requestAnimationFrame(animateRover);
  };

  return (
    <section className="py-24 border-t border-border" id="sandbox">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-primary text-xs font-semibold uppercase tracking-wider block mb-3 font-heading">
            Interactive Simulation
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            Try the build experience
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed">
            Adjust variables or switch simulator modules. See how the platform
            connects coding, AI logic, and hardware reactions in real time.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-[#121214] p-1 rounded-lg border border-border w-fit mb-8">
          <button
            onClick={() => setActiveTab("cv")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-all font-heading cursor-pointer ${
              activeTab === "cv"
                ? "bg-background text-primary border border-border"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Eye className="h-4 w-4" />
            <span>Computer Vision Mode</span>
          </button>
          <button
            onClick={() => setActiveTab("robotics")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-all font-heading cursor-pointer ${
              activeTab === "robotics"
                ? "bg-background text-primary border border-border"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ToyBrick className="h-4 w-4" />
            <span>Autonomous Robotics Mode</span>
          </button>
        </div>

        {/* Sandbox Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Editor Card */}
          <div className="lg:col-span-7 bg-[#121214] border border-border rounded-xl flex flex-col overflow-hidden">
            <div className="flex justify-between items-center h-12 px-4 bg-black/15 border-b border-border">
              <span className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                <FileCode className="h-4 w-4 text-primary" />
                <span>sandbox_demo.py</span>
              </span>
              <Button
                size="sm"
                onClick={handleRun}
                disabled={isRunning}
                className="h-8 px-4 rounded bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-semibold font-heading flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="h-3 w-3 fill-current" />
                <span>{isRunning ? "Running..." : "Run Script"}</span>
              </Button>
            </div>

            {/* Code Text Window */}
            <div className="flex-grow p-6 bg-black/10 font-mono text-xs flex gap-4 overflow-x-auto select-none">
              <div className="flex flex-col text-zinc-600 text-right leading-relaxed select-none">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span>
              </div>
              <div className="flex-grow text-neutral-300">
                {activeTab === "cv" ? (
                  <pre className="leading-relaxed">
                    <code>
                      <span className="text-rose-500">import</span> aurigen_cv <span className="text-rose-500">as</span> acv{"\n"}{"\n"}
                      threshold = <span className="border-b border-dashed border-primary text-primary font-bold">{threshold.toFixed(2)}</span> <span className="text-zinc-500 italic"># Adjust slider below</span>{"\n"}
                      model = acv.load_model(<span className="text-yellow-400">{"\"yolo\""}</span>){"\n"}{"\n"}
                      <span className="text-rose-500">while</span> True:{"\n"}
                      {"    "}frame = acv.get_camera_frame(){"\n"}
                      {"    "}detections = model.run(frame, confidence=threshold){"\n"}
                      {"    "}acv.render_overlays(frame, detections)
                    </code>
                  </pre>
                ) : (
                  <pre className="leading-relaxed">
                    <code>
                      <span className="text-rose-500">import</span> aurigen_robotics <span className="text-rose-500">as</span> ar{"\n"}{"\n"}
                      speed = <span className="border-b border-dashed border-primary text-primary font-bold">{speed}</span> <span className="text-zinc-500 italic"># Adjust speed below</span>{"\n"}
                      rover = ar.Rover(port=<span className="text-yellow-400">{"\"COM3\""}</span>){"\n"}{"\n"}
                      <span className="text-rose-500">while</span> True:{"\n"}
                      {"    "}dist = rover.sonar.read_distance(){"\n"}
                      {"    "}<span className="text-rose-500">if</span> dist &lt; <span className="text-sky-400">25</span>:{"\n"}
                      {"        "}rover.stop(){"\n"}
                      {"        "}rover.turn_angle(<span className="text-sky-400">90</span>){"\n"}
                      {"    "}<span className="text-rose-500">else</span>:{"\n"}
                      {"        "}rover.drive(power=speed)
                    </code>
                  </pre>
                )}
              </div>
            </div>

            {/* Slider Config Tray */}
            <div className="p-5 bg-black/20 border-t border-border">
              {activeTab === "cv" ? (
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs font-semibold text-muted-foreground font-heading">
                    <span>Confidence Threshold</span>
                    <span className="text-primary">{threshold.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.30"
                    max="0.99"
                    step="0.05"
                    value={threshold}
                    onChange={(e) => setThreshold(parseFloat(e.target.value))}
                    className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs font-semibold text-muted-foreground font-heading">
                    <span>Drive Power (%)</span>
                    <span className="text-primary">{speed}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    step="5"
                    value={speed}
                    onChange={(e) => setSpeed(parseInt(e.target.value))}
                    className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Simulation Viewer Card */}
          <div className="lg:col-span-5 bg-[#121214] border border-border rounded-xl flex flex-col overflow-hidden">
            <div className="flex justify-between items-center h-12 px-4 bg-black/15 border-b border-border text-xs text-muted-foreground font-heading">
              <span className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isRunning ? "bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" : "bg-zinc-600"}`} />
                <span>Simulator View</span>
              </span>
              <span>FPS: 60 | CPU: 12%</span>
            </div>

            {/* Simulated Live View Screen */}
            <div className="h-[280px] bg-[#050507] p-4 border-b border-border overflow-hidden relative">
              {/* CV Mode Screen */}
              {activeTab === "cv" && (
                <div className="w-full h-full rounded-md border border-border bg-gradient-to-br from-indigo-950/20 to-zinc-950 overflow-hidden relative">
                  {/* Drone Box: conf 0.94 */}
                  {threshold <= 0.94 && (
                    <div className="absolute top-[20%] left-[15%] w-[35%] h-[45%] border-2 border-primary bg-primary/5 rounded shadow-[0_0_12px_rgba(255,214,0,0.1)] transition-opacity duration-200">
                      <span className="absolute -top-5 -left-[2px] bg-primary text-black font-mono text-[9px] font-bold px-1 py-0.5 rounded-t-sm uppercase">
                        Drone [94%]
                      </span>
                    </div>
                  )}
                  {/* AI Rover Box: conf 0.89 */}
                  {threshold <= 0.89 && (
                    <div className="absolute top-[40%] left-[55%] w-[35%] h-[50%] border-2 border-primary bg-primary/5 rounded shadow-[0_0_12px_rgba(255,214,0,0.1)] transition-opacity duration-200">
                      <span className="absolute -top-5 -left-[2px] bg-primary text-black font-mono text-[9px] font-bold px-1 py-0.5 rounded-t-sm uppercase">
                        AI Rover [89%]
                      </span>
                    </div>
                  )}
                  {/* Scanline Animation */}
                  <div className={`absolute w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 ${isRunning ? "animate-[scannerLine_3s_infinite_linear]" : "hidden"}`} />
                  <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.8)] pointer-events-none" />
                </div>
              )}

              {/* Robotics Mode Screen */}
              {activeTab === "robotics" && (
                <div className="w-full h-full rounded-md border border-border bg-neutral-950 overflow-hidden relative">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:20px_20px]" />
                  {/* Obstacles */}
                  <div className="absolute top-[30%] left-[65%] w-5 h-[120px] bg-neutral-800 border border-neutral-700 rounded-sm" />
                  <div className="absolute top-[60%] left-[25%] w-[100px] h-5 bg-neutral-800 border border-neutral-700 rounded-sm" />
                  {/* Rover Sprite */}
                  <div
                    style={{
                      left: `${roverX}%`,
                      top: `${roverY}%`,
                      transform: `rotate(${roverRot}deg)`,
                    }}
                    className="absolute w-8 h-8 -ml-4 -mt-4 transition-all duration-300 ease-linear"
                  >
                    <div className="w-full h-full bg-white border-[3px] border-primary rounded-lg relative shadow-[0_0_10px_var(--accent-yellow-glow)]">
                      <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-2.5 bg-primary rounded-sm" />
                    </div>
                    {/* Sonar Sweep waves */}
                    {isScanning && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-primary/15 rounded-full bg-[radial-gradient(circle,rgba(255,214,0,0.02)_20%,transparent_70%)] animate-[sonarSweep_1.5s_infinite_linear] pointer-events-none" />
                    )}
                  </div>
                  {/* Distance display overlay */}
                  <div className="absolute top-3 left-3 font-mono text-[10px] bg-black/80 text-foreground border border-border px-2 py-1 rounded">
                    Distance: {sonarDist} cm
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Log Pane */}
            <div className="h-[148px] bg-[#030305] p-4 overflow-y-auto font-mono text-[11px] flex flex-col gap-1 text-neutral-400">
              {logs.map((log, index) => (
                <p
                  key={index}
                  style={{
                    color:
                      log.type === "success"
                        ? "#4ade80"
                        : log.type === "warning"
                        ? "#ffd600"
                        : "#71717a",
                  }}
                >
                  {log.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes sonarSweep {
          0% { transform: translate(-50%, -50%) scale(0.2); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
