"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, XCircle, Clock, Zap, Building2, Layers, Truck } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

type CaseStudy = {
  id: string;
  icon: typeof Building2;
  industry: string;
  title: string;
  location: string;
  before: {
    process: string[];
    friction: string;
    timeLost: string;
  };
  after: {
    process: string[];
    solution: string;
    timeSaved: string;
  };
  metrics: { label: string; value: string }[];
};

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "wholesale",
    icon: Truck,
    industry: "Wholesale & Distribution",
    title: "WhatsApp Order Ingestion to Tally Invoice Dispatch",
    location: "B2B Hardware & Industrial Goods",
    before: {
      process: [
        "Retailers send orders as WhatsApp voice notes, images, or unstructured text lists.",
        "Sales coordinator spends 3–4 hours daily manually deciphering and copy-pasting items into Excel.",
        "Warehouse inventory checked via back-and-forth phone calls with floor managers.",
        "Accountant re-keys order into Tally to draft tax invoice.",
      ],
      friction: "Frequent typo errors, delayed dispatch times, and misplaced items during peak hours.",
      timeLost: "4+ hours daily delay",
    },
    after: {
      process: [
        "Incoming WhatsApp orders parsed instantly with intelligent document & text extraction.",
        "Automated cross-check against stock quantities in real time.",
        "Draft invoice automatically created in Tally with zero manual re-typing.",
        "Customer instantly receives itemized order confirmation & dispatch ETA on WhatsApp.",
      ],
      solution: "Zero manual re-keying with end-to-end order validation from chat to invoice.",
      timeSaved: "90-second turnaround",
    },
    metrics: [
      { label: "Processing Speed", value: "95% Faster" },
      { label: "Order Entry Errors", value: "0% (Eliminated)" },
      { label: "Hours Reclaimed", value: "22 hrs / week" },
    ],
  },
  {
    id: "realestate",
    icon: Building2,
    industry: "Real Estate & Brokerage",
    title: "Multi-Portal Inquiry Triage & Site-Visit Pipeline",
    location: "Commercial & Residential Advisory",
    before: {
      process: [
        "Leads arrive sporadically across 99acres, MagicBricks, website ads, and direct calls.",
        "Scattered across multiple agent inboxes and spreadsheets with no central owner.",
        "First follow-up call often happens 24 to 48 hours after inquiry.",
        "Over 60% of prospects go cold or book with competing brokers.",
      ],
      friction: "Slow response times causing high ad waste and lost high-value buyer commissions.",
      timeLost: "24-48 hr lead response delay",
    },
    after: {
      process: [
        "Webhooks unify all portal inquiries into one centralized CRM queue in under 3 seconds.",
        "Instant branded WhatsApp brochure & location map dispatched automatically.",
        "Intelligent questionnaire captures buyer budget, timeline, and preferred property tier.",
        "Qualified leads automatically routed to dedicated agents with a scheduled site-visit slot.",
      ],
      solution: "Instant 2-minute qualification and automated calendar scheduling.",
      timeSaved: "< 2 min response time",
    },
    metrics: [
      { label: "Lead Response Time", value: "< 2 minutes" },
      { label: "Site Visits Scheduled", value: "3.8x Increase" },
      { label: "Inquiry Leakage", value: "0 Lost Leads" },
    ],
  },
  {
    id: "manufacturing",
    icon: Layers,
    industry: "Manufacturing & Fabrication",
    title: "Shopfloor Job-Card Tracking & Material Alerts",
    location: "Precision Engineering & Assembly Unit",
    before: {
      process: [
        "Job cards recorded manually on physical paper clipboards on the floor.",
        "Supervisors spend 1.5 hours in evening meetings tallying outputs and scrap rates.",
        "Material shortages discovered only when assembly line reaches a halt.",
        "Leadership lacks real-time visibility into machine downtime.",
      ],
      friction: "Paper logs get lost or smudged; inventory stockouts stop critical production batches.",
      timeLost: "15+ hours spent on daily status calls",
    },
    after: {
      process: [
        "Operators log station milestones with 1-tap tablet or mobile checkpoints.",
        "Raw material levels tracked against batch requirements with automated reorder alerts.",
        "Live operations dashboard displays daily output, machine efficiency, and scrap count.",
        "Automated daily summary report delivered to management on WhatsApp at 7:00 PM.",
      ],
      solution: "Real-time production visibility without chasing plant supervisors.",
      timeSaved: "Zero line halts",
    },
    metrics: [
      { label: "Management Time Saved", value: "18 hrs / week" },
      { label: "Assembly Stoppages", value: "Reduced by 100%" },
      { label: "Data Accuracy", value: "Real-time sync" },
    ],
  },
];

