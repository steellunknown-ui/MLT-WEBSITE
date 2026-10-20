import { site } from "@/lib/site";
import { getPress } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import MediaList from "@/components/ui/MediaList";
import fs from "fs";
import path from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Media - ${site.founderName}`,
  description: site.pages.media.intro,
};

export default function MediaPage() {
  const pressItems = getPress();
  
  // Check if public/media-kit.pdf exists
  const mediaKitPath = path.join(process.cwd(), "public", "media-kit.pdf");
  const hasMediaKit = fs.existsSync(mediaKitPath);

  return (
    <div className="w-full">
      {/* HEADER */}
      <section className="relative bg-neutral-950 text-white pt-32 pb-20 md:pt-36 md:pb-24 min-h-[520px] md:min-h-[580px] lg:min-h-[620px] flex items-center justify-center overflow-hidden border-b border-gold/20">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: "url('/images/media-hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
        />
        {/* Neutral dark scrim overlay for crisp text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-neutral-950/90" />

        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center max-w-4xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          <Reveal>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gold mb-5 bg-black/40 px-3 py-1 rounded-xs border border-gold/30 backdrop-blur-xs font-mono">
              Media
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 text-white uppercase tracking-wide">
              Press &amp; Media
            </h1>
            <p className="text-xl md:text-2xl text-gold-light/95 font-serif max-w-2xl mx-auto font-light leading-relaxed mb-6">
              {site.pages.media.intro}
            </p>
            {hasMediaKit && (
              <div className="mt-4">
                <a 
                  href="/media-kit.pdf" 
                  download
                  className="inline-block px-8 py-3.5 bg-gold text-royal-950 text-xs font-semibold tracking-widest uppercase transition-colors hover:bg-white rounded-xs shadow-md"
                >
                  Download Media Kit
                </a>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* MEDIA LIST */}
      <section className="bg-paper py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <MediaList items={pressItems} />
        </div>
      </section>
    </div>
  );
}
