"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import ImageLightbox from "@/components/ui/ImageLightbox";

interface EventImage {
  src: string;
  title: string;
  caption: string;
}

const EVENT_IMAGES: EventImage[] = [
  {
    src: "/media/events/piyush-goyal/goyal-event-10.jpg",
    title: "Stage Commemoration with Dignitaries",
    caption:
      "Hon'ble Union Minister Shri Piyush Goyal and Mr. M. L. Tandon stand holding hands in mutual celebration alongside SEEPZ administrators and industry unitholders.",
  },
  {
    src: "/media/events/piyush-goyal/goyal-event-02.jpg",
    title: "Warm Greeting on Center Stage",
    caption:
      "Union Minister Shri Piyush Goyal warmly clasps the hand of pioneering industrialist Manohar Lal Tandon in recognition of his founding leadership at SEEPZ.",
  },
  {
    src: "/media/events/piyush-goyal/goyal-event-01.jpg",
    title: "Dignitary Reception & Welcome",
    caption:
      "Mr. M. L. Tandon arriving on stage to meet Union Minister Shri Piyush Goyal and fellow industry captains.",
  },
  {
    src: "/media/events/piyush-goyal/goyal-event-03.jpg",
    title: "Keynote Dialogue & Strategic Exchange",
    caption:
      "Minister Piyush Goyal engaged in deep conversation with Mr. Tandon regarding high-tech electronics manufacturing and export expansion.",
  },
  {
    src: "/media/events/piyush-goyal/goyal-event-04.jpg",
    title: "Ministerial Engagement",
    caption:
      "Hon'ble Minister discussing modern facility initiatives with Mr. M. L. Tandon against the backdrop of the NEST project inauguration.",
  },
  {
    src: "/media/events/piyush-goyal/goyal-event-05.jpg",
    title: "Founding Respect & Acknowledgement",
    caption:
      "A respectful exchange acknowledging five decades of pioneering contributions to India's precision hardware sector.",
  },
  {
    src: "/media/events/piyush-goyal/goyal-event-06.jpg",
    title: "Stage Address & Discussions",
    caption:
      "Minister Piyush Goyal addressing the assembly while consulting with veteran industry leaders on stage.",
  },
  {
    src: "/media/events/piyush-goyal/goyal-event-07.jpg",
    title: "SEEPZ Leadership Convergence",
    caption:
      "Senior administrators from the Department of Commerce, SEEPZ-SEZ, and GJEPC gather around Minister Goyal and Mr. Tandon.",
  },
  {
    src: "/media/events/piyush-goyal/goyal-event-08.jpg",
    title: "Stage Felicitation & Camaraderie",
    caption:
      "An informal and spirited greeting on stage reflecting camaraderie between public leadership and private industrial enterprise.",
  },
  {
    src: "/media/events/piyush-goyal/goyal-event-09.jpg",
    title: "Dignitaries Assembled for Inauguration",
    caption:
      "The leadership delegation assembled on the decorated stage for the official launch of the NEST-01 & NEST-02 Tower complex.",
  },
  {
    src: "/media/events/piyush-goyal/goyal-event-11.jpg",
    title: "Ceremony Proceeding",
    caption:
      "Officials and industry delegates participating in the inauguration protocol at SEEPZ, Andheri East, Mumbai.",
  },
  {
    src: "/media/events/piyush-goyal/goyal-event-12.jpg",
    title: "Industrial Delegation Gathering",
    caption:
      "Key unitholders and entrepreneurs from across SEEPZ welcoming the Union Minister of Commerce and Industry.",
  },
  {
    src: "/media/events/piyush-goyal/goyal-event-13.jpg",
    title: "Inaugural Stage Assembly",
    caption:
      "Celebrating the Golden Jubilee milestone of SEEPZ and ushering in next-generation service infrastructure.",
  },
];

