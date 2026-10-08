"use client";

import { useState, useRef, KeyboardEvent } from "react";
import type { PressItem } from "@/lib/schema";
import Reveal from "@/components/ui/Reveal";

interface MediaListProps {
  items: PressItem[];
}

type FilterType = "All" | "article" | "video" | "interview";

export default function MediaList({ items }: MediaListProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  
  const filters: { label: string; value: FilterType }[] = [
    { label: "All", value: "All" },
    { label: "Articles", value: "article" },
    { label: "Videos", value: "video" },
    { label: "Interviews", value: "interview" },
  ];

  const filteredItems = activeFilter === "All" 
    ? items 
    : items.filter(item => item.type === activeFilter);

  const getCount = (value: FilterType) => {
    if (value === "All") return items.length;
    return items.filter(item => item.type === value).length;
  };

  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let newIndex = index;
    if (e.key === "ArrowRight") {
      newIndex = (index + 1) % filters.length;
    } else if (e.key === "ArrowLeft") {
      newIndex = (index - 1 + filters.length) % filters.length;
    }
    
    if (newIndex !== index) {
      e.preventDefault();
      tabsRef.current[newIndex]?.focus();
      setActiveFilter(filters[newIndex].value);
    }
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div 
        role="tablist" 
        aria-label="Media categories"
        className="flex flex-wrap items-center gap-8 mb-12 border-b border-gold/20"
      >
        {filters.map((filter, idx) => {
          const isActive = activeFilter === filter.value;
          return (
            <button
              key={filter.value}
              ref={el => { tabsRef.current[idx] = el }}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${filter.value}`}
              id={`tab-${filter.value}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveFilter(filter.value)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`pb-4 relative text-sm font-semibold tracking-widest uppercase transition-colors ${
                isActive ? "text-royal-950" : "text-ink/50 hover:text-ink/80"
              }`}
            >
              {filter.label} <span className="ml-1 text-xs opacity-70">({getCount(filter.value)})</span>
              {isActive && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gold" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div 
        id={`panel-${activeFilter}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeFilter}`}
        className="w-full"
      >
        {filteredItems.length > 0 ? (
          <div className="border-t border-gold/20">
            {filteredItems.map((item, idx) => (
              <Reveal key={`${item.title}-${idx}`} delay={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-b border-gold/20 hover:bg-white/50 transition-colors">
                  <div className="md:col-span-3">
                    <p className="text-sm font-serif italic text-ink/70">
                      {item.date}
                    </p>
                  </div>
                  <div className="md:col-span-7">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-2">
                      {item.outlet}
                    </p>
                    <h3 className="font-serif text-2xl md:text-3xl text-royal-950 mb-3">
                      {item.title}
                    </h3>
                  </div>
                  <div className="md:col-span-2 flex items-start md:justify-end">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-royal-950 hover:text-gold transition-colors"
                      aria-label={`Read ${item.title} at ${item.outlet} (opens in a new tab)`}
                    >
                      Read <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="py-16 text-center bg-white border border-gold/10">
              <p className="font-serif text-xl text-ink/60">
                [TO BE FILLED: no items in this category yet]
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
