"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Contact } from "@/components/contact";
import { Reveal } from "@/components/reveal";
import {
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  TrendingUp,
  FileCheck,
  CalendarCheck,
  Zap,
} from "lucide-react";

const auditDeliverables = [
  {
    title: "Bottleneck Mapping",
    description: "Detailed breakdown of where your team loses hours to copy-pasting, chat delays, or double data entry.",
    icon: Clock,
  },
  {
    title: "Tool Compatibility Check",
    description: "Assessment of how WhatsApp API, Tally ERP, Zoho, Excel, and databases can integrate seamlessly.",
    icon: Zap,
  },
  {
    title: "14-Day Implementation Blueprint",
    description: "Step-by-step scope for deploying your first working automation prototype with zero business disruption.",
    icon: FileCheck,
  },
  {
    title: "Quantified ROI Projection",
    description: "Exact calculation of weekly manual hours freed and estimated revenue capacity unlocked.",
    icon: TrendingUp,
  },
];

export default function AuditPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="pt-24 pb-12 md:pt-32">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] font-mono text-[#0b0e0d]/50">
            <Link href="/" className="hover:text-[#0b0e0d] transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#0b0e0d] font-medium">Free Automation Audit</span>
          </nav>
        </div>

        {/* Audit Hero */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 md:mb-20">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ea580c]/20 bg-[#fff7ed] px-3.5 py-1 text-[12px] font-mono uppercase tracking-wider text-[#ea580c]">
              <Sparkles className="h-3.5 w-3.5" />
              Operational Review
            </div>
            <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-[#0b0e0d] sm:text-5xl md:text-6xl md:leading-[1.1]">
              30 minutes to discover what your business can automate.
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-[#0b0e0d]/70">
              Stop wondering if AI automation is worth the investment. In a focused 30-minute session, we examine your core operational workflows and give you an actionable roadmap — completely free, with no obligation.
            </p>
          </Reveal>
        </section>

        {/* What You Receive Cards */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
          <Reveal>
            <div className="mb-8">
              <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-[#ea580c]">
                The Deliverables
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-[#0b0e0d]">
                What you receive from the session
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {auditDeliverables.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={0.1 * i}>
                  <div className="rounded-2xl border border-[#0b0e0d]/10 bg-white p-6 shadow-2xs">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#fff7ed] text-[#ea580c] mb-4">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-[#0b0e0d]">{item.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-[#0b0e0d]/70">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Embedded Interactive Audit Intake Form */}
        <div className="border-t border-[#0b0e0d]/10 bg-[#fafaf9]">
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
