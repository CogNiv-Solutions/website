"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, ChevronDown, Minus, Calculator as CalcIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { Reveal, Stagger, StaggerItem } from "./reveal";

type Plan = {
  id: string;
  name: string;
  label: string;
  blurb: string;
  price: string;
  features: string[];
  cta: string;
  featured?: boolean;
  dark?: boolean;
};

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    label: "Simple tasks",
    blurb: "Ideal for businesses taking their first step into automation.",
    price: "₹2,999+",
    features: [
      "Single workflow automation",
      "Form → spreadsheet data sync",
      "Email & notification triggers",
      "Standard tool connections",
    ],
    cta: "Start with Starter",
  },
  {
    id: "business",
    name: "Business",
    label: "Most Popular",
    blurb: "Connect customer communications, CRM and daily operations.",
    price: "₹7,999+",
    features: [
      "Lead capture & qualification",
      "WhatsApp workflow automation",
      "CRM sync & automated follow-ups",
      "Document data extraction",
    ],
    cta: "Book Automation Audit",
    featured: true,
  },
  {
    id: "ai",
    name: "AI",
    label: "Intelligent flows",
    blurb: "AI-assisted workflows for customer responses and document processing.",
    price: "₹14,999+",
    features: [
      "AI conversation triage & handoff",
      "Intelligent document parsing",
      "Custom AI API integrations",
      "Operational performance analytics",
    ],
    cta: "Discuss AI Workflow",
  },
  {
    id: "custom",
    name: "Custom",
    label: "Tailored systems",
    blurb: "Custom architecture and software built around your exact operations.",
    price: "₹24,999+",
    features: [
      "Multi-department workflows",
      "Custom internal dashboards",
      "Deep bespoke integrations",
      "Ongoing monitoring & support",
    ],
    cta: "Talk to Our Team",
    dark: true,
  },
];

const compareRows: { label: string; values: string[] }[] = [
  { label: "Single-tool automation", values: ["yes", "yes", "yes", "yes"] },
  { label: "Multi-step workflow", values: ["no", "yes", "yes", "yes"] },
  { label: "WhatsApp automation", values: ["no", "yes", "yes", "yes"] },
  { label: "CRM synchronization", values: ["no", "yes", "yes", "yes"] },
  { label: "AI document / chat flows", values: ["no", "Basic", "yes", "yes"] },
  { label: "Operational dashboard", values: ["no", "yes", "yes", "yes"] },
  { label: "Custom software / bespoke", values: ["no", "no", "no", "yes"] },
  { label: "Ongoing maintenance option", values: ["Optional", "Optional", "Included", "Dedicated"] },
];

