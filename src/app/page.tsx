import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { WhatWeDo } from "@/components/what-we-do";
import { Solutions } from "@/components/solutions";
import { Industries } from "@/components/industries";
import { Demo } from "@/components/demo";
import { Dashboard } from "@/components/dashboard";
import { RoiCalculator } from "@/components/roi-calculator";
import { Pricing } from "@/components/pricing";
import { ProcessTimeline } from "@/components/process-timeline";
import { WhyCogniv } from "@/components/why-cogniv";
import { About, FinalCta } from "@/components/about-cta";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Problem />
        <WhatWeDo />
        <Solutions />
        <Industries />
        <Demo />
        <Dashboard />
        <RoiCalculator />
        <Pricing />
        <ProcessTimeline />
        <WhyCogniv />
        <About />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
