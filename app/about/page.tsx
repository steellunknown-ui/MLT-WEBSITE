import type { Metadata } from "next";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description: "About Manohar Lal Tandon — Chairman, Tandon Group.",
};

export default function AboutPage() {
  return (
    <Section tone="dark" spacing="xl">
      <div className="pt-16">
        <SectionHeading
          label="About"
          heading="About ML Tandon"
          tone="dark"
          as="h1"
        />
      </div>
    </Section>
  );
}
