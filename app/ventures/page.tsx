import Image from "next/image";
import { site } from "@/lib/site";
import { getVentures } from "@/lib/content";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Reveal from "@/components/ui/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Ventures - ${site.founderName}`,
  description: site.pages.ventures.intro,
};

export default function VenturesPage() {
  const ventures = getVentures();

  return (
    <div className="page-wrapper">
      {/* 1. Page Header */}
      <section className="relative bg-neutral-950 text-white pt-32 pb-20 md:pt-36 md:pb-24 min-h-[520px] md:min-h-[580px] lg:min-h-[620px] flex items-center justify-center overflow-hidden border-b border-gold/20">
        {/* Background Image - clearly visible with natural tone */}
        <div 
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: "url('/images/seepz-cleanroom-manufacturing.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
          }}
        />
        {/* Neutral dark scrim overlay for crisp text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-neutral-950/90" />

        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center max-w-4xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          <Reveal>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gold mb-5 font-royal bg-black/40 px-3 py-1 rounded-xs border border-gold/30 backdrop-blur-xs">
              Ventures
            </span>
            <h1 className="font-royal text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 text-white uppercase tracking-wide">
              Group Ventures
            </h1>
            <p className="text-xl md:text-2xl text-gold-light/95 font-serif max-w-2xl mx-auto font-light leading-relaxed mb-6">
              {site.pages.ventures.intro}
            </p>
            <p className="text-sm text-white/80 max-w-2xl mx-auto font-sans leading-relaxed">
              Operating out of SEEPZ, Mumbai, supplying micro-precision hardware for IBM, Apple, HP, Compaq, and Hitachi
            </p>
          </Reveal>
        </div>
      </section>

      {/* VENTURES LIST */}
      <section>
        {ventures.map((venture, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <article 
              key={idx} 
              className={`py-24 md:py-32 border-b border-gold/10 ${isEven ? 'bg-white' : 'bg-paper'}`}
            >
              <div className="container mx-auto px-4 md:px-8">
                <div className={`flex flex-col gap-12 lg:gap-24 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  {/* Image Column */}
                  <div className="w-full lg:w-1/2">
                    <Reveal delay={0.1} distance={30}>
                      {venture.logo ? (
                        <div className="relative aspect-video w-full max-w-lg mx-auto flex items-center justify-center">
                          <Image
                            src={venture.logo}
                            alt={`${venture.name} logo`}
                            fill
                            className="object-contain"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                        </div>
                      ) : (
                        <ImagePlaceholder 
                          aspectRatio="16/9" 
                          description={`PLACEHOLDER: logo of ${venture.name}`} 
                          className="border border-gold/10"
                        />
                      )}
                    </Reveal>
                  </div>
                  
                  {/* Text Column */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <Reveal delay={0.2} distance={30}>
                      <h2 className="font-serif text-4xl md:text-5xl text-royal-950 mb-6">
                        {venture.name}
                      </h2>
                      <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-8">
                        {venture.role} <span className="mx-2 text-ink/30">|</span> Since {venture.since}
                      </p>
                      <p className="text-lg text-ink/80 leading-relaxed mb-8 max-w-xl">
                        {venture.description}
                      </p>
                      {venture.website && (
                        <a 
                          href={venture.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-royal-950 hover:text-gold transition-colors"
                        >
                          Visit Website <span aria-hidden="true">&rarr;</span>
                        </a>
                      )}
                    </Reveal>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