function CompareCell({ value, dark = false }: { value: string; dark?: boolean }) {
  if (value === "yes") {
    return (
      <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-[#fff7ed]">
        <Check className="h-3.5 w-3.5 text-[#c2410c]" aria-label="Included" />
      </span>
    );
  }
  if (value === "no") {
    return <Minus className={cn("mx-auto h-4 w-4", dark ? "text-white/30" : "text-[#0b0e0d]/25")} aria-label="Not included" />;
  }
  return (
    <span className={cn("text-[13px] font-semibold", dark ? "text-orange-300" : "text-[#c2410c]")}>{value}</span>
  );
}

export function Pricing() {
  const [compareOpen, setCompareOpen] = useState(false);
  const reduce = useReducedMotion();

  // ROI Calculator state (compact & non-intrusive)
  const [hours, setHours] = useState(120);
  const [auto, setAuto] = useState(60);
  const [cost, setCost] = useState(350);

  const savedHours = useMemo(() => Math.round((hours * auto) / 100), [hours, auto]);
  const capacityValue = useMemo(() => savedHours * cost, [savedHours, cost]);

  return (
    <section id="pricing" aria-labelledby="pricing-h" className="scroll-mt-20 border-t border-[#0b0e0d]/8">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
        {/* Main Section Header */}
        <SectionHeading
          eyebrow="Pricing & ROI"
          title={<span id="pricing-h">Start small. Automate what matters.</span>}
          copy="Clear tiers for standard workflows, or a custom build for multi-department systems. All implementations begin with a focused workflow audit."
        />

        {/* 4 Pricing Cards */}
        <div className="mt-7">
          <Stagger className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {plans.map((p) => {
              const dark = p.dark;
              return (
                <StaggerItem key={p.id} className="h-full">
                  <article
                    className={cn(
                      "relative flex h-full flex-col justify-between rounded-[1.3rem] border p-5 transition-all duration-300 hover:-translate-y-1 md:p-6",
                      dark && "border-white/10 bg-[#0b0e0d] text-white card-shadow-dark hover:border-white/25",
                      !dark && !p.featured && "border-[#0b0e0d]/10 bg-white hover:border-[#0b0e0d]/25 hover:card-shadow",
                      p.featured && "border-[#ea580c] bg-white card-shadow lg:scale-[1.01]"
                    )}
                  >
                    <div>
                      {p.featured && (
                        <p className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#ea580c] px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse-dot" aria-hidden />
                          Recommended
                        </p>
                      )}
                      <div className="flex items-baseline justify-between">
                        <h3 className="text-[18px] font-semibold tracking-tight">{p.name}</h3>
                        <span className={cn("font-mono text-[11px] uppercase tracking-[0.16em]", dark ? "text-orange-300" : "text-[#ea580c]")}>
                          {p.label}
                        </span>
                      </div>
                      <p className={cn("mt-1.5 text-[13px] leading-relaxed", dark ? "text-white/60" : "text-[#0b0e0d]/60")}>
                        {p.blurb}
                      </p>
                      <div className="mt-4 border-t pt-4 border-current/10">
                        <p className="font-mono text-[2.1rem] font-bold leading-none tracking-tight">{p.price}</p>
                        <p className={cn("mt-1 font-mono text-[10.5px]", dark ? "text-white/45" : "text-[#0b0e0d]/45")}>
                          Starting price · one-time implementation
                        </p>
                      </div>

                      <ul className="mt-4 space-y-2">
                        {p.features.map((f) => (
                          <li key={f} className={cn("flex items-start gap-2.5 text-[13.5px]", dark ? "text-white/80" : "text-[#0b0e0d]/75")}>
                            <span className={cn("mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full", dark ? "bg-orange-400/15 text-orange-300" : "bg-[#fff7ed] text-[#c2410c]")}>
                              <Check className="h-3 w-3" aria-hidden />
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href="#contact"
                      className={cn(
                        "btn-press group mt-7 inline-flex items-center justify-center gap-2 rounded-full py-3 px-5 text-[14px] font-semibold transition-all",
                        p.featured
                          ? "bg-[#ea580c] text-white hover:bg-[#c2410c]"
                          : dark
                          ? "bg-white text-[#0b0e0d] hover:bg-neutral-100"
                          : "border border-[#0b0e0d]/15 text-[#0b0e0d] hover:border-[#0b0e0d] hover:bg-[#0b0e0d] hover:text-white"
                      )}
                    >
                      {p.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </a>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        {/* Collapsible Full Pricing Comparison */}
        <div className="mt-5">
          <button
            type="button"
            onClick={() => setCompareOpen((v) => !v)}
            aria-expanded={compareOpen}
            className="btn-press mx-auto flex items-center gap-2 rounded-full border border-[#0b0e0d]/15 bg-white px-4.5 py-2 text-[13px] font-medium text-[#0b0e0d] hover:border-[#0b0e0d]/35 card-shadow"
          >
            <span>{compareOpen ? "Hide detailed comparison" : "View Full Feature Breakdown"}</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", compareOpen && "rotate-180")} aria-hidden />
          </button>

          <AnimatePresence initial={false}>
            {compareOpen && (
              <motion.div
                initial={reduce ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={reduce ? undefined : { opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                className="pt-5"
              >
                <p className="mb-2 text-right font-mono text-[11px] text-[#0b0e0d]/45 md:hidden">
                  ← Swipe to compare all plans →
                </p>
                <div className="overflow-x-auto rounded-[1.4rem] border border-[#0b0e0d]/10 bg-white card-shadow scrollbar-thin">
                  <table className="w-full min-w-[620px] text-left text-[14px]">
                    <thead>
                      <tr className="border-b border-[#0b0e0d]/10 bg-[#fafaf9]">
                        <th scope="col" className="px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#0b0e0d]/45">Workflow Capability</th>
                        {plans.map((p) => (
                          <th key={p.id} scope="col" className="px-4 py-3.5 text-center">
                            <span className="block text-[13.5px] font-semibold">{p.name}</span>
                            <span className="font-mono text-[11.5px] text-[#ea580c]">{p.price}</span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0b0e0d]/8">
                      {compareRows.map((r) => (
                        <tr key={r.label} className="transition-colors hover:bg-[#fafaf9]">
                          <th scope="row" className="px-6 py-3 font-medium text-[#0b0e0d]/80 text-[13px]">{r.label}</th>
                          {r.values.map((v, i) => (
                            <td key={i} className="px-4 py-3 text-center">
                              <CompareCell value={v} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Compact Integrated ROI Calculator (Page 8-9 in PDF) */}
        <Reveal delay={0.08} className="mt-9">
          <div className="rounded-[1.5rem] border border-[#0b0e0d]/10 bg-white p-5 card-shadow md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#ea580c]">
                  <CalcIcon className="h-3.5 w-3.5" aria-hidden />
                  ROI Calculator
                </span>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#0b0e0d] md:text-2xl">
                  What is repetitive work costing you?
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-[#0b0e0d]/65">
                  Repetitive tasks quietly tie up valuable employee hours every month. Adjust your team’s estimates to see what automation can free up.
                </p>

                {/* Outputs Display */}
                <div className="mt-6 grid grid-cols-2 gap-3" role="status" aria-live="polite">
                  <div className="rounded-2xl bg-[#0b0e0d] p-4 text-white sm:p-5">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/50 sm:text-[11px]">Hours freed</p>
                    <p className="mt-1.5 font-mono text-2xl font-bold sm:text-3xl">{savedHours}<span className="text-sm font-normal text-white/60 sm:text-base">/mo</span></p>
                  </div>
                  <div className="rounded-2xl bg-[#fff7ed] p-4 border border-[#ea580c]/20 sm:p-5">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#c2410c]/70 sm:text-[11px]">Capacity value</p>
                    <p className="mt-1.5 font-mono text-xl font-bold text-[#c2410c] sm:text-2xl md:text-3xl">₹{capacityValue.toLocaleString("en-IN")}</p>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="btn-press group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#ea580c] px-6 py-3.5 text-[14px] font-semibold text-white hover:bg-[#c2410c] sm:w-auto"
                >
                  Verify These Savings in Free Audit
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </a>
              </div>

              {/* Sliders Box */}
              <div className="rounded-2xl border border-[#0b0e0d]/8 bg-[#fafaf9] p-5 md:p-7">
                <label className="block">
                  <span className="flex items-baseline justify-between text-[14px] font-medium text-[#0b0e0d]">
                    Repetitive hours per month
                    <span className="font-mono text-[15px] font-semibold text-[#ea580c]">{hours} hrs</span>
                  </span>
                  <input
                    type="range" min={20} max={600} step={10} value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="mt-2.5 w-full accent-[#ea580c]" aria-label="Monthly repetitive hours"
                  />
                </label>

                <label className="mt-5 block">
                  <span className="flex items-baseline justify-between text-[14px] font-medium text-[#0b0e0d]">
                    Percentage of work that could be automated
                    <span className="font-mono text-[15px] font-semibold text-[#ea580c]">{auto}%</span>
                  </span>
                  <input
                    type="range" min={10} max={90} step={5} value={auto}
                    onChange={(e) => setAuto(Number(e.target.value))}
                    className="mt-2.5 w-full accent-[#ea580c]" aria-label="Share automatable"
                  />
                </label>

                <label className="mt-5 block">
                  <span className="flex items-baseline justify-between text-[14px] font-medium text-[#0b0e0d]">
                    Estimated cost per employee hour
                    <span className="font-mono text-[15px] font-semibold text-[#ea580c]">₹{cost}</span>
                  </span>
                  <input
                    type="range" min={150} max={1500} step={50} value={cost}
                    onChange={(e) => setCost(Number(e.target.value))}
                    className="mt-2.5 w-full accent-[#ea580c]" aria-label="Cost per hour"
                  />
                </label>

                <p className="mt-4 font-mono text-[11px] leading-relaxed text-[#0b0e0d]/45">
                  * Directional estimate. Your 30-minute free audit pinpoints actual bottlenecks, data formats, and accurate ROI.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
