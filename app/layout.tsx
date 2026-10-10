import type { Metadata } from "next";
import "./globals.css";
import { cormorant, inter, cinzel } from "@/lib/fonts";
import { site } from "@/lib/site";
import { siteUrl } from "@/lib/url";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: `${site.siteName} — ${site.title}`,
    template: `%s | ${site.siteName}`,
  },
  description: site.description,
  metadataBase: new URL(siteUrl()),
  openGraph: {
    type: "website",
    siteName: site.siteName,
    title: `${site.siteName} — ${site.title}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.siteName} — ${site.title}`,
    description: site.description,
  },
};

import MotionProvider from "@/components/ui/MotionProvider";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${cinzel.variable}`}
    >
      <body>
        <MotionProvider>
          {/* Skip-to-content for keyboard users */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>

          <Navbar />

          <main id="main-content" tabIndex={-1}>
            {children}
          </main>

          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
