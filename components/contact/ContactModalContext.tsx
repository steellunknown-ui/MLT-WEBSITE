"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface ContactModalContextType {
  isOpen: boolean;
  openContactModal: () => void;
  closeContactModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType>({
  isOpen: false,
  openContactModal: () => {},
  closeContactModal: () => {},
});

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const openContactModal = () => {
    // Never open popup modal if already on /contact page
    if (pathname === "/contact" || (typeof window !== "undefined" && window.location.pathname === "/contact")) {
      return;
    }
    setIsOpen(true);
  };

  const closeContactModal = () => setIsOpen(false);

  // Automatically ensure modal is closed whenever on /contact page
  useEffect(() => {
    if (pathname === "/contact") {
      setIsOpen(false);
    }
  }, [pathname]);

  // Listen for global custom event, hash changes, and click events on "Get in Touch" buttons
  useEffect(() => {
    const handleCustomOpen = () => {
      if (window.location.pathname !== "/contact") {
        setIsOpen(true);
      }
    };
    window.addEventListener("open-contact-modal", handleCustomOpen);

    const handleHashCheck = () => {
      if (window.location.pathname !== "/contact") {
        if (window.location.hash === "#get-in-touch" || window.location.hash === "#contact-form") {
          setIsOpen(true);
        }
      }
    };

    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a, button");
      if (!target) return;

      const href = target.getAttribute("href") || "";
      const text = target.textContent?.trim().toLowerCase() || "";
      const isGetInTouch =
        text.includes("get in touch") ||
        text.includes("get an touch") ||
        href === "#get-in-touch" ||
        href === "#contact-modal";

      // If user clicked a "Get in touch" button
      if (isGetInTouch) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        // If on /contact page, scroll down to the embedded inquiry form
        if (window.location.pathname === "/contact") {
          const formElem = document.getElementById("inquiry-form");
          if (formElem) {
            formElem.scrollIntoView({ behavior: "smooth" });
          }
          return;
        }

        // If on any other page, open the popup modal
        setIsOpen(true);
        return;
      }

      // Regular links to /contact (e.g. Navbar or Footer "Contact") navigate normally
    };

    window.addEventListener("hashchange", handleHashCheck);
    document.addEventListener("click", handleGlobalClick, true);
    handleHashCheck();

    return () => {
      window.removeEventListener("open-contact-modal", handleCustomOpen);
      window.removeEventListener("hashchange", handleHashCheck);
      document.removeEventListener("click", handleGlobalClick, true);
    };
  }, []);

  return (
    <ContactModalContext.Provider value={{ isOpen, openContactModal, closeContactModal }}>
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  return useContext(ContactModalContext);
}
