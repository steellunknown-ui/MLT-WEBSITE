"use client";

import { useState, useRef, KeyboardEvent } from "react";
import type { PressItem } from "@/lib/schema";
import Reveal from "@/components/ui/Reveal";

interface MediaListProps {
  items: PressItem[];
}

type FilterType = "All" | "article" | "video" | "interview";

const ITEMS_PER_PAGE = 10;

export default function MediaList({ items }: MediaListProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  
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

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleFilterSelect = (filter: FilterType) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
      handleFilterSelect(filters[newIndex].value);
    }
  };

  return (
    <div ref={containerRef} className="w-full scroll-mt-28">
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
              onClick={() => handleFilterSelect(filter.value)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`pb-4 relative text-sm font-semibold tracking-widest uppercase transition-colors cursor-pointer ${
                isActive ? "text-royal-950 font-bold" : "text-ink/50 hover:text-ink/80"
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
        {currentItems.length > 0 ? (
          <div>
            <div className="border-t border-gold/20">
              {currentItems.map((item, idx) => (
                <Reveal key={`${item.title}-${currentPage}-${idx}`} delay={idx * 0.03}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-b border-gold/20 hover:bg-white/60 transition-colors">
                    {/* Date / Year Column: Made bigger and bold per user request */}
                    <div className="md:col-span-3 flex flex-col justify-start">
                      <span className="font-serif text-xl md:text-2xl font-bold text-royal-950 tracking-tight leading-snug">
                        {item.date}
                      </span>
                    </div>

                    {/* Content Column */}
                    <div className="md:col-span-7">
                      <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-2">
                        {item.outlet}
                      </p>
                      <h3 className="font-serif text-2xl md:text-3xl text-royal-950 mb-3 leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    {/* Action Column */}
                    <div className="md:col-span-2 flex items-start md:justify-end pt-1">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-royal-950 hover:text-gold transition-colors group"
                        aria-label={`Read ${item.title} at ${item.outlet} (opens in a new tab)`}
                      >
                        Read <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-14 pt-8 border-t border-gold/20 flex items-center justify-center">
                {/* Pagination Navigation */}
                <nav aria-label="Pagination Navigation" className="flex items-center gap-2">
                  {/* Prev Button */}
                  <button
                    type="button"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                    className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all rounded-xs border ${
                      currentPage === 1
                        ? "border-gold/15 text-ink/30 cursor-not-allowed bg-transparent"
                        : "border-gold/30 text-royal-950 hover:bg-gold hover:text-royal-950 hover:border-gold active:scale-95 bg-white shadow-xs cursor-pointer"
                    }`}
                  >
                    <span aria-hidden="true">&larr;</span> Prev
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1.5 mx-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                      const isCurrent = pageNum === currentPage;
                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => goToPage(pageNum)}
                          aria-current={isCurrent ? "page" : undefined}
                          aria-label={`Go to page ${pageNum}`}
                          className={`w-9 h-9 flex items-center justify-center text-xs font-bold transition-all rounded-xs cursor-pointer ${
                            isCurrent
                              ? "bg-royal-950 text-gold shadow-sm ring-1 ring-gold/40"
                              : "bg-white text-ink/70 hover:text-royal-950 hover:border-gold border border-gold/20 hover:bg-gold/10"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                    className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all rounded-xs border ${
                      currentPage === totalPages
                        ? "border-gold/15 text-ink/30 cursor-not-allowed bg-transparent"
                        : "border-gold/30 text-royal-950 hover:bg-gold hover:text-royal-950 hover:border-gold active:scale-95 bg-white shadow-xs cursor-pointer"
                    }`}
                  >
                    Next <span aria-hidden="true">&rarr;</span>
                  </button>
                </nav>
              </div>
            )}
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
