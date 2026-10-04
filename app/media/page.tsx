import type { Metadata } from "next";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Media",
  description: "Press coverage and media appearances of ML Tandon.",
};

export default function MediaPage() {
  return (
    <Section tone="dark" spacing="xl">
      <div className="pt-16">
        <SectionHeading
          label="Media"
          heading="Press & Coverage"
          tone="dark"
          as="h1"
        />
      </div>
    </Section>
  );
}
