import type { Metadata } from "next";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Journey",
  description: "The professional journey of Manohar Lal Tandon.",
};

export default function JourneyPage() {
  return (
    <Section tone="dark" spacing="xl">
      <div className="pt-16">
        <SectionHeading
          label="Journey"
          heading="A Life in Industry"
          tone="dark"
          as="h1"
        />
      </div>
    </Section>
  );
}
