"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useContactModal } from "./ContactModalContext";
import ContactForm from "./ContactForm";

const emptySubscribe = () => () => {};

export default function ContactModal() {
  const { isOpen, closeContactModal } = useContactModal();
  const pathname = usePathname();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  // Close on Escape & prevent background body scrolling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeContactModal();
    };

    if (isOpen && pathname !== "/contact") {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeContactModal, pathname]);

  // NEVER render modal on the contact page or before mount
  if (!mounted || pathname === "/contact") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8 md:p-12 overflow-y-auto">
          {/* Backdrop with royal blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeContactModal}
            className="fixed inset-0 bg-royal-950/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card - Floated gracefully in the middle with distinct top/bottom gaps */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            className="relative w-full max-w-xl max-h-[82vh] flex flex-col bg-white rounded-xs border border-gold/40 shadow-2xl overflow-hidden z-10 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-royal-950 text-white px-6 py-4.5 sm:px-7 sm:py-5 border-b border-gold/30 flex items-center justify-between shrink-0">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-gold block mb-0.5">
                  Executive Inquiry &bull; ML Tandon
                </span>
                <h2
                  id="contact-modal-title"
                  className="font-serif text-2xl sm:text-3xl text-white tracking-wide"
                >
                  Get in Touch
                </h2>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={closeContactModal}
                aria-label="Close contact modal"
                className="text-white/60 hover:text-white transition-colors p-2 rounded-xs hover:bg-white/10 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body with internal smooth scrolling */}
            <div className="p-6 sm:p-7 overflow-y-auto flex-1">
              <ContactForm onSuccess={closeContactModal} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
