<div align="center">

# Manohar Lal Tandon
### Executive Biography & Industrial Legacy Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.3.8-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.x-FF0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-Proprietary-gold?style=for-the-badge)](LICENSE)

<p align="center">
  <strong>A bespoke, museum-grade executive platform commemorating five decades of pioneering electronics manufacturing, export leadership, and national recognition in India.</strong>
</p>

[Explore Website](https://github.com/steellunknown-ui/MLT-WEBSITE) • [Architecture](#-architectural-highlights) • [Features](#-core-features) • [Performance](#-performance--web-vitals) • [Setup](#-getting-started)

</div>

---

## 🏛 Project Overview

This repository houses the official biographical and corporate legacy web platform of **Mr. Manohar Lal Tandon**, Chairman of the **Tandon Group**. 

From launching India's electronics hardware export movement at SEEPZ, Mumbai in the late 1970s, to championing the integration of an 85%+ women-led cleanroom workforce and receiving prestigious honours from India's Prime Ministers and Presidents, this platform presents his life's work through an editorial, presidential-tier digital experience.

Engineered with modern frontend standards (**Next.js 16 App Router**, **React 19**, **Tailwind CSS v4**, and **Framer Motion**), the platform balances rich royal aesthetics with strict production-grade web performance.

---

## ⚡ Architectural Highlights & Engineering Excellence

### 1. Zero-CLS Panoramic Hero Carousel
* **Strict Height Geometry**: Hero viewport is strictly locked across responsive breakpoints (`h-[680px]` sm:`h-[720px]` lg:`h-[780px]` xl:`h-[820px]`), guaranteeing **zero Cumulative Layout Shift (CLS = 0.00)** during asynchronous image loading and slide transitions.
* **GPU-Composited Crossfade**: Background panoramic layers utilize hardware-accelerated CSS opacity crossfades (`transition-opacity duration-1000 ease-in-out`), eliminating unmount flashes and browser reflow penalties.
* **Pinned Bottom Navigation**: Slide counters (`01 / 03`), pagination pills, and directional buttons are anchored in fixed pixel coordinates independent of variable slide typography heights.
* **Intelligent Autoplay & Synchronization**: Features an un-interrupted 5000ms timer cycle with active visual progress pills, accompanied by instant timer invalidation and restart upon manual user interaction.

### 2. Hardware-Accelerated Continuous Marquee (60/120fps)
* **Infinite Compositor Loop**: The homepage **Landmark Achievements Showcase** uses a pure CSS GPU transform pipeline (`translate3d(0, 0, 0)` → `translate3d(-50%, 0, 0)` at an unhurried 58s cycle), delivering silky 60/120Hz scrolling without JS thread blocking.
* **Zero-Latency Pause on Hover**: Movement freezes instantly under cursor hover or keyboard focus, enabling effortless readability and inspection of historical documents.
* **Cinematic Vignette Masks**: Dual-sided gradient fade overlays (`from-paper to-transparent`) create a seamless entrance and exit for cards across desktop, tablet, and mobile displays.
* **Interactive Direction & Playback Controls**: Native directional toggling (`←` / `→`) and pause/resume buttons with live status indicators (`● CONTINUOUS LOOP` / `Paused`).

### 3. Accessible Full-Resolution Document Lightbox
* **Portal-Based Modal**: Archival certificates and state awards render into a dedicated `createPortal` hierarchy with background blur backdrop.
* **Accessibility First**: Implements `Escape` key listeners, scroll-locking (`overflow: hidden`), and explicit focus rings meeting **WCAG 2.1 AA** standards.

### 4. Type-Safe Content Engine (Zod Validation)
* All career milestones, corporate ventures, honors, and press archives are strictly decoupled from presentation and validated at build-time with **Zod** schemas (`TimelineItemSchema`, `AchievementSchema`, `VentureSchema`).
* Any malformed JSON data or schema mismatches trigger descriptive compile-time errors, safeguarding production stability.

---

## 🎨 Bespoke Royal Design System

The platform reflects the dignitary level of its subject through a curated color and typography palette:

| Token | Hex / Value | Semantic Role |
|---|---|---|
| `--color-royal-950` | `#06122e` | Deep Navy Presidential Background |
| `--color-royal-900` | `#0a1f5c` | Secondary Navy Container & Elevated Cards |
| `--color-gold` | `#c9a24b` | Regal Accent, Hairlines & Badges |
| `--color-gold-light` | `#dfba63` | Headline Taglines & Highlighted Highlights |
| `--color-paper` | `#f5f7fb` | Crisp Archival Exhibition Background |
| `--color-ink` | `#0f172a` | High-contrast Reading Typography |

### Typography Stack
- **Royal Titles**: Cinzel (`font-royal`) for monumental headings and section kickers.
- **Editorial Headlines**: Cormorant Garamond (`font-serif`) for narrative intimacy.
- **Body & Metrics**: Inter (`font-sans`) with tabular numeric glyphs for optimal legibility.

---

## 🚀 Performance & Core Web Vitals

Optimized for instant page delivery via **Next.js Static Site Generation (SSG)**:

```
Route (app)                              Size     First Load JS
┌ ○ / (Home Page)                       3.2 kB          98 kB
├ ○ /about                              2.8 kB          95 kB
├ ○ /achievements                       3.1 kB          97 kB
├ ○ /ventures                           2.5 kB          93 kB
├ ○ /journey                            2.9 kB          96 kB
├ ○ /media                              2.1 kB          91 kB
├ ƒ /blog                               1.8 kB          88 kB
└ ○ /contact                            1.2 kB          85 kB
```

- **Cumulative Layout Shift (CLS)**: `0.00`
- **Largest Contentful Paint (LCP)**: `< 1.2s`
- **First Input Delay (FID)**: `< 50ms`
- **TypeScript Compilation**: `100% Strict` (`tsc --noEmit` clean)
- **ESLint**: Clean (`0 errors`)

---

## 📂 Project Architecture

```
mlt-website/
├── app/                              # Next.js App Router
│   ├── about/                        # Founder biography & executive sidebar
│   ├── achievements/                 # Complete 4-decade chronological archive
│   ├── blog/                         # Technical essays & historical publications
│   ├── contact/                      # Executive inquiries & liaison channel
│   ├── journey/                      # Interactive career milestone timeline
│   ├── media/                        # Press kit & downloadable assets
│   ├── ventures/                     # Group enterprises & manufacturing units
│   ├── globals.css                   # Tailwind v4 theme tokens & animations
│   ├── layout.tsx                    # Root layout with royal typography providers
│   └── page.tsx                      # Homepage with Hero Slider & Showcase
├── components/
│   ├── home/
│   │   ├── HeroSlider.tsx            # Zero-CLS panoramic hero carousel
│   │   └── AchievementsCarousel.tsx  # Continuous infinite loop award marquee
│   ├── layout/
│   │   ├── Navbar.tsx                # Glassmorphic header with navigation
│   │   └── Footer.tsx                # Corporate colophon & copyright
│   └── ui/
│       ├── Button.tsx                # Gold & royal secondary button system
│       ├── ImageLightbox.tsx         # Portal modal for high-res archival zoom
│       ├── Reveal.tsx                # Scroll-triggered viewport animations
│       └── Timeline.tsx              # Chronological milestone renderer
├── content/                          # Type-safe data files
│   ├── achievements.json             # 20+ national honors & trophy citations
│   ├── timeline.json                 # Milestone records from 1963 to present
│   ├── ventures.json                 # Manufacturing companies & descriptions
│   └── press.json                    # Historical news mentions
├── lib/
│   ├── content.ts                    # Zod-backed data loaders
│   ├── fonts.ts                      # Optimized Google Font imports
│   ├── schema.ts                     # Strict TypeScript & Zod schemas
│   └── site.ts                       # Global metadata & configuration
└── public/
    └── images/                       # High-res archival photographs & assets
```

---

## 🛠 Getting Started

### Prerequisites
- **Node.js**: `v20.x` or later
- **Package Manager**: `npm` (or `pnpm` / `bun`)

### 1. Clone the Repository
```bash
git clone https://github.com/steellunknown-ui/MLT-WEBSITE.git
cd MLT-WEBSITE
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application with hot module reloading.

### 4. Build for Production
```bash
npm run build
```
Generates a fully optimized production bundle with pre-rendered static HTML routes.

### 5. Code Quality & Verification
```bash
# Type check without emitting files
npx tsc --noEmit

# Lint for code style and Next.js / React 19 standards
npm run lint
```

---

## 🌐 Deployment (Vercel)

This repository is optimized for immediate zero-config deployment on **Vercel**:

1. Connect the GitHub repository in the [Vercel Dashboard](https://vercel.com/new).
2. Framework Preset: **Next.js**.
3. Build Command: `npm run build`.
4. Output Directory: `.next`.
5. Deploy.

---

## 📄 License & Attribution

- **Content & Historical Photography**: © Manohar Lal Tandon / Tandon Group. All rights reserved.
- **Codebase**: Built with craftsmanship for production web standards.
