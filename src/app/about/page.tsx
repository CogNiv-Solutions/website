"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  TrendingUp,
  Cpu,
  Clock,
  Sparkles,
  Layers,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { getWhatsAppUrl } from "@/lib/utils";

const pillars = [
  {
    number: "01",
    title: "Workflow-First, Tool-Agnostic",
    desc: "We never force you to abandon the tools your team already knows. Whether your operation runs on WhatsApp, Excel, Tally ERP, or Zoho, we engineer intelligent pipelines around your existing day-to-day reality.",
    icon: Layers,
  },
  {
    number: "02",
    title: "Relentless Focus on Measurable ROI",
    desc: "We don't build tech for the sake of hype. If an automated system doesn't save at least 3x to 5x its cost in manual labor hours or direct recovered revenue within the first 60 days, we won't recommend building it.",
    icon: TrendingUp,
  },
  {
    number: "03",
    title: "Engineered for Frontline Teams",
    desc: "Complex dashboards gather dust. Our systems operate quietly in the background — sending instant alerts, drafting invoices, and handling leads where your team already works, requiring zero technical expertise.",
    icon: Cpu,
  },
  {
    number: "04",
    title: "Strict Data Privacy & Isolation",
    desc: "Your business intelligence, customer conversations, and accounting data belong exclusively to you. Every deployment implements encrypted transit, role-based controls, and zero public AI model training.",
    icon: ShieldCheck,
  },
];

