import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { Solutions } from "@/components/solutions";
import { ProcessTimeline } from "@/components/process-timeline";
import { Pricing } from "@/components/pricing";
import { WhyCogniv } from "@/components/why-cogniv";
import { Industries } from "@/components/industries";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

/**
 * Cogniv Solutions Homepage Architecture (9 Sections):
 * 1. HERO - Understand Cogniv & Primary CTA
 * 2. PROBLEM / PAIN POINTS - Relate to manual friction
 * 3. SOLUTIONS / USE CASES - Explore 4 practical workflows
 * 4. PROOF / DEMO - See the work getting done visually
 * 5. HOW IT WORKS - Understand the 5-step engagement process
 * 6. PRICING + ROI - Evaluate investment & capacity return
 * 7. WHY COGNIV - Build trust with workflow-first principles
 * 8. INDUSTRIES - Recognize relevance to their business
 * 9. FINAL CTA & AUDIT FORM - Low-friction conversion
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        {/* 1. HERO */}
        <Hero />

        {/* 2. PROBLEM / PAIN POINTS */}
        <Problem />

        {/* 3. SOLUTIONS / USE CASES */}
        <Solutions />

        {/* 4. HOW IT WORKS */}
        <ProcessTimeline />

        {/* 6. PRICING + ROI */}
        <Pricing />

        {/* 7. WHY COGNIV */}
        <WhyCogniv />

        {/* 8. INDUSTRIES */}
        <Industries />

        {/* 9. FINAL CTA & AUDIT FORM */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}


