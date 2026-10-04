import type { Metadata } from "next";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the ML Tandon website.",
};

export default function PrivacyPage() {
  return (
    <Section tone="dark" spacing="xl">
      <div className="pt-16">
        <SectionHeading
          label="Legal"
          heading="Privacy Policy"
          tone="dark"
          as="h1"
        />
        <p className="mt-8 max-w-2xl font-sans text-base text-white/60">
          Privacy policy content will be added here. [CONFIRM: provide policy
          text or confirm jurisdiction for standard template.]
        </p>
      </div>
    </Section>
  );
}
