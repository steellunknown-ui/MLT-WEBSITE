"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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

  const openContactModal = () => setIsOpen(true);
  const closeContactModal = () => setIsOpen(false);

  // Listen for global custom event, hash changes, and click events on /contact links
  useEffect(() => {
    const handleCustomOpen = () => setIsOpen(true);
    window.addEventListener("open-contact-modal", handleCustomOpen);

    const handleHashCheck = () => {
      if (window.location.hash === "#get-in-touch" || window.location.hash === "#contact-form") {
        setIsOpen(true);
      }
    };

    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href === "/contact" || href === "#contact-modal" || href === "#get-in-touch") {
        // If not on /contact page, open the popup modal directly
        if (window.location.pathname !== "/contact") {
          e.preventDefault();
          setIsOpen(true);
        } else {
          // If already on /contact page, scroll down to the form
          const formElem = document.getElementById("inquiry-form");
          if (formElem) {
            e.preventDefault();
            formElem.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };

    window.addEventListener("hashchange", handleHashCheck);
    document.addEventListener("click", handleGlobalClick);
    handleHashCheck();

    return () => {
      window.removeEventListener("open-contact-modal", handleCustomOpen);
      window.removeEventListener("hashchange", handleHashCheck);
      document.removeEventListener("click", handleGlobalClick);
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
