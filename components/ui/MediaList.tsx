"use client";

import { useState, useRef, KeyboardEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };
  
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
    setExpandedId(null);
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    setExpandedId(null);
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
              {currentItems.map((item, idx) => {
                const itemId = `${item.title}-${currentPage}-${idx}`;
                const isExpanded = expandedId === itemId;
                const pdfUrl = item.pdfUrl || (item.url?.startsWith("/media/magazine/") ? item.url : null);
                const curatedSlug = item.slug;
                const curatedArticleUrl = curatedSlug ? `/media/${curatedSlug}` : null;

                return (
                  <Reveal key={itemId} delay={idx * 0.03}>
                    <div className="py-7 border-b border-gold/20 hover:bg-white/50 transition-colors px-2 md:px-4 rounded-xs">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        {/* Date / Year Column */}
                        <div className="md:col-span-3 flex flex-col justify-start">
                          <span className="font-serif text-xl md:text-2xl font-bold text-royal-950 tracking-tight leading-snug">
                            {item.date}
                          </span>
                        </div>

                        {/* Content Column */}
                        <div className="md:col-span-6">
                          <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-1.5 font-mono">
                            {item.outlet}
                          </p>
                          <h3 className="font-serif text-xl md:text-2xl text-royal-950 font-medium leading-snug">
                            {item.title}
                          </h3>
                        </div>

                        {/* Action Toggle Button */}
                        <div className="md:col-span-3 flex items-center md:justify-end pt-1">
                          <button
                            type="button"
                            onClick={() => toggleExpand(itemId)}
                            aria-expanded={isExpanded}
                            className={`inline-flex items-center gap-2.5 px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-all rounded-xs shadow-2xs cursor-pointer border ${
                              isExpanded
                                ? "bg-royal-950 text-gold border-royal-950"
                                : "bg-white text-royal-950 border-gold/40 hover:bg-gold hover:text-royal-950 hover:border-gold"
                            }`}
                          >
                            <span>Read</span>
                            <motion.span
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="text-gold text-[10px]"
                            >
                              ▼
                            </motion.span>
                          </button>
                        </div>
                      </div>

                      {/* ── WATERFALL ANIMATION DRAWER ── */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{
                              opacity: 1,
                              height: "auto",
                              transition: {
                                height: { duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] },
                                opacity: { duration: 0.25 },
                                staggerChildren: 0.1,
                                delayChildren: 0.05,
                              },
                            }}
                            exit={{
                              opacity: 0,
                              height: 0,
                              transition: {
                                height: { duration: 0.25, ease: "easeInOut" },
                                opacity: { duration: 0.15 },
                              },
                            }}
                            className="overflow-hidden mt-4 pt-4 border-t border-gold/15"
                          >
                            <div className="bg-white/90 p-4 sm:p-5 rounded-xs border border-gold/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex items-center gap-2.5">
                                <span className="w-2 h-2 rounded-full bg-gold animate-pulse flex-shrink-0" />
                                <div>
                                  <span className="text-xs font-mono uppercase tracking-wider text-royal-950 font-bold block">
                                    Choose Reading Format
                                  </span>
                                  <span className="text-[11px] text-ink/65 font-sans">
                                    Select unedited original scan or bespoke curated editorial
                                  </span>
                                </div>
                              </div>

                              {/* Waterfall Cascading Buttons */}
                              <div className="flex flex-wrap items-center gap-3">
                                {/* Button 1: Original PDF */}
                                {pdfUrl ? (
                                  <motion.a
                                    variants={{
                                      initial: { opacity: 0, y: -8, scale: 0.95 },
                                      animate: {
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        transition: { type: "spring", stiffness: 400, damping: 25 },
                                      },
                                    }}
                                    href={pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wider uppercase text-royal-950 bg-paper hover:bg-gold/20 hover:text-royal-950 border border-gold/30 transition-all rounded-xs shadow-2xs group"
                                  >
                                    <svg className="w-3.5 h-3.5 text-royal-900 fill-current" viewBox="0 0 24 24">
                                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5h-2v3H6V7.5h3.5c1.1 0 2 .9 2 2v1c0 1.1-.9 2-2 2zm1 7h-1.5v-5h1.5v5zm6.5-3.5c0 .8-.7 1.5-1.5 1.5h-3V7.5h3c.8 0 1.5.7 1.5 1.5v6zm-6-8.5v3h1.5c.3 0 .5-.2.5-.5v-2c0-.3-.2-.5-.5-.5H11zm5 5h-1.5v-3H16v3z"/>
                                    </svg>
                                    <span>1. View Original PDF Scan</span>
                                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                                  </motion.a>
                                ) : (
                                  <motion.a
                                    variants={{
                                      initial: { opacity: 0, y: -8, scale: 0.95 },
                                      animate: {
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        transition: { type: "spring", stiffness: 400, damping: 25 },
                                      },
                                    }}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wider uppercase text-royal-950 bg-paper hover:bg-gold/20 transition-all rounded-xs border border-gold/30 shadow-2xs"
                                  >
                                    <span>1. Open External Source</span>
                                    <span aria-hidden="true">&rarr;</span>
                                  </motion.a>
                                )}

                                {/* Button 2: Curated Article */}
                                {curatedArticleUrl ? (
                                  <motion.div
                                    variants={{
                                      initial: { opacity: 0, y: -8, scale: 0.95 },
                                      animate: {
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        transition: { type: "spring", stiffness: 400, damping: 25 },
                                      },
                                    }}
                                  >
                                    <Link
                                      href={curatedArticleUrl}
                                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wider uppercase text-royal-950 bg-gold hover:bg-white hover:text-royal-950 border border-gold transition-all rounded-xs shadow-xs font-sans group"
                                    >
                                      <svg className="w-3.5 h-3.5 text-royal-950 fill-current" viewBox="0 0 20 20">
                                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                                      </svg>
                                      <span>2. Read Curated Article</span>
                                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
                                    </Link>
                                  </motion.div>
                                ) : (
                                  <motion.a
                                    variants={{
                                      initial: { opacity: 0, y: -8, scale: 0.95 },
                                      animate: {
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        transition: { type: "spring", stiffness: 400, damping: 25 },
                                      },
                                    }}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wider uppercase text-royal-950 bg-gold hover:bg-white transition-all rounded-xs shadow-xs font-sans"
                                  >
                                    <span>2. Read Online Article</span>
                                    <span aria-hidden="true">&rarr;</span>
                                  </motion.a>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                );
              })}
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
