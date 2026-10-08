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
      <section className="bg-royal-950 text-white pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <Reveal>
            <span className="block text-sm font-semibold uppercase tracking-widest text-gold/80 mb-6">
              Journey
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-8">
              The Journey
            </h1>
            <p className="text-xl md:text-2xl text-white/70 font-serif">
              [TO BE FILLED: intro line]
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
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-royal-950 mb-10 max-w-3xl mx-auto">
              [TO BE FILLED: closing line]
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