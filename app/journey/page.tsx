import { site } from "@/lib/site";
import { getTimeline } from "@/lib/content";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Timeline from "@/components/ui/Timeline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Journey - ${site.founderName}`,
  description: "Explore the milestones and history of Manohar Lal Tandon's career.",
  openGraph: {
    title: `Journey - ${site.founderName}`,
    description: "Explore the milestones and history of Manohar Lal Tandon's career.",
    url: "/journey",
    siteName: site.siteName,
    locale: "en_US",
    type: "website",
  },
};

export default function JourneyPage() {
  const timelineItems = getTimeline();

  return (
    <div className="page-wrapper">
      {/* 1. Page Header */}
      <section className="relative bg-neutral-950 text-white pt-32 pb-20 md:pt-36 md:pb-24 min-h-[520px] md:min-h-[580px] lg:min-h-[620px] flex items-center justify-center overflow-hidden border-b border-gold/20">
        {/* Background Image - clearly visible with natural tone */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: "url('/images/tandon-group-journey-timeline.png')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
          }}
        />
        {/* Neutral dark scrim overlay for crisp text readability without heavy blue cast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-neutral-950/90" />

        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center max-w-4xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          <Reveal>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gold mb-5 font-royal bg-black/40 px-3 py-1 rounded-xs border border-gold/30 backdrop-blur-xs">
              Journey
            </span>
            <h1 className="font-royal text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 text-white uppercase tracking-wide">
              The Journey
            </h1>
            <p className="text-xl md:text-2xl text-gold-light/95 font-serif max-w-2xl mx-auto font-light leading-relaxed mb-6">
              Pioneering milestones across five decades of Indian electronics hardware manufacturing, global export excellence, and technological leadership.
            </p>
            <p className="text-sm text-white/80 max-w-2xl mx-auto font-sans leading-relaxed">
              1963 to Present: From Silicon Valley&apos;s IBM Laboratories to SEEPZ Export Powerhouses and Venture Incubation
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2. Timeline */}
      <section className="bg-paper text-ink py-24 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <Timeline items={timelineItems} />
        </div>
      </section>

      {/* 3. Closing */}
      <section className="bg-white text-ink py-24 md:py-32 text-center border-t border-gold/10">
        <div className="container mx-auto px-4 md:px-8">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-royal-950 mb-10 max-w-3xl mx-auto leading-tight">
              {site.about.closingLine}
            </h2>
            <Button as="link" href="/contact" size="lg">
              Get in touch
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}