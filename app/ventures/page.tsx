import type { Metadata } from "next";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Ventures",
  description: "The Tandon Group — businesses and ventures led by ML Tandon.",
};

export default function VenturesPage() {
  return (
    <Section tone="dark" spacing="xl">
      <div className="pt-16">
        <SectionHeading
          label="Ventures"
          heading="The Tandon Group"
          tone="dark"
          as="h1"
        />
      </div>
    </Section>
  );
}