export function CaseStudies() {
  const [activeTab, setActiveTab] = useState<string>("wholesale");
  const currentCase = CASE_STUDIES.find((c) => c.id === activeTab) || CASE_STUDIES[0];

  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-h"
      className="scroll-mt-20 border-t border-[#0b0e0d]/8 bg-[#fafaf9] py-10 md:py-14"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Proven Workflow Transformations"
            title={<span id="case-studies-h">Before & After: How real operations run.</span>}
            copy="Compare manual daily bottlenecks with our automated architectures across key Indian industries."
          />

          {/* Industry Tab Selectors */}
          <div className="flex flex-wrap gap-2">
            {CASE_STUDIES.map((c) => {
              const Icon = c.icon;
              const isActive = activeTab === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveTab(c.id)}
                  className={cn(
                    "btn-press inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] font-medium transition-all duration-200",
                    isActive
                      ? "border-[#0b0e0d] bg-[#0b0e0d] text-white shadow-sm"
                      : "border-[#0b0e0d]/15 bg-white text-[#0b0e0d] hover:border-[#0b0e0d]/30"
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  <span>{c.industry}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Comparison Board */}
        <Reveal delay={0.12} className="mt-7">
          <div className="overflow-hidden rounded-[1.75rem] border border-[#0b0e0d]/10 bg-white card-shadow">
            {/* Context Header */}
            <div className="border-b border-[#0b0e0d]/8 bg-white px-6 py-5 md:px-8">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#ea580c]">
                {currentCase.location}
              </span>
              <h3 className="mt-1 text-xl font-semibold tracking-tight text-[#0b0e0d] md:text-2xl">
                {currentCase.title}
              </h3>
            </div>

            {/* Side-by-side comparison */}
            <div className="grid divide-y divide-[#0b0e0d]/10 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
              {/* The Manual Reality (Before) */}
              <div className="bg-red-50/20 p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-500" aria-hidden />
                    <span className="text-[14px] font-semibold text-red-950 uppercase tracking-wider">
                      The Manual Reality
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-100/50 px-2.5 py-1 text-[11.5px] font-medium text-red-700">
                    <Clock className="h-3.5 w-3.5" aria-hidden /> {currentCase.before.timeLost}
                  </span>
                </div>

                <ul className="mt-6 space-y-3.5">
                  {currentCase.before.process.map((step, idx) => (
                    <li key={step} className="flex items-start gap-3 text-[14px] leading-relaxed text-[#0b0e0d]/75">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-red-100 text-[11px] font-semibold text-red-700">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl border border-red-200/60 bg-white p-3.5 text-[13px] text-red-900/80">
                  ⚠️ <strong>Core Problem:</strong> {currentCase.before.friction}
                </div>
              </div>

              {/* The Cogniv System (After) */}
              <div className="bg-orange-50/25 p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#ea580c]" aria-hidden />
                    <span className="text-[14px] font-semibold text-orange-950 uppercase tracking-wider">
                      The Cogniv Automated Pipeline
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-300 bg-orange-100/60 px-2.5 py-1 text-[11.5px] font-medium text-[#ea580c]">
                    <Zap className="h-3.5 w-3.5" aria-hidden /> {currentCase.after.timeSaved}
                  </span>
                </div>

                <ul className="mt-6 space-y-3.5">
                  {currentCase.after.process.map((step, idx) => (
                    <li key={step} className="flex items-start gap-3 text-[14px] leading-relaxed text-[#0b0e0d]/85">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-orange-100 text-[11px] font-semibold text-[#ea580c]">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl border border-orange-300/60 bg-white p-3.5 text-[13px] text-orange-950 font-medium">
                  ✅ <strong>The Solution:</strong> {currentCase.after.solution}
                </div>
              </div>
            </div>

            {/* Quantitative Metrics Bar */}
            <div className="border-t border-[#0b0e0d]/10 bg-[#0b0e0d] px-6 py-6 text-white md:px-8">
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:items-center">
                {currentCase.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="text-2xl font-bold tracking-tight text-orange-400 md:text-3xl">
                      {m.value}
                    </p>
                    <p className="mt-1 text-[12.5px] text-white/70">{m.label}</p>
                  </div>
                ))}
                <div className="col-span-2 md:col-span-1 md:text-right">
                  <a
                    href="#contact"
                    className="btn-press inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-[13.5px] font-semibold text-[#0b0e0d] hover:bg-orange-100"
                  >
                    Automate This Workflow <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
