"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import {
  ArrowRight,
  MessageCircle,
  Users,
  FileStack,
  Workflow,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Play,
  Database,
  ArrowUpRight,
  Bot,
  Layers,
  Cpu,
  ShieldCheck,
} from "lucide-react";
import { cn, getWhatsAppUrl } from "@/lib/utils";

const engines = [
  {
    id: "whatsapp",
    number: "01",
    tag: "CONVERSATIONAL COMMERCE",
    title: "WhatsApp Business AI & Customer Intelligence",
    short: "Turn inbound customer chats into structured revenue around the clock.",
    description:
      "Most businesses miss leads and delay quotes when messages arrive after hours. We build production-ready WhatsApp bots connected directly to your catalog and inventory, enabling instant responses, quote generation, and seamless handoff to your human sales reps.",
    flow: ["Customer Message", "AI Intent Parsing", "Quotation / Triage", "CRM Entry", "Human Handoff"],
    capabilities: [
      "24/7 instant replies with natural conversational intelligence",
      "Automated quotation drafts from your product catalog",
      "Order intake and delivery dispatch updates",
      "Smart sentiment analysis and VIP customer routing",
      "Strict compliance with official Meta WhatsApp Cloud API",
    ],
    demoLink: "/demo?workflow=whatsapp",
    icon: MessageCircle,
    color: "from-emerald-500/10 to-teal-500/10",
  },
  {
    id: "lead-crm",
    number: "02",
    tag: "GROWTH PIPELINES",
    title: "AI Lead Qualification & CRM Pipeline Automation",
    short: "Stop losing leads to spreadsheet lag. Instant qualification, scoring, and follow-ups.",
    description:
      "When leads sit unattended in spreadsheets, conversion rates drop by 80%. Our automated pipeline captures enquiries from Meta Ads, Google, website forms, and WhatsApp, validates budget and requirements in seconds, creates deals in your CRM, and alerts your sales team immediately.",
    flow: ["Inbound Lead", "AI Qualification", "Budget Scoring", "CRM Deal Created", "Rep Notification"],
    capabilities: [
      "Instant enquiry capture across web forms, ads, and messaging",
      "Automated lead scoring based on your specific qualification rubric",
      "Zero-latency deal synchronization into Zoho, HubSpot, or Sheets",
      "Automated multi-channel follow-up reminders that prevent lead coldness",
      "Conversion tracking and funnel analytics delivered daily",
    ],
    demoLink: "/demo?workflow=lead-crm",
    icon: Users,
    color: "from-blue-500/10 to-indigo-500/10",
  },
  {
    id: "documents",
    number: "03",
    tag: "DATA EXTRACTION",
    title: "Document & Invoice OCR Data Pipelines",
    short: "Extract complex data from physical bills, POs, and invoices directly into Tally or ERP.",
    description:
      "Eliminate repetitive manual data entry. Our vision-based document processing pipeline reads messy scanned receipts, multi-page PDFs, and vendor purchase orders, validates tax totals, and posts clean structured records into your accounting database without typos.",
    flow: ["Document / PO Upload", "Vision OCR Extraction", "GST & Math Validation", "Tally / ERP Sync"],
    capabilities: [
      "99.4% accuracy across multi-currency and multi-line invoices",
      "Automatic GSTIN verification and arithmetic tax reconciliation",
      "Direct XML/API integration into Tally ERP 9 / Prime and Excel",
      "Zero manual typing for purchase vouchers, delivery challans, and bills",
      "Human-in-the-loop exception reviewer for flagged anomalies",
    ],
    demoLink: "/demo?workflow=documents",
    icon: FileStack,
    color: "from-amber-500/10 to-orange-500/10",
  },
  {
    id: "internal-ops",
    number: "04",
    tag: "OPERATIONAL SCALE",
    title: "Internal Operations & Cross-Tool Workflow Sync",
    short: "Unify task dispatch, status updates, and daily summaries across your entire team.",
    description:
      "Connect your fragmented tools into an autonomous operational backbone. Automatically assign incoming work to the right specialists, collect job card checklists from shop-floor teams, and deliver scheduled performance summaries to management without chasing anyone.",
    flow: ["Task Trigger", "Automated Assignment", "Progress Tracking", "Milestone Alert", "Executive Summary"],
    capabilities: [
      "Automated task creation and assignment based on team workload",
      "Cross-platform data synchronization (Sheets ↔ Slack ↔ CRM ↔ ERP)",
      "Proactive escalation alerts when tasks exceed target SLA thresholds",
      "Scheduled daily/weekly executive briefings sent straight to WhatsApp",
      "Audit logging of all workflow transitions for accountability",
    ],
    demoLink: "/demo?workflow=internal-ops",
    icon: Workflow,
    color: "from-purple-500/10 to-pink-500/10",
  },
];

