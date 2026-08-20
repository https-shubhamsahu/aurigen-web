"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WORKSHOP_PATH } from "@/lib/workshop-config";
import { BOT_ID_EXAMPLE, isValidBotId, normalizeBotId } from "@/lib/bot-id";
import { absoluteUrl } from "@/lib/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { SocialGeneratorInput, SocialTemplateId } from "@/types/workshop-ecosystem";

const templates: {
  id: SocialTemplateId;
  name: string;
  description: string;
}[] = [
  {
    id: "we-built",
    name: "We Built a Robot",
    description: "Bold story opener with RAC TSEC attribution.",
  },
  {
    id: "alive",
    name: "Our Robot Is Alive",
    description: "Day 1 → Day 2 → Arena arc.",
  },
  {
    id: "build-complete",
    name: "Build Complete",
    description: "Feature + award highlight card.",
  },
];

const defaultInput: SocialGeneratorInput = {
  teamName: "RoboX",
  botId: BOT_ID_EXAMPLE,
  members: "Aarav, Diya, Kabir",
  robotName: "ARES",
  feature: "Dance Mode",
  award: "Best Hack",
};

export function SocialKitView() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [template, setTemplate] = useState<SocialTemplateId>("we-built");
  const [input, setInput] = useState<SocialGeneratorInput>(defaultInput);
  const [photo, setPhoto] = useState<HTMLImageElement | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const caption = useMemo(() => buildLinkedInCaption(input), [input]);
  const igCaption = useMemo(() => buildInstagramCaption(input), [input]);
  const projectLink = absoluteUrl(WORKSHOP_PATH);

  useEffect(() => {
    track("social_kit_viewed", {});
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawStory(canvas, template, input, photo);
  }, [template, input, photo]);

  function onPhoto(file: File | null) {
    if (!file) {
      setPhoto(null);
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setPhoto(img);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }

  async function downloadPng() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const id = normalizeBotId(input.botId);
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `${isValidBotId(id) ? id : "BOT"}-${template}.png`;
    a.click();
    track("social_image_downloaded", { template, botId: id });
  }

  async function copyText(text: string, event: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      window.setTimeout(() => setCopied(null), 1600);
      track(event, { botId: input.botId });
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-16 lg:px-8">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
        Social Kit
      </p>
      <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        Share what you built
      </h1>
      <p className="mt-4 max-w-2xl text-base text-muted-foreground">
        Generate three Instagram story cards (1080×1920) and captions. Credit
        Robotics & Automation Club, TSEC as the workshop organizer. Aurigen is
        not required in the post.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {templates.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTemplate(t.id);
                  track("social_template_generated", { template: t.id });
                }}
                className={cn(
                  "shrink-0 rounded-md border px-3 py-2 text-left text-sm",
                  template === t.id
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-white/10 text-muted-foreground",
                )}
              >
                <span className="block font-medium">{t.name}</span>
                <span className="mt-0.5 block text-[11px] opacity-80">
                  {t.description}
                </span>
              </button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Team name">
              <Input
                value={input.teamName}
                onChange={(e) => setInput({ ...input, teamName: e.target.value })}
              />
            </Field>
            <Field label="BOT ID">
              <Input
                value={input.botId}
                onChange={(e) => setInput({ ...input, botId: e.target.value })}
                placeholder={BOT_ID_EXAMPLE}
              />
            </Field>
            <Field label="Members">
              <Input
                value={input.members}
                onChange={(e) => setInput({ ...input, members: e.target.value })}
              />
            </Field>
            <Field label="Robot name">
              <Input
                value={input.robotName}
                onChange={(e) => setInput({ ...input, robotName: e.target.value })}
              />
            </Field>
            <Field label="Custom feature">
              <Input
                value={input.feature}
                onChange={(e) => setInput({ ...input, feature: e.target.value })}
              />
            </Field>
            <Field label="Award / result">
              <Input
                value={input.award}
                onChange={(e) => setInput({ ...input, award: e.target.value })}
              />
            </Field>
            <Field label="Photo (optional)">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => onPhoto(e.target.files?.[0] ?? null)}
              />
            </Field>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={downloadPng} className="min-h-10">
              Download PNG
            </Button>
            <Button
              type="button"
              variant="outline"
              className="min-h-10"
              onClick={() => copyText(caption, "social_caption_copied", "linkedin")}
            >
              {copied === "linkedin" ? "Copied caption" : "Copy LinkedIn caption"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="min-h-10"
              onClick={() =>
                copyText(igCaption, "social_instagram_caption_copied", "ig")
              }
            >
              {copied === "ig" ? "Copied caption" : "Copy Instagram caption"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="min-h-10"
              onClick={() => copyText(projectLink, "project_link_copied", "link")}
            >
              {copied === "link" ? "Copied link" : "Copy project link"}
            </Button>
          </div>

          <div className="rounded-md border border-white/10 bg-card p-4">
            <h2 className="font-heading text-lg font-semibold">LinkedIn caption</h2>
            <pre className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
              {caption}
            </pre>
          </div>

          <div className="rounded-md border border-white/10 bg-card p-4">
            <h2 className="font-heading text-lg font-semibold">Instagram caption</h2>
            <pre className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
              {igCaption}
            </pre>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Guidance
              title="Instagram"
              body="Download the 1080x1920 PNG, open Instagram Stories, upload from camera roll. Paste the Instagram caption on the feed post if you also share to the grid. Manual upload only."
            />
            <Guidance
              title="LinkedIn"
              body="Paste the LinkedIn caption, attach a photo of your robot, and post. Keep Robotics & Automation Club, TSEC as the organizer."
            />
          </div>
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
            Story preview · 1080×1920
          </p>
          <div className="overflow-hidden rounded-md border border-white/10 bg-zinc-950">
            <canvas
              ref={canvasRef}
              width={1080}
              height={1920}
              className="h-auto w-full"
              aria-label="Instagram story preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function Guidance({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-md border border-white/10 p-4">
      <h3 className="font-heading font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

function buildLinkedInCaption(input: SocialGeneratorInput): string {
  const projectLink = absoluteUrl(WORKSHOP_PATH);
  return `We built an ESP32 walking robot.

Over two days, our team worked through mechanical assembly, electronics, embedded programming, servo control, OLED interfacing, debugging and robot testing.

The interesting part wasn't getting the first movement.
It was figuring out what to do when things didn't work.

Team:
${input.botId}
${input.teamName}
Members:
${input.members}
Robot:
${input.robotName}
Custom feature:
${input.feature}
${input.award ? `Result:\n${input.award}\n` : ""}
Built at the ESP32 Walking Robot Workshop by the Robotics & Automation Club, TSEC.

Project resources:
${projectLink}

#TSEC #RoboticsAutomationClub #ESP32 #WalkingRobot`;
}

function buildInstagramCaption(input: SocialGeneratorInput): string {
  return `We built an ESP32 walking robot.

${input.teamName} · ${input.botId}
Robot: ${input.robotName}
${input.feature ? `Feature: ${input.feature}` : ""}
${input.award ? `Result: ${input.award}` : ""}

Workshop by Robotics & Automation Club, TSEC.

#TSEC #RoboticsAutomationClub #ESP32 #WalkingRobot #BuildFailDebugWalk`;
}

function drawStory(
  canvas: HTMLCanvasElement,
  template: SocialTemplateId,
  input: SocialGeneratorInput,
  photo: HTMLImageElement | null,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const W = 1080;
  const H = 1920;

  ctx.fillStyle = "#0A0A0A";
  ctx.fillRect(0, 0, W, H);

  // subtle grid
  ctx.strokeStyle = "rgba(255,255,255,0.05)";
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y < H; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  // accent bar
  ctx.fillStyle = "#FFC107";
  ctx.fillRect(0, 0, 18, H);

  if (photo) {
    const targetH = template === "alive" ? 720 : 560;
    const targetY = template === "we-built" ? 520 : 480;
    drawCoverImage(ctx, photo, 80, targetY, W - 160, targetH);
  }

  ctx.fillStyle = "#FFC107";
  ctx.font = "600 28px sans-serif";
  ctx.fillText("ESP32 WALKING ROBOT", 80, 160);

  ctx.fillStyle = "#FAFAFA";
  ctx.font = "800 72px sans-serif";

  if (template === "we-built") {
    wrapText(ctx, "WE BUILT A ROBOT", 80, 280, W - 160, 80);
    ctx.font = "500 36px sans-serif";
    ctx.fillStyle = "#A3A3A3";
    ctx.fillText(`Team: ${input.teamName}`, 80, 480);
    ctx.fillText(input.botId, 80, photo ? 1280 : 560);
    ctx.fillText("Built. Programmed. Tested.", 80, photo ? 1340 : 620);
    ctx.fillStyle = "#FAFAFA";
    ctx.font = "600 32px sans-serif";
    ctx.fillText("Workshop", 80, photo ? 1460 : 760);
    ctx.font = "500 30px sans-serif";
    ctx.fillStyle = "#A3A3A3";
    wrapText(
      ctx,
      "Robotics & Automation Club, TSEC",
      80,
      photo ? 1520 : 820,
      W - 160,
      40,
    );
  }

  if (template === "alive") {
    wrapText(ctx, "OUR ROBOT IS ALIVE.", 80, 280, W - 160, 80);
    ctx.font = "500 34px sans-serif";
    ctx.fillStyle = "#A3A3A3";
    const y0 = photo ? 1280 : 560;
    ctx.fillText("Day 1 → Build", 80, y0);
    ctx.fillText("Day 2 → Program", 80, y0 + 60);
    ctx.fillText("Final → Robot Arena", 80, y0 + 120);
    ctx.fillStyle = "#FFC107";
    ctx.fillText(input.botId, 80, y0 + 220);
    ctx.fillStyle = "#A3A3A3";
    ctx.fillText("Robotics & Automation Club, TSEC", 80, y0 + 290);
  }

  if (template === "build-complete") {
    wrapText(ctx, "BUILD COMPLETE", 80, 280, W - 160, 80);
    ctx.font = "600 40px sans-serif";
    ctx.fillStyle = "#FFC107";
    ctx.fillText(input.botId, 80, 460);
    ctx.fillStyle = "#FAFAFA";
    ctx.font = "500 36px sans-serif";
    const y = photo ? 1280 : 560;
    ctx.fillText(`Robot: ${input.robotName}`, 80, y);
    ctx.fillText(`Feature: ${input.feature}`, 80, y + 70);
    ctx.fillText(`Award: ${input.award}`, 80, y + 140);
    ctx.fillStyle = "#A3A3A3";
    ctx.font = "500 28px sans-serif";
    wrapText(
      ctx,
      "ESP32 Walking Robot Workshop · Robotics & Automation Club, TSEC",
      80,
      y + 240,
      W - 160,
      36,
    );
  }
}

function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  const scale = Math.max(w / img.width, h / img.height);
  const sw = w / scale;
  const sh = h / scale;
  const sx = (img.width - sw) / 2;
  const sy = (img.height - sh) / 2;
  ctx.save();
  roundRectPath(ctx, x, y, w, h, 12);
  ctx.clip();
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  ctx.restore();
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 2;
  roundRectPath(ctx, x, y, w, h, 12);
  ctx.stroke();
}

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(" ");
  let line = "";
  let yy = y;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, yy);
      line = word;
      yy += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, yy);
}
