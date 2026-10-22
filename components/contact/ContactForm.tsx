"use client";

import { useState } from "react";
import CaptchaChallenge from "@/components/contact/CaptchaChallenge";

interface ContactFormProps {
  onSuccess?: () => void;
  className?: string;
}

export default function ContactForm({ onSuccess, className = "" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "General Executive Enquiry",
    message: "",
    honeypot: "",
  });
  const [customSubject, setCustomSubject] = useState("");

  const [captchaInput, setCaptchaInput] = useState("");
  const [actualCaptcha, setActualCaptcha] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    // 1. Client-side CAPTCHA verification
    if (
      !captchaInput.trim() ||
      captchaInput.trim().toUpperCase() !== actualCaptcha.toUpperCase()
    ) {
      setStatus({
        type: "error",
        message: "Incorrect security verification code. Please check the characters and try again.",
      });
      return;
    }

    // 2. Custom enquiry category verification if 'Others' is selected
    const finalSubject =
      formData.subject === "Others" ? customSubject.trim() : formData.subject;

    if (formData.subject === "Others" && finalSubject.length < 2) {
      setStatus({
        type: "error",
        message: "Please enter your specific enquiry category.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          subject: finalSubject,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }

      setStatus({
        type: "success",
        message:
          "Thank you. Your message has been dispatched to the Office of the Chairman. We will be in touch shortly.",
      });

      // Clear form
      setFormData({
        name: "",
        email: "",
        organization: "",
        subject: "General Executive Enquiry",
        message: "",
        honeypot: "",
      });
      setCustomSubject("");
      setCaptchaInput("");

      if (onSuccess) {
        setTimeout(onSuccess, 2500);
      }
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.message || "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 sm:space-y-5 ${className}`}>
      {/* Honeypot field for bot trapping (hidden from users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website-hp">Do not fill this</label>
        <input
          id="website-hp"
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Row 1: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <div className="flex items-center justify-between mb-1.5 h-5">
            <label
              htmlFor="name"
              className="text-xs uppercase font-mono tracking-wider text-royal-950/80 font-semibold"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
          </div>
          <input
            id="name"
            type="text"
            name="name"
            required
            placeholder="e.g. Dr. Rajesh Sharma"
            value={formData.name}
            onChange={handleChange}
            className="w-full h-11 px-3.5 bg-paper-light border border-gold/30 rounded-xs text-royal-950 placeholder:text-ink/35 focus:outline-hidden focus:border-gold focus:ring-1 focus:ring-gold text-sm font-sans transition-all"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5 h-5">
            <label
              htmlFor="email"
              className="text-xs uppercase font-mono tracking-wider text-royal-950/80 font-semibold"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
          </div>
          <input
            id="email"
            type="email"
            name="email"
            required
            placeholder="name@organization.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-11 px-3.5 bg-paper-light border border-gold/30 rounded-xs text-royal-950 placeholder:text-ink/35 focus:outline-hidden focus:border-gold focus:ring-1 focus:ring-gold text-sm font-sans transition-all"
          />
        </div>
      </div>

      {/* Row 2: Organization & Enquiry Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <div className="flex items-center justify-between mb-1.5 h-5">
            <label
              htmlFor="organization"
              className="text-xs uppercase font-mono tracking-wider text-royal-950/80 font-semibold truncate"
            >
              Organization <span className="text-ink/45 font-normal font-sans text-[11px]">(Optional)</span>
            </label>
          </div>
          <input
            id="organization"
            type="text"
            name="organization"
            placeholder="e.g. Stanford / Tech Corp"
            value={formData.organization}
            onChange={handleChange}
            className="w-full h-11 px-3.5 bg-paper-light border border-gold/30 rounded-xs text-royal-950 placeholder:text-ink/35 focus:outline-hidden focus:border-gold focus:ring-1 focus:ring-gold text-sm font-sans transition-all"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5 h-5">
            <label
              htmlFor="subject"
              className="text-xs uppercase font-mono tracking-wider text-royal-950/80 font-semibold truncate"
            >
              Enquiry Category <span className="text-red-500">*</span>
            </label>
          </div>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full h-11 px-3.5 bg-paper-light border border-gold/30 rounded-xs text-royal-950 focus:outline-hidden focus:border-gold focus:ring-1 focus:ring-gold text-sm font-sans transition-all cursor-pointer"
          >
            <option value="General Executive Enquiry">General Executive Enquiry</option>
            <option value="Historical & Archival Documentation">Historical &amp; Archival Documentation</option>
            <option value="Technology Venture & Incubation">Technology Venture &amp; Incubation</option>
            <option value="Press & Media Relations">Press &amp; Media Relations</option>
            <option value="Academic & Research Enquiry">Academic &amp; Research Enquiry</option>
            <option value="Others">Others</option>
          </select>
        </div>
      </div>

      {/* If "Others" is selected, specify custom enquiry category manually */}
      {formData.subject === "Others" && (
        <div className="pt-0.5">
          <div className="flex items-center justify-between mb-1.5 h-5">
            <label
              htmlFor="customSubject"
              className="text-xs uppercase font-mono tracking-wider text-royal-950/80 font-semibold"
            >
              Specify Enquiry Category <span className="text-red-500">*</span>
            </label>
            <span className="text-[11px] text-ink/50 font-sans">
              Type your custom category
            </span>
          </div>
          <input
            id="customSubject"
            type="text"
            required
            placeholder="e.g. Philanthropy, Strategic Advisory, Partnerships..."
            value={customSubject}
            onChange={(e) => setCustomSubject(e.target.value)}
            className="w-full h-11 px-3.5 bg-paper-light border border-gold/50 rounded-xs text-royal-950 placeholder:text-ink/35 focus:outline-hidden focus:border-gold focus:ring-1 focus:ring-gold text-sm font-sans transition-all"
            autoFocus
          />
        </div>
      )}

      {/* Message */}
      <div>
        <div className="flex items-center justify-between mb-1.5 h-5">
          <label
            htmlFor="message"
            className="text-xs uppercase font-mono tracking-wider text-royal-950/80 font-semibold"
          >
            Message <span className="text-red-500">*</span>
          </label>
        </div>
        <textarea
          id="message"
          name="message"
          required
          rows={3}
          minLength={10}
          placeholder="Please share details regarding your enquiry or correspondence..."
          value={formData.message}
          onChange={handleChange}
          className="w-full px-3.5 py-2.5 bg-paper-light border border-gold/30 rounded-xs text-royal-950 placeholder:text-ink/35 focus:outline-hidden focus:border-gold focus:ring-1 focus:ring-gold text-sm font-sans transition-all resize-y min-h-[90px]"
        />
      </div>

      {/* Security Verification (CAPTCHA) - perfectly matching 2-column grid */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between h-5">
          <label
            htmlFor="captchaInput"
            className="text-xs uppercase font-mono tracking-wider text-royal-950/80 font-semibold flex items-center gap-1.5"
          >
            Security Verification <span className="text-red-500">*</span>
          </label>
          <span className="text-[11px] text-ink/50 font-sans">
            Enter 6-character code
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 items-center">
          <CaptchaChallenge onCodeChange={setActualCaptcha} />
          <input
            id="captchaInput"
            type="text"
            required
            maxLength={6}
            autoComplete="off"
            placeholder="ENTER CODE"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
            className="w-full h-[46px] px-3.5 bg-paper-light border border-gold/30 rounded-xs text-royal-950 placeholder:text-ink/35 font-mono text-center tracking-widest uppercase font-bold text-sm focus:outline-hidden focus:border-gold focus:ring-1 focus:ring-gold transition-all"
          />
        </div>
      </div>

      {/* Feedback Alert */}
      {status && (
        <div
          role="alert"
          className={`p-4 rounded-xs text-sm border font-sans leading-relaxed transition-all ${
            status.type === "success"
              ? "bg-emerald-50 text-emerald-950 border-emerald-300"
              : "bg-red-50 text-red-900 border-red-300"
          }`}
        >
          <div className="flex items-start gap-2.5">
            {status.type === "success" ? (
              <svg className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            <div>{status.message}</div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3.5 bg-gold text-royal-950 font-semibold text-xs tracking-widest uppercase rounded-xs border border-gold shadow-md hover:bg-royal-950 hover:text-gold hover:border-gold transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin w-4 h-4 text-royal-950" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span>Dispatching Message...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <span aria-hidden="true">&rarr;</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
