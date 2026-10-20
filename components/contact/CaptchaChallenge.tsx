"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface CaptchaProps {
  onCodeChange: (code: string) => void;
}

const CHAR_SET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // Omits ambiguous chars (0, O, 1, I, l)

export default function CaptchaChallenge({ onCodeChange }: CaptchaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentCode, setCurrentCode] = useState("");

  const generateCaptcha = useCallback(() => {
    // Generate 6 random characters
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += CHAR_SET.charAt(Math.floor(Math.random() * CHAR_SET.length));
    }
    setCurrentCode(code);
    onCodeChange(code);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Background gradient with luxury dark navy/paper tones
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, "#081636");
    bgGradient.addColorStop(1, "#030a1c");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle background grid noise
    ctx.strokeStyle = "rgba(201, 162, 75, 0.12)";
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 15) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 12) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Distorted noise lines across the canvas
    const lineColors = [
      "rgba(201, 162, 75, 0.45)",
      "rgba(223, 186, 99, 0.35)",
      "rgba(255, 255, 255, 0.25)",
      "rgba(30, 64, 175, 0.5)",
    ];

    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = lineColors[i % lineColors.length];
      ctx.lineWidth = 1.2 + Math.random();
      ctx.beginPath();
      ctx.moveTo(Math.random() * 20, Math.random() * height);
      ctx.bezierCurveTo(
        Math.random() * width * 0.5,
        Math.random() * height,
        Math.random() * width,
        Math.random() * height,
        width - Math.random() * 20,
        Math.random() * height
      );
      ctx.stroke();
    }

    // Random noise dots
    for (let i = 0; i < 35; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? "rgba(201, 162, 75, 0.4)" : "rgba(255, 255, 255, 0.3)";
      ctx.beginPath();
      ctx.arc(
        Math.random() * width,
        Math.random() * height,
        Math.random() * 1.5,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Render characters with distortion, rotation, and color
    const fonts = ["serif", "sans-serif", "monospace"];
    const charColors = ["#dfba63", "#ffffff", "#c9a24b", "#f5f7fb", "#e2e8f0"];

    const startX = 16;
    const spacing = (width - 32) / 6;

    for (let i = 0; i < code.length; i++) {
      const char = code[i];
      const fontName = fonts[Math.floor(Math.random() * fonts.length)];
      const fontSize = 21 + Math.floor(Math.random() * 4); // 21px to 25px
      ctx.font = `bold ${fontSize}px ${fontName}`;
      ctx.fillStyle = charColors[i % charColors.length];
      ctx.textBaseline = "middle";

      const x = startX + i * spacing + (Math.random() * 3 - 1.5);
      const y = height / 2 + (Math.random() * 4 - 2);
      const angle = (Math.random() * 24 - 12) * (Math.PI / 180); // -12 to +12 deg

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      // Subtle shadow for legibility
      ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
      ctx.shadowBlur = 3;
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }
  }, [onCodeChange]);

  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  return (
    <div className="flex items-center gap-2 w-full">
      {/* Visual Canvas Display */}
      <div className="relative flex-1 min-w-0 h-[46px] rounded-xs border border-gold/40 shadow-inner overflow-hidden select-none bg-royal-950 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={180}
          height={46}
          className="w-full h-full block"
          title="Security CAPTCHA verification code"
          aria-label="Security CAPTCHA challenge"
        />
      </div>

      {/* Refresh Button */}
      <button
        type="button"
        onClick={generateCaptcha}
        aria-label="Generate new security code"
        title="Get a new security code"
        className="w-11 h-[46px] shrink-0 rounded-xs border border-gold/30 bg-paper-light hover:bg-gold hover:text-royal-950 text-royal-950/70 hover:border-gold flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs active:scale-95 group"
      >
        <svg
          className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>
    </div>
  );
}
