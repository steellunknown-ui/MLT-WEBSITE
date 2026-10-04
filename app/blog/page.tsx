import type { Metadata } from "next";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writings and perspectives by Manohar Lal Tandon.",
};

export default function BlogPage() {
  return (
    <Section tone="dark" spacing="xl">
      <div className="pt-16">
        <SectionHeading
          label="Blog"
          heading="Writings"
          tone="dark"
          as="h1"
        />
      </div>
    </Section>
  );
}
