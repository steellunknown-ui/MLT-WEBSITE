import type { Metadata } from "next";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.siteName} — ${site.title}`,
  description: site.description,
};

export default function HomePage() {
  return (
    <Section tone="dark" spacing="xl">
      <div className="pt-16">
        <SectionHeading
          label="Welcome"
          heading={site.founderName}
          subheading={site.title}
          tone="dark"
          as="h1"
        />
      </div>
    </Section>
  );
}