const comparisons = [
  {
    aspect: "Implementation Speed",
    saas: "Weeks of complex onboarding & per-user seat setup",
    agencies: "3–6 months of custom coding & scope creep",
    cogniv: "Working prototype in 14 days with your real data",
  },
  {
    aspect: "Integration Fit",
    saas: "Forces your team to adapt to rigid software templates",
    agencies: "Requires expensive custom API adapters and plugins",
    cogniv: "Bespoke integration around WhatsApp, Tally, Sheets & ERP",
  },
  {
    aspect: "Pricing Model",
    saas: "Expensive monthly recurring seats that scale with headcount",
    agencies: "High hourly consulting rates with uncertain budgets",
    cogniv: "Predictable milestone investment tied strictly to business ROI",
  },
  {
    aspect: "Team Adoption",
    saas: "Steep learning curve, low employee adoption",
    agencies: "Requires specialized in-house IT staff to maintain",
    cogniv: "Zero learning curve — runs inside existing communication channels",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="pt-24 pb-20 md:pt-32 md:pb-28">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] font-mono text-[#0b0e0d]/50">
            <Link href="/" className="hover:text-[#0b0e0d] transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#0b0e0d] font-medium">About Us</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20 md:mb-28">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ea580c]/20 bg-[#fff7ed] px-3.5 py-1 text-[12px] font-mono uppercase tracking-wider text-[#ea580c]">
              <Sparkles className="h-3.5 w-3.5" />
              About Cogniv Solutions
            </div>
            <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-[#0b0e0d] sm:text-5xl md:text-6xl md:leading-[1.1]">
              We engineer intelligent systems around real business operations, not bloated software.
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-[#0b0e0d]/70">
              Most technology firms try to sell you off-the-shelf subscriptions that force your team to change how they work. At Cogniv Solutions, we do the exact opposite: we map how your company actually operates and automate the repetitive friction slowing you down.
            </p>
          </Reveal>
        </section>

        {/* Mission & Story Section */}
        <section className="border-y border-[#0b0e0d]/10 bg-white py-16 md:py-24 mb-20 md:mb-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <Reveal>
                <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-[#ea580c]">
                  Our Purpose
                </span>
                <h2 className="mt-3 text-2xl sm:text-4xl font-semibold tracking-tight text-[#0b0e0d]">
                  Business, Automated.
                </h2>
                <div className="mt-6 space-y-4 text-[15px] sm:text-[16px] leading-relaxed text-[#0b0e0d]/75">
                  <p>
                    Every day, growing businesses lose dozens of productive hours to operational friction: enquiries sitting unattended on WhatsApp over weekends, leads copied manually from forms into spreadsheets, invoices re-typed into Tally line-by-line, and managers chasing team updates over phone calls.
                  </p>
                  <p>
                    These manual tasks do not generate revenue — they drain energy, create costly errors, and bottleneck growth.
                  </p>
                  <p>
                    Cogniv Solutions was founded with a singular conviction: <strong>software should adapt to human operations, not the other way around.</strong> We bridge artificial intelligence, conversational messaging, and existing enterprise software to liberate your team for higher-value work.
                  </p>
                </div>
              </Reveal>

              {/* Quick Stat Cards */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <Reveal delay={0.1}>
                  <div className="rounded-2xl border border-[#0b0e0d]/10 bg-[#fafaf9] p-6 text-center">
                    <p className="font-mono text-3xl sm:text-4xl font-bold text-[#0b0e0d]">20-30+</p>
                    <p className="mt-2 text-[13px] sm:text-[14px] font-medium text-[#0b0e0d]/65">
                      Manual Hours Reclaimed Weekly per Team
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="rounded-2xl border border-[#0b0e0d]/10 bg-[#fafaf9] p-6 text-center">
                    <p className="font-mono text-3xl sm:text-4xl font-bold text-[#ea580c]">&lt; 2 min</p>
                    <p className="mt-2 text-[13px] sm:text-[14px] font-medium text-[#0b0e0d]/65">
                      Average Inbound Lead Response Speed
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={0.3}>
                  <div className="rounded-2xl border border-[#0b0e0d]/10 bg-[#fafaf9] p-6 text-center">
                    <p className="font-mono text-3xl sm:text-4xl font-bold text-[#0b0e0d]">99.4%</p>
                    <p className="mt-2 text-[13px] sm:text-[14px] font-medium text-[#0b0e0d]/65">
                      Accuracy in Document & Invoice Data Extraction
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={0.4}>
                  <div className="rounded-2xl border border-[#0b0e0d]/10 bg-[#fff7ed] p-6 text-center">
                    <p className="font-mono text-3xl sm:text-4xl font-bold text-[#ea580c]">14 Days</p>
                    <p className="mt-2 text-[13px] sm:text-[14px] font-medium text-[#0b0e0d]/65">
                      Rapid Working Prototype with Real Data
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Core Pillars */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20 md:mb-28">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-[#ea580c]">
                Engineering Philosophy
              </span>
              <h2 className="mt-3 text-2xl sm:text-4xl font-semibold tracking-tight text-[#0b0e0d]">
                How We Approach Automation
              </h2>
              <p className="mt-4 text-[15px] sm:text-[16px] text-[#0b0e0d]/70">
                Four steadfast principles govern every system we architect and deploy.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.number} delay={0.1 * idx}>
                  <div className="flex h-full flex-col justify-between rounded-2xl border border-[#0b0e0d]/10 bg-white p-7 transition-all duration-300 hover:border-[#ea580c]/40 hover:shadow-lg hover:shadow-[#ea580c]/5">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-mono text-sm font-semibold text-[#ea580c]">
                          {p.number}
                        </span>
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#fff7ed] text-[#ea580c]">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-[#0b0e0d]">{p.title}</h3>
                      <p className="mt-3 text-[14px] leading-relaxed text-[#0b0e0d]/70">{p.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Comparison Matrix */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20 md:mb-28">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-[#ea580c]">
                The Difference
              </span>
              <h2 className="mt-3 text-2xl sm:text-4xl font-semibold tracking-tight text-[#0b0e0d]">
                Why Companies Choose Cogniv Solutions
              </h2>
              <p className="mt-4 text-[15px] sm:text-[16px] text-[#0b0e0d]/70">
                How our bespoke, workflow-first approach compares to traditional alternatives.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="overflow-x-auto rounded-2xl border border-[#0b0e0d]/10 bg-white shadow-sm">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#0b0e0d]/10 bg-[#fafaf9] text-[13px] font-mono uppercase tracking-wider text-[#0b0e0d]/70">
                    <th className="p-4 sm:p-5">Dimension</th>
                    <th className="p-4 sm:p-5">Off-The-Shelf SaaS</th>
                    <th className="p-4 sm:p-5">Generic Dev Agencies</th>
                    <th className="p-4 sm:p-5 bg-[#fff7ed] text-[#ea580c] font-semibold">Cogniv Solutions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0b0e0d]/10">
                  {comparisons.map((row) => (
                    <tr key={row.aspect} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 sm:p-5 font-medium text-[#0b0e0d]">{row.aspect}</td>
                      <td className="p-4 sm:p-5 text-[#0b0e0d]/65">{row.saas}</td>
                      <td className="p-4 sm:p-5 text-[#0b0e0d]/65">{row.agencies}</td>
                      <td className="p-4 sm:p-5 bg-[#fff7ed]/50 font-medium text-[#ea580c]">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-[#ea580c]" />
                          <span>{row.cogniv}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        {/* Direct CTA Banner */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-[#0b0e0d] p-8 sm:p-12 md:p-16 text-white">
              <div className="relative z-10 max-w-2xl">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                  Ready to Start?
                </span>
                <h2 className="mt-3 text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
                  Stop losing hours to repetitive work.
                </h2>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-white/70">
                  Book a free 30-minute automation audit. We’ll analyze your team’s bottlenecks and provide a customized 14-day ROI roadmap — zero sales pitch, no commitment.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Link
                    href="/audit"
                    className="btn-press group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[#0b0e0d] hover:bg-orange-50"
                  >
                    Book Free Automation Audit
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  <a
                    href={getWhatsAppUrl("Hi Cogniv, I'd like to learn more about your automation services.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-[15px] font-medium text-white hover:bg-white/10"
                  >
                    <MessageCircle className="h-4 w-4 text-[#25d366]" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
