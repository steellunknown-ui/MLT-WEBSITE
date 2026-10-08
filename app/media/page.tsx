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
      <section className="bg-royal-950 text-white pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <Reveal>
            <span className="block text-xs font-semibold uppercase tracking-widest text-gold mb-6">
              Media
            </span>
            <h1 className="font-serif text-5xl md:text-7xl mb-8">Media</h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-serif mb-12">
              {site.pages.media.intro}
            </p>
            {hasMediaKit && (
              <a 
                href="/media-kit.pdf" 
                download
                className="inline-block px-8 py-4 bg-gold text-royal-950 text-sm font-semibold tracking-widest uppercase transition-colors hover:bg-white"
              >
                Download Media Kit
              </a>
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
