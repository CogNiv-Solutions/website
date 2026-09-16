import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { WhatWeDo } from "@/components/what-we-do";
import { Solutions } from "@/components/solutions";
import { Industries } from "@/components/industries";
import { CaseStudies } from "@/components/case-studies";
import { StackChecker } from "@/components/stack-checker";
import { Demo } from "@/components/demo";
import { Dashboard } from "@/components/dashboard";
import { RoiCalculator } from "@/components/roi-calculator";
import { Pricing } from "@/components/pricing";
import { ProcessTimeline } from "@/components/process-timeline";
import { WhyCogniv } from "@/components/why-cogniv";
import { About, FinalCta } from "@/components/about-cta";
import { Faq } from "@/components/faq";
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
        <CaseStudies />
        <StackChecker />
        <Demo />
        <Dashboard />
        <RoiCalculator />
        <Pricing />
        <ProcessTimeline />
        <WhyCogniv />
        <About />
        <Faq />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}


