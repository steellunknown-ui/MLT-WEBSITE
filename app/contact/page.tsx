import type { Metadata } from "next";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Manohar Lal Tandon or the Tandon Group.",
};

export default function ContactPage() {
  return (
    <Section tone="dark" spacing="xl">
      <div className="pt-16">
        <SectionHeading
          label="Contact"
          heading="Get in Touch"
          tone="dark"
          as="h1"
        />
      </div>
    </Section>
  );
}