export default function RecentEventsSection() {
  const [activePhoto, setActivePhoto] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);

  // Auto-advance photos every 4 seconds with smooth crossfade
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % EVENT_IMAGES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Smoothly scroll active thumbnail inside the horizontal strip ONLY (without affecting window scroll)
  useEffect(() => {
    if (!thumbnailStripRef.current) return;
    const container = thumbnailStripRef.current;
    const activeBtn = container.children[activePhoto] as HTMLElement;
    if (activeBtn) {
      const btnOffsetLeft = activeBtn.offsetLeft;
      const btnWidth = activeBtn.offsetWidth;
      const containerWidth = container.clientWidth;
      container.scrollTo({
        left: btnOffsetLeft - containerWidth / 2 + btnWidth / 2,
        behavior: "smooth",
      });
    }
  }, [activePhoto]);

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const nextPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActivePhoto((prev) => (prev + 1) % EVENT_IMAGES.length);
  };

  const prevPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActivePhoto((prev) => (prev - 1 + EVENT_IMAGES.length) % EVENT_IMAGES.length);
  };

  return (
    <section className="relative bg-royal-950 text-white py-20 md:py-28 overflow-hidden border-b border-gold/20">
      {/* Background Subtle Gradient & Grid Scrim */}
      <div className="absolute inset-0 bg-gradient-to-b from-royal-950 via-[#0a1b42] to-royal-950 opacity-90 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #c9a24b 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <Reveal>
          <div className="max-w-4xl mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/30 rounded-xs mb-3.5 backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-gold font-semibold">
                Recent Events &bull; Dignitary Engagements
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-wide mb-4 leading-tight">
              Hon&apos;ble Union Minister Shri Piyush Goyal &amp; M. L. Tandon at SEEPZ
            </h2>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-sans font-light">
              A momentous milestone commemorating five decades of pioneering industrial manufacturing at SEEPZ-SEZ, Mumbai.
              Hon&apos;ble Union Minister of Commerce &amp; Industry, <strong className="text-gold font-medium">Shri Piyush Goyal</strong>,
              joined <strong className="text-gold font-medium">Mr. Manohar Lal Tandon</strong> and key industry unitholders
              for the grand inauguration of the New Enterprises &amp; Service Tower (NEST-01 &amp; NEST-02).
            </p>

            {/* Event Metadata Pills */}
            <div className="flex flex-wrap items-center gap-2 mt-5 text-[11px] font-mono uppercase tracking-wider text-white/70">
              <span className="px-2.5 py-1 bg-white/5 border border-gold/20 rounded-xs">
                SEEPZ-SEZ, Mumbai
              </span>
              <span className="px-2.5 py-1 bg-white/5 border border-gold/20 rounded-xs">
                Ministry of Commerce &amp; Industry
              </span>
              <span className="px-2.5 py-1 bg-white/5 border border-gold/20 rounded-xs">
                NEST-01 &amp; NEST-02 Inauguration
              </span>
              <span className="px-2.5 py-1 bg-gold/15 text-gold border border-gold/40 rounded-xs font-semibold">
                SEEPZ Golden Jubilee
              </span>
            </div>
          </div>
        </Reveal>

        {/* 2-Column Split: Video Player on Left, Photo Gallery on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* LEFT: Video Player Card (6 cols) */}
          <div className="lg:col-span-6 flex flex-col">
            <Reveal delay={0.1} className="h-full flex flex-col">
              <div className="bg-royal-900/60 border border-gold/30 rounded-xs p-4 sm:p-5 h-full flex flex-col justify-between shadow-xl backdrop-blur-xs">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-gold font-semibold flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-red-500 fill-current animate-pulse" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="8" />
                      </svg>
                      Inauguration Video Footage
                    </span>
                    <span className="text-[11px] font-mono text-white/50">
                      Live Recording
                    </span>
                  </div>

                  {/* Responsive Video Container */}
                  <div className="relative aspect-video w-full bg-black rounded-xs overflow-hidden border border-gold/20 group">
                    <video
                      ref={videoRef}
                      src="/media/events/piyush-goyal/piyush-goyal-event.mp4"
                      poster="/media/events/piyush-goyal/goyal-event-10.jpg"
                      controls
                      playsInline
                      preload="metadata"
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      className="w-full h-full object-cover"
                    />

                    {/* Custom Play Overlay (when paused) */}
                    {!isPlaying && (
                      <div
                        onClick={toggleVideoPlay}
                        className="absolute inset-0 bg-black/45 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-black/35 group-hover:scale-100"
                        role="button"
                        aria-label="Play video"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") toggleVideoPlay();
                        }}
                      >
                        <div className="w-16 h-16 rounded-full bg-gold text-royal-950 flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110 active:scale-95">
                          <svg className="w-7 h-7 fill-current translate-x-0.5" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <span className="text-xs uppercase tracking-widest text-white/90 font-mono mt-3 font-semibold drop-shadow">
                          Watch Event Highlight
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Video Info Caption */}
                <div className="mt-4 pt-4 border-t border-gold/15">
                  <h3 className="font-serif text-lg text-white font-medium mb-1.5">
                    Ministerial Keynote &amp; Dignitary Assembly
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                    Live footage of the inaugural ceremony at the SEEPZ auditorium, where Union Minister Shri Piyush Goyal addressed the gathered assembly of exporters, entrepreneurs, and industrial pioneers.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: Photo Showcase & Interactive Thumbnail Strip with 4s Smooth Transition (6 cols) */}
          <div
            className="lg:col-span-6 flex flex-col"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <Reveal delay={0.2} className="h-full flex flex-col">
              <div className="bg-royal-900/60 border border-gold/30 rounded-xs p-4 sm:p-5 h-full flex flex-col justify-between shadow-xl backdrop-blur-xs">
                {/* Header & Photo Navigation */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-gold font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                      Archival Photo Gallery ({EVENT_IMAGES.length} Photographs)
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-white/50">
                        {String(activePhoto + 1).padStart(2, "0")} / {String(EVENT_IMAGES.length).padStart(2, "0")}
                      </span>
                      {/* Nav Arrows */}
                      <button
                        type="button"
                        onClick={prevPhoto}
                        aria-label="Previous photo"
                        className="w-7 h-7 rounded-xs border border-gold/30 hover:bg-gold hover:text-royal-950 text-white/70 flex items-center justify-center transition-colors cursor-pointer text-xs active:scale-95"
                      >
                        &larr;
                      </button>
                      <button
                        type="button"
                        onClick={nextPhoto}
                        aria-label="Next photo"
                        className="w-7 h-7 rounded-xs border border-gold/30 hover:bg-gold hover:text-royal-950 text-white/70 flex items-center justify-center transition-colors cursor-pointer text-xs active:scale-95"
                      >
                        &rarr;
                      </button>
                    </div>
                  </div>

                  {/* Main Active Photo Area with 4s Smooth Crossfade and Lightbox Trigger */}
                  <ImageLightbox
                    src={EVENT_IMAGES[activePhoto].src}
                    alt={EVENT_IMAGES[activePhoto].title}
                    className="block w-full text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    <div className="relative aspect-video w-full bg-black/50 rounded-xs overflow-hidden border border-gold/25 group cursor-zoom-in">
                      {/* Stack of all 13 images with 1-second smooth opacity crossfade */}
                      {EVENT_IMAGES.map((img, idx) => {
                        const isActive = idx === activePhoto;
                        return (
                          <div
                            key={img.src}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                            }`}
                          >
                            <Image
                              src={img.src}
                              alt={img.title}
                              fill
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                              priority={idx < 2}
                            />
                          </div>
                        );
                      })}

                      {/* Hover Overlay with expand hint */}
                      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3.5 pointer-events-none">
                        <span className="text-xs text-white/95 flex items-center gap-1.5 font-medium tracking-wide">
                          <svg className="w-4 h-4 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                          Click for high-resolution view
                        </span>
                        <span className="text-[11px] font-mono text-gold uppercase tracking-wider">
                          Photo {String(activePhoto + 1).padStart(2, "0")} / {String(EVENT_IMAGES.length).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  </ImageLightbox>

                  {/* Active Photo Title & Caption */}
                  <div className="mt-3 min-h-[58px]">
                    <h4 className="font-serif text-base text-gold font-medium mb-1 transition-all duration-300">
                      {EVENT_IMAGES[activePhoto].title}
                    </h4>
                    <p className="text-xs text-white/75 leading-relaxed font-sans line-clamp-2">
                      {EVENT_IMAGES[activePhoto].caption}
                    </p>
                  </div>
                </div>

                {/* Thumbnail Strip (Scrollable & Synchronized with 4s rotation) */}
                <div className="mt-3 pt-3.5 border-t border-gold/15">
                  <div
                    ref={thumbnailStripRef}
                    className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-gold/30"
                  >
                    {EVENT_IMAGES.map((img, idx) => {
                      const isSelected = idx === activePhoto;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActivePhoto(idx)}
                          className={`relative w-16 sm:w-20 aspect-video rounded-xs overflow-hidden shrink-0 transition-all duration-300 border cursor-pointer ${
                            isSelected
                              ? "border-gold ring-2 ring-gold/40 scale-105 opacity-100 shadow-md"
                              : "border-white/10 opacity-60 hover:opacity-100 hover:border-gold/50"
                          }`}
                          aria-label={`Select photo ${idx + 1}: ${img.title}`}
                        >
                          <Image
                            src={img.src}
                            alt={img.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-white/45 font-sans mt-1.5">
                    <span>Hover to pause &bull; Auto-transitioning every 4s</span>
                    <span>{EVENT_IMAGES.length} photographs total</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Historical Significance Highlights */}
        <Reveal delay={0.3}>
          <div className="mt-10 pt-8 border-t border-gold/20 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-white/5 border border-gold/15 rounded-xs">
              <span className="text-[11px] font-mono uppercase tracking-widest text-gold block mb-1 font-semibold">
                1978 &bull; SEEPZ Pioneer
              </span>
              <h4 className="font-serif text-base text-white font-medium mb-1.5">
                First Electronics Export Facility
              </h4>
              <p className="text-xs text-white/70 leading-relaxed font-sans">
                Manohar Lal Tandon founded the very first electronic manufacturing plant at SEEPZ, catalyzing India&apos;s computer peripherals and magnetic recording export industry.
              </p>
            </div>

            <div className="p-4 bg-white/5 border border-gold/15 rounded-xs">
              <span className="text-[11px] font-mono uppercase tracking-widest text-gold block mb-1 font-semibold">
                Next-Gen Infrastructure
              </span>
              <h4 className="font-serif text-base text-white font-medium mb-1.5">
                NEST-01 &amp; NEST-02 Towers
              </h4>
              <p className="text-xs text-white/70 leading-relaxed font-sans">
                The New Enterprises &amp; Service Tower complex provides over 1 million sq. ft. of world-class facilities for precision electronics, smart manufacturing, and gem &amp; jewelry innovation.
              </p>
            </div>

            <div className="p-4 bg-white/5 border border-gold/15 rounded-xs">
              <span className="text-[11px] font-mono uppercase tracking-widest text-gold block mb-1 font-semibold">
                National Vision Alignment
              </span>
              <h4 className="font-serif text-base text-white font-medium mb-1.5">
                $100B Electronics Export Milestone
              </h4>
              <p className="text-xs text-white/70 leading-relaxed font-sans">
                Collaborative engagement between the Ministry of Commerce &amp; Industry and Tandon Group leadership to accelerate Indian technology manufacturing onto the global stage.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
