import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { AboutHeader } from "@/components/about/AboutHeader";
import { AwardBadge, BotIdBadge } from "@/components/builders/Badges";
import { JsonLd } from "@/components/seo/JsonLd";
import { WorkshopSubnav } from "@/components/workshops/esp32-walking-robot/WorkshopSubnav";
import { getBuilderByBotId, seedBuilders } from "@/content/builders/seed";
import { isPublicProjectStatus } from "@/lib/public-data";
import { BUILDERS_PATH } from "@/lib/workshop-config";
import { OG_IMAGE, SITE_NAME, absoluteUrl } from "@/lib/site";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ botId: string }> };

export function generateStaticParams() {
  return seedBuilders.map((p) => ({ botId: p.botId }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { botId } = await params;
  const project = getBuilderByBotId(botId);
  if (!project) {
    return { title: "Builder not found" };
  }
  const title = `${project.robotName} · ${project.botId}`;
  const description = project.isSample
    ? `Layout sample. Not a real workshop team. ${project.description}`
    : project.description;
  const path = `${BUILDERS_PATH}${project.botId}/`;
  return {
    title,
    description,
    robots: project.isSample
      ? { index: false, follow: false }
      : { index: true, follow: true },
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      images: [
        {
          url: project.images[0]?.src || OG_IMAGE.url,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: project.images[0]?.alt || OG_IMAGE.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.images[0]?.src || OG_IMAGE.url],
    },
  };
}

export default async function BuilderProfilePage({ params }: Props) {
  const { botId } = await params;
  const project = getBuilderByBotId(botId);
  if (!project || !isPublicProjectStatus(project.status)) {
    notFound();
  }

  const path = `${BUILDERS_PATH}${project.botId}/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.robotName,
    description: project.description,
    url: absoluteUrl(path),
    identifier: project.botId,
  };

  return (
    <>
      {project.isSample ? null : <JsonLd data={jsonLd} />}
      <AboutHeader />
      <div className="pt-16 md:pt-20">
        <WorkshopSubnav />
        <main className="min-h-screen">
        <section className="border-b border-border pt-10 pb-12 md:pt-14">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <Link
              href={BUILDERS_PATH}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              ← All builders
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <BotIdBadge botId={project.botId} />
              {project.isSample ? (
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  Layout sample. Not a real team.
                </span>
              ) : null}
              {project.awards.map((a) => (
                <AwardBadge key={a.id} label={a.label} />
              ))}
            </div>
            <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">
              {project.robotName}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">{project.teamName}</p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
            <div className="space-y-4">
              {project.images.map((img) => (
                <div
                  key={img.id}
                  className="relative aspect-[4/3] overflow-hidden rounded-md border border-white/10"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-8">
              <MetaBlock title="Team" body={project.members.join(", ")} />
              <MetaBlock title="College" body={project.college} />
              <MetaBlock title="Workshop" body={project.workshopName} />
              <MetaBlock title="Date" body={project.date} />
              <MetaBlock title="Score" body={String(project.score)} />

              <div>
                <h2 className="text-xs font-heading uppercase tracking-wider text-muted-foreground">
                  Features
                </h2>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {project.features.map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xs font-heading uppercase tracking-wider text-muted-foreground">
                  Tech
                </h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-sm border border-white/10 px-2 py-1 text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {project.githubUrl ? (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    <Button variant="outline">GitHub</Button>
                  </a>
                ) : null}
                {project.demoUrl ? (
                  <a href={project.demoUrl} target="_blank" rel="noreferrer">
                    <Button variant="outline">Demo</Button>
                  </a>
                ) : null}
                <Link href="/workshops/esp32-walking-robot/" className="w-full sm:w-auto">
                  <Button className="w-full min-h-10 sm:w-auto">Workshop hub</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

function MetaBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="text-xs font-heading uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      <p className="mt-1 text-sm text-foreground">{body}</p>
    </div>
  );
}
