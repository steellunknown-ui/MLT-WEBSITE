"use client";

import React from "react";
import { useContactModal } from "./ContactModalContext";
import Button from "@/components/ui/Button";

interface ContactModalTriggerProps {
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function ContactModalTrigger({
  children = "Get in touch",
  variant = "primary",
  size = "lg",
  className = "",
}: ContactModalTriggerProps) {
  const { openContactModal } = useContactModal();

  return (
    <Button
      as="button"
      type="button"
      onClick={openContactModal}
      variant={variant}
      size={size}
      className={className}
    >
      {children}
    </Button>
  );
}
