import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Transform } from "@/components/transform";
import { Problem } from "@/components/problem-section";
import { Solutions } from "@/components/solutions";
import { Websites } from "@/components/websites";
import { DemoPreview } from "@/components/demo-preview";
import { ProcessPreview } from "@/components/process-preview";
import { Industries } from "@/components/industries";
import { WhyCogniv } from "@/components/why-cogniv";
import { ToolsStrip } from "@/components/tools";
import { FaqPreview } from "@/components/faq";
import { FinalCta } from "@/components/about-cta";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: { absolute: "Cogniv Solutions | Business Automation" },
  description:
    "Cogniv builds business websites and automates repetitive work — WhatsApp enquiries, follow-ups, data entry, and reporting — around the tools you already use.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Transform />
        <Problem />
        <Solutions />
        <Websites />
        <DemoPreview />
        <ProcessPreview />
        <Industries />
        <WhyCogniv />
        <ToolsStrip />
        <FaqPreview />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
