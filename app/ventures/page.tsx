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
    <div className="w-full">
      {/* HEADER */}
      <section className="bg-royal-950 text-white pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <Reveal>
            <span className="block text-xs font-semibold uppercase tracking-widest text-gold mb-6">
              Ventures
            </span>
            <h1 className="font-serif text-5xl md:text-7xl mb-8">Ventures</h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-serif">
              {site.pages.ventures.intro}
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
                      <ImagePlaceholder 
                        aspectRatio="16/9" 
                        description={`PLACEHOLDER: logo of ${venture.name}`} 
                        className="border border-gold/10"
                      />
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