const ecosystemTools = [
  "WhatsApp Cloud API",
  "Tally ERP 9 & Prime",
  "Zoho CRM & Books",
  "HubSpot CRM",
  "Google Sheets & Workspace",
  "Microsoft Excel & 365",
  "PostgreSQL & Cloud DBs",
  "OpenAI & Claude 3.5",
  "Make (Integromat)",
  "n8n Workflows",
  "Slack & Teams",
  "Razorpay & Stripe",
];

export default function AiSolutionsPage() {
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
            <span className="text-[#0b0e0d] font-medium">AI Solutions</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20 md:mb-28">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2563eb]/20 bg-[#eff6ff] px-3.5 py-1 text-[12px] font-mono uppercase tracking-wider text-[#2563eb]">
              <Bot className="h-3.5 w-3.5" />
              Intelligent Automation Architecture
            </div>
            <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-[#0b0e0d] sm:text-5xl md:text-6xl md:leading-[1.1]">
              Bespoke AI systems built for how your business actually operates.
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-[#0b0e0d]/70">
              We engineer custom automated engines that integrate directly with WhatsApp, your CRM, Tally ERP, and spreadsheets — eliminating manual hours and scaling your capacity without increasing headcount.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/audit"
                className="btn-press group inline-flex items-center gap-2 rounded-full bg-[#0b0e0d] px-6 py-3.5 text-[14.5px] font-semibold text-white hover:bg-[#1a201e]"
              >
                Book Free Automation Audit
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/demo"
                className="btn-press inline-flex items-center gap-2 rounded-full border border-[#0b0e0d]/15 bg-white px-6 py-3.5 text-[14.5px] font-medium text-[#0b0e0d] hover:bg-slate-50"
              >
                <Play className="h-3.5 w-3.5 fill-[#2563eb] text-[#2563eb]" />
                Test Live Interactive Demos
              </Link>
            </div>
          </Reveal>
        </section>

        {/* The 4 Core Engines */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24 md:mb-32">
          <div className="space-y-16 md:space-y-24">
            {engines.map((engine, idx) => {
              const Icon = engine.icon;
              const isEven = idx % 2 === 1;

              return (
                <div
                  key={engine.id}
                  id={engine.id}
                  className="rounded-3xl border border-[#0b0e0d]/10 bg-white p-6 sm:p-10 md:p-14 shadow-sm transition-all duration-300 hover:border-[#2563eb]/30"
                >
                  <div className={cn("grid gap-10 lg:grid-cols-12 items-center", isEven && "lg:grid-flow-dense")}>
                    {/* Left Column (Content) */}
                    <div className={cn("lg:col-span-7", isEven && "lg:col-start-6")}>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-semibold text-[#2563eb]">
                          {engine.number}
                        </span>
                        <span className="inline-block h-1 w-1 rounded-full bg-[#0b0e0d]/25" />
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[#0b0e0d]/50">
                          {engine.tag}
                        </span>
                      </div>

                      <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#0b0e0d]">
                        {engine.title}
                      </h2>

                      <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-[#0b0e0d]/75">
                        {engine.description}
                      </p>

                      {/* Capabilities Checklist */}
                      <div className="mt-6 space-y-2.5">
                        {engine.capabilities.map((cap) => (
                          <div key={cap} className="flex items-start gap-2.5">
                            <CheckCircle2 className="h-4 w-4 mt-1 shrink-0 text-[#2563eb]" />
                            <span className="text-[14px] text-[#0b0e0d]/80">{cap}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Link
                          href={engine.demoLink}
                          className="btn-press inline-flex items-center gap-2 rounded-full bg-[#eff6ff] px-5 py-2.5 text-[13.5px] font-semibold text-[#2563eb] hover:bg-[#dbeafe]"
                        >
                          <Play className="h-3 w-3 fill-current" />
                          Launch Simulation
                        </Link>
                        <Link
                          href="/audit"
                          className="btn-press inline-flex items-center gap-2 rounded-full border border-[#0b0e0d]/15 px-5 py-2.5 text-[13.5px] font-medium text-[#0b0e0d] hover:bg-slate-50"
                        >
                          Request Custom Scope
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* Right Column (Visual Workflow Box) */}
                    <div className={cn("lg:col-span-5", isEven && "lg:col-start-1")}>
                      <div className="rounded-2xl border border-[#0b0e0d]/10 bg-[#fafaf9] p-6 sm:p-8">
                        <div className="flex items-center justify-between border-b border-[#0b0e0d]/10 pb-4 mb-5">
                          <div className="flex items-center gap-2.5">
                            <div className="grid h-9 w-9 place-items-center rounded-lg bg-white border border-[#0b0e0d]/10 text-[#2563eb]">
                              <Icon className="h-4 w-4" />
                            </div>
                            <span className="font-mono text-xs font-semibold text-[#0b0e0d]">
                              EXECUTION PIPELINE
                            </span>
                          </div>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-mono font-medium text-emerald-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Live System
                          </span>
                        </div>

                        {/* Step items */}
                        <div className="space-y-3">
                          {engine.flow.map((step, sIdx) => (
                            <div key={step} className="flex items-center gap-3">
                              <span className="font-mono text-[11px] text-[#0b0e0d]/40 w-5">
                                0{sIdx + 1}
                              </span>
                              <div className="flex-1 rounded-xl border border-[#0b0e0d]/10 bg-white px-3.5 py-2 text-[13px] font-medium text-[#0b0e0d] shadow-2xs">
                                {step}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Integration Ecosystem Section */}
        <section className="border-y border-[#0b0e0d]/10 bg-white py-16 md:py-24 mb-20 md:mb-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <Reveal>
              <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-[#2563eb]">
                Seamless Compatibility
              </span>
              <h2 className="mt-3 text-2xl sm:text-4xl font-semibold tracking-tight text-[#0b0e0d]">
                Integrates with your existing tech stack
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-[15px] sm:text-[16px] text-[#0b0e0d]/70">
                Zero forced software migrations. We build automated bridges connecting your current software, databases, and communication channels.
              </p>
            </Reveal>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
              {ecosystemTools.map((tool) => (
                <div
                  key={tool}
                  className="rounded-full border border-[#0b0e0d]/10 bg-[#fafaf9] px-4 py-2 text-[13.5px] font-medium text-[#0b0e0d] shadow-2xs transition-transform hover:scale-105"
                >
                  {tool}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-3xl bg-[#0b0e0d] p-8 sm:p-12 md:p-16 text-white text-center">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                Get Started
              </span>
              <h2 className="mt-3 text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
                Evaluate your business automation potential.
              </h2>
              <p className="mt-4 max-w-xl mx-auto text-base sm:text-lg text-white/70">
                Claim a 30-minute operational audit. We map your repetitive workflows and provide an estimated ROI calculation tailored to your company.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/audit"
                  className="btn-press group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[#0b0e0d] hover:bg-blue-50"
                >
                  Book Free Automation Audit
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/demo"
                  className="btn-press inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-[15px] font-medium text-white hover:bg-white/10"
                >
                  Explore Interactive Demos
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
