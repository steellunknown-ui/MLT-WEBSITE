import { site } from "@/lib/site";
import Button from "@/components/ui/Button";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Reveal from "@/components/ui/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `About - ${site.founderName}`,
  description: "Learn more about the life and leadership of Manohar Lal Tandon.",
  openGraph: {
    title: `About - ${site.founderName}`,
    description: "Learn more about the life and leadership of Manohar Lal Tandon.",
    url: "/about",
    siteName: site.siteName,
    locale: "en_US",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="page-wrapper">
      {/* 1. Page Header */}
      <section className="bg-royal-950 text-white pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <Reveal>
            <span className="block text-sm font-semibold uppercase tracking-widest text-gold/80 mb-6">
              About
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-8">
              About {site.founderName}
            </h1>
            <p className="text-xl md:text-2xl text-white/70 font-serif">
              [TO BE FILLED: intro line]
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2. Story */}
      <section className="bg-white text-ink py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative items-start">
            {/* Left 4 cols sticky portrait */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 relative z-0">
              <Reveal>
                <ImagePlaceholder
                  aspectRatio="4/5"
                  description="PLACEHOLDER: portrait"
                  className="border border-gold/10"
                />
              </Reveal>
            </div>

            {/* Right 8 cols story */}
            <div className="lg:col-span-8">
              <Reveal delay={0.1}>
                <div className="max-w-[65ch] space-y-8 text-lg text-ink/80 leading-relaxed font-sans">
                  {site.about.story.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className={
                        idx === 0
                          ? "first-letter:font-serif first-letter:text-7xl first-letter:float-left first-letter:mr-3 first-letter:leading-[0.8] first-letter:text-gold first-line:tracking-wide first-line:uppercase first-line:text-sm first-line:font-semibold first-line:text-royal-950"
                          : ""
                      }
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Leadership roles */}
      <section className="bg-paper text-ink py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-5xl text-royal-950 mb-16">
              Leadership Roles
            </h2>
          </Reveal>

          <div className="border-t border-gold/20">
            {site.about.roles.map((role, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="border-b border-gold/20 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h3 className="font-serif text-2xl md:text-3xl text-royal-950 max-w-3xl">
                    {role.title}
                  </h3>
                  <div className="text-xs font-semibold uppercase tracking-widest text-ink/50 text-left md:text-right flex flex-col gap-1 shrink-0">
                    <span>{role.place}</span>
                    <span>{role.years}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Vision and Mission */}
      <section className="bg-royal-900 text-white border-y border-gold/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gold/20">
            <Reveal className="py-20 md:py-32 md:pr-16 lg:pr-24 flex flex-col justify-center">
              <span className="block text-sm font-semibold uppercase tracking-widest text-gold/80 mb-6">
                Vision
              </span>
              <p className="font-serif text-2xl md:text-3xl leading-snug text-white/90">
                &ldquo;{site.about.vision}&rdquo;
              </p>
            </Reveal>

            <Reveal delay={0.1} className="py-20 md:py-32 md:pl-16 lg:pl-24 flex flex-col justify-center">
              <span className="block text-sm font-semibold uppercase tracking-widest text-gold/80 mb-6">
                Mission
              </span>
              <p className="font-serif text-2xl md:text-3xl leading-snug text-white/90">
                &ldquo;{site.about.mission}&rdquo;
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. Values */}
      <section className="bg-white text-ink py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-5xl text-royal-950 mb-16 md:mb-24 text-center">
              Core Values
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 max-w-5xl mx-auto">
            {site.about.values.map((value, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="flex gap-6">
                  <div className="font-serif text-5xl md:text-6xl text-gold/30 shrink-0 leading-none">
                    0{idx + 1}
                  </div>
                  <div className="pt-2">
                    <h3 className="font-serif text-2xl text-royal-950 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-ink/70">
                      {value.line}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Closing */}
      <section className="bg-royal-950 text-white py-24 md:py-32 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gold"></div>
        <div className="container mx-auto px-4 md:px-8">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-10 max-w-3xl mx-auto">
              {site.about.closingLine}
            </h2>
            <Button as="link" href="/journey" size="lg">
              Read the Journey
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}