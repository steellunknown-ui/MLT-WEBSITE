import type { Metadata } from "next";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Achievements",
  description: "Recognitions and achievements of Manohar Lal Tandon.",
};

export default function AchievementsPage() {
  return (
    <Section tone="dark" spacing="xl">
      <div className="pt-16">
        <SectionHeading
          label="Achievements"
          heading="Recognition & Awards"
          tone="dark"
          as="h1"
        />
      </div>
    </Section>
  );
}
