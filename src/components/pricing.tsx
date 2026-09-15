"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, ChevronDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { Reveal, Stagger, StaggerItem } from "./reveal";

type Mode = "impl" | "managed";

type Plan = {
  id: string;
  name: string;
  label: string;
  blurb: string;
  implPrice: string;
  managedPrice: string;
  implFeatures: string[];
  managedFeatures: string[];
  cta: string;
  featured?: boolean;
  dark?: boolean;
};

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter Automation",
    label: "For simple repetitive tasks",
    blurb: "Perfect for businesses taking their first step toward automation.",
    implPrice: "₹2,999+",
    managedPrice: "₹999/mo+",
    implFeatures: [
      "Simple workflow automation",
      "Form → spreadsheet automation",
      "Email automation",
      "Notifications",
      "Basic integrations",
      "Basic setup",
      "Basic support",
    ],
    managedFeatures: [
      "Workflow monitoring",
      "Basic support",
      "Bug fixes",
      "Minor updates",
    ],
    cta: "Get Started",
  },
  {
    id: "business",
    name: "Business Automation",
    label: "MOST POPULAR",
    blurb: "For businesses ready to automate multiple workflows.",
    implPrice: "₹7,999+",
    managedPrice: "₹1,999/mo+",
    implFeatures: [
      "Lead capture automation",
      "WhatsApp workflow automation",
      "CRM automation",
      "Automated follow-ups",
      "Data automation",
      "Document processing",
      "Basic AI integration",
      "Business dashboard",
    ],
    managedFeatures: [
      "Monitoring",
      "Support",
      "Workflow maintenance",
      "Minor improvements",
      "Usage monitoring",
    ],
    cta: "Book Automation Audit",
    featured: true,
  },
  {
    id: "ai",
    name: "AI Automation",
    label: "For AI-powered workflows",
    blurb: "Add intelligent automation to customer-facing and internal processes.",
    implPrice: "₹14,999+",
    managedPrice: "₹3,999/mo+",
    implFeatures: [
      "AI-powered workflows",
      "AI assistants / agents",
      "AI lead qualification",
      "AI customer support",
      "AI document processing",
      "WhatsApp AI workflows",
      "Custom AI API integrations",
      "Analytics",
    ],
    managedFeatures: [
      "AI workflow monitoring",
      "AI / API usage monitoring",
      "Maintenance",
      "Optimization",
      "Support",
    ],
    cta: "Discuss Your Automation",
  },
  {
    id: "custom",
    name: "Custom Automation",
    label: "For complex business requirements",
    blurb: "Custom automation and software built around your operations.",
    implPrice: "₹24,999+",
    managedPrice: "₹6,999/mo+",
    implFeatures: [
      "Custom workflows",
      "Multiple integrations",
      "Custom business software",
      "Advanced AI systems",
      "Internal dashboards",
      "Multi-department workflows",
      "Scalable architecture",
      "Ongoing support",
    ],
    managedFeatures: [
      "Priority support",
      "System monitoring",
      "Maintenance",
      "Workflow optimization",
      "Custom improvements",
    ],
    cta: "Talk to Our Team",
    dark: true,
  },
];

const compareRows: { label: string; values: string[] }[] = [
  { label: "Simple workflow", values: ["yes", "yes", "yes", "yes"] },
  { label: "Multi-step workflow", values: ["no", "yes", "yes", "yes"] },
  { label: "WhatsApp automation", values: ["no", "yes", "yes", "yes"] },
  { label: "CRM integration", values: ["no", "yes", "yes", "yes"] },
  { label: "AI integration", values: ["no", "Basic", "yes", "yes"] },
  { label: "AI agents", values: ["no", "no", "yes", "yes"] },
  { label: "Custom software", values: ["no", "no", "no", "yes"] },
  { label: "Dashboard", values: ["no", "yes", "yes", "yes"] },
  { label: "Monitoring", values: ["no", "no", "yes", "yes"] },
  { label: "Support", values: ["Basic", "Standard", "Priority", "Custom"] },
  { label: "Custom integrations", values: ["no", "Basic", "yes", "yes"] },
];

function CompareCell({ value, dark = false }: { value: string; dark?: boolean }) {
  if (value === "yes")
    return (
      <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-[#e6f4ee]">
        <Check className="h-3.5 w-3.5 text-[#0a5c44]" aria-label="Included" />
      </span>
    );
  if (value === "no") return <Minus className={cn("mx-auto h-4 w-4", dark ? "text-white/30" : "text-[#0b0e0d]/25")} aria-label="Not included" />;
  return (
    <span className={cn("text-[13px] font-semibold", dark ? "text-emerald-300" : "text-[#0a5c44]")}>{value}</span>
  );
}

function PlanCard({ plan, mode }: { plan: Plan; mode: Mode }) {
  const features = mode === "impl" ? plan.implFeatures : plan.managedFeatures;
  const price = mode === "impl" ? plan.implPrice : plan.managedPrice;
  const dark = plan.dark;
  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-[1.4rem] border p-6 transition-all duration-300 hover:-translate-y-1 md:p-7",
        dark && "border-white/10 bg-[#0b0e0d] text-white card-shadow-dark hover:border-white/25",
        !dark && !plan.featured && "border-[#0b0e0d]/10 bg-white hover:border-[#0b0e0d]/25 hover:card-shadow",
        !dark && plan.id === "ai" && "border-[#0e7c5b]/25 bg-[#f2faf6] hover:border-[#0e7c5b]/45 hover:card-shadow",
        plan.featured &&
          "border-[#0e7c5b]/45 bg-white card-shadow hover:border-[#0e7c5b]/70 lg:scale-[1.03]"
      )}
    >
      {plan.featured && (
        <p className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#0e7c5b] px-3.5 py-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse-dot" aria-hidden />
          Most popular
        </p>
      )}
      <h3 className="mt-1 text-[18px] font-semibold tracking-tight">{plan.name}</h3>
      <p className={cn("mt-1 font-mono text-[11px] uppercase tracking-[0.16em]", dark ? "text-emerald-300" : "text-[#0e7c5b]")}>
        {plan.label}
      </p>
      <p className={cn("mt-2.5 text-[14px] leading-relaxed", dark ? "text-white/60" : "text-[#0b0e0d]/60")}>{plan.blurb}</p>
      <p className="mt-5 flex items-baseline gap-2">
        <span className="font-mono text-[2rem] font-bold leading-none tracking-tight">{price}</span>
      </p>
      <p className={cn("mt-1.5 font-mono text-[11.5px]", dark ? "text-white/45" : "text-[#0b0e0d]/45")}>
        {mode === "impl" ? "Starting price · one-time setup" : "Starting price · per month, managed"}
      </p>
      <ul className={cn("mt-5 space-y-2.5 border-t pt-5", dark ? "border-white/10" : "border-[#0b0e0d]/8")}>
        {features.map((f) => (
          <li key={f} className={cn("flex items-start gap-2.5 text-[14px]", dark ? "text-white/80" : "text-[#0b0e0d]/75")}>
            <span className={cn("mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full", dark ? "bg-emerald-400/15" : "bg-[#e6f4ee]")}>
              <Check className={cn("h-3 w-3", dark ? "text-emerald-300" : "text-[#0a5c44]")} aria-hidden />
            </span>
            {f}
          </li>
        ))}
      </ul>
      <a
        href="#contact"
        className={cn(
          "btn-press group mt-6 inline-flex items-center justify-center gap-2 rounded-full py-3 pl-6 pr-3 text-[14.5px] font-semibold",
          dark || plan.featured
            ? "bg-[#0e7c5b] text-white hover:bg-[#0a5c44]"
            : "border border-[#0b0e0d]/15 text-[#0b0e0d] hover:border-[#0b0e0d] hover:bg-[#0b0e0d] hover:text-white"
        )}
      >
        {plan.cta}
        <span
          className={cn(
            "grid h-8 w-8 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5",
            dark || plan.featured ? "bg-white/20" : "bg-[#0b0e0d]/8 group-hover:bg-white/20"
          )}
        >
          <ArrowRight className="h-4 w-4" aria-hidden />
        </span>
      </a>
    </article>
  );
}

function Calculator() {
  const [employees, setEmployees] = useState(12);
  const [hours, setHours] = useState(15);
  const [volume, setVolume] = useState(1);
  const [workflows, setWorkflows] = useState(2);
  const [needAI, setNeedAI] = useState(false);
  const [needWA, setNeedWA] = useState(true);
  const [needDash, setNeedDash] = useState(false);

  const result = useMemo(() => {
    let score = 0;
    score += workflows >= 6 ? 3 : workflows >= 4 ? 2 : workflows >= 2 ? 1 : 0;
    if (needAI) score += 2;
    if (needWA) score += 1;
    if (needDash) score += 1;
    score += volume;
    score += hours >= 30 ? 2 : hours >= 15 ? 1 : 0;
    if (employees >= 50) score += 1;
    if (score <= 3) return { level: "Simple", range: "₹2,999+", hint: "Likely one focused workflow." };
    if (score <= 6) return { level: "Moderate", range: "₹7,999+", hint: "A few connected workflows, possibly WhatsApp + CRM." };
    if (score <= 9) return { level: "Advanced", range: "₹14,999+", hint: "AI-assisted flows across tools." };
    return { level: "Custom", range: "₹24,999+", hint: "Multi-system work that needs scoping." };
  }, [employees, hours, volume, workflows, needAI, needWA, needDash]);

  const volumes = ["Under 100 / month", "100 – 500 / month", "500 – 2,000 / month", "2,000+ / month"];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[1.4rem] border border-[#0b0e0d]/10 bg-white p-6 md:p-7">
        <label className="block">
          <span className="flex items-baseline justify-between text-[14px] font-medium">
            Employees involved <span className="font-mono font-semibold">{employees}</span>
          </span>
          <input type="range" min={1} max={200} value={employees} onChange={(e) => setEmployees(Number(e.target.value))} className="mt-2.5 w-full accent-[#0e7c5b]" aria-label="Number of employees involved" />
        </label>
        <label className="mt-5 block">
          <span className="flex items-baseline justify-between text-[14px] font-medium">
            Repetitive hours per week <span className="font-mono font-semibold">{hours}h</span>
          </span>
          <input type="range" min={1} max={80} value={hours} onChange={(e) => setHours(Number(e.target.value))} className="mt-2.5 w-full accent-[#0e7c5b]" aria-label="Hours spent on repetitive work per week" />
        </label>
        <label className="mt-5 block">
          <span className="flex items-baseline justify-between text-[14px] font-medium">
            Monthly workflow volume <span className="font-mono text-[13px] font-semibold">{volumes[volume]}</span>
          </span>
          <input type="range" min={0} max={3} value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="mt-2.5 w-full accent-[#0e7c5b]" aria-label="Approximate monthly workflow volume" />
        </label>
        <label className="mt-5 block">
          <span className="flex items-baseline justify-between text-[14px] font-medium">
            Number of workflows <span className="font-mono font-semibold">{workflows}</span>
          </span>
          <input type="range" min={1} max={10} value={workflows} onChange={(e) => setWorkflows(Number(e.target.value))} className="mt-2.5 w-full accent-[#0e7c5b]" aria-label="Number of workflows" />
        </label>
        <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
          {(
            [
              ["Need AI?", needAI, setNeedAI],
              ["Need WhatsApp?", needWA, setNeedWA],
              ["Need dashboard?", needDash, setNeedDash],
            ] as const
          ).map(([label, val, set]) => (
            <button
              key={label}
              type="button"
              role="switch"
              aria-checked={val}
              onClick={() => set(!val)}
              className={cn(
                "btn-press rounded-2xl border px-4 py-3 text-left text-[13.5px] font-medium transition-colors",
                val ? "border-[#0e7c5b]/50 bg-[#f2faf6] text-[#0a5c44]" : "border-[#0b0e0d]/12 bg-white text-[#0b0e0d]/60 hover:border-[#0b0e0d]/30"
              )}
            >
              <span className="block font-mono text-[11px] uppercase tracking-[0.14em] opacity-70">{label}</span>
              <span className="mt-0.5 block text-[15px] font-semibold">{val ? "Yes" : "No"}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col rounded-[1.4rem] bg-[#0b0e0d] p-6 text-white card-shadow-dark md:p-8" role="status" aria-live="polite">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">Indicative starting range</p>
        <p className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[13.5px] font-semibold text-emerald-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse-dot" aria-hidden />
          {result.level} complexity
        </p>
        <p className="mt-4 font-mono text-5xl font-bold tracking-tight">{result.range}</p>
        <p className="mt-3 text-[14.5px] leading-relaxed text-white/65">{result.hint}</p>
        <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-[12.5px] leading-relaxed text-white/55">
          Indicative estimate only — not a quote. Your final quote will be provided after a workflow audit.
        </p>
        <a
          href="#contact"
          className="btn-press group mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white py-2.5 pl-6 pr-2.5 text-[15px] font-semibold text-[#0b0e0d] hover:bg-emerald-100"
        >
          Get My Automation Estimate
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0b0e0d] text-white transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </a>
      </div>
    </div>
  );
}

export function Pricing() {
  const [mode, setMode] = useState<Mode>("impl");
  const [compareOpen, setCompareOpen] = useState(false);
  const [openPlan, setOpenPlan] = useState<string | null>(null);
  const reduce = useReducedMotion();

  return (
    <section id="pricing" aria-labelledby="pricing-h" className="scroll-mt-20 border-t border-[#0b0e0d]/8">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="Launch pricing for our first businesses"
          title={<span id="pricing-h">Start small. Automate big.</span>}
          copy="Whether you need to automate one repetitive task or transform an entire workflow, Cogniv builds solutions around the way your business actually works."
        />

        <Reveal delay={0.08}>
          <div className="mt-8 flex justify-start">
            <div role="tablist" aria-label="Pricing type" className="inline-flex rounded-full border border-[#0b0e0d]/10 bg-white p-1 card-shadow">
              {(
                [
                  ["impl", "Implementation"],
                  ["managed", "Managed Automation"],
                ] as const
              ).map(([m, label]) => (
                <button
                  key={m}
                  role="tab"
                  aria-selected={mode === m}
                  onClick={() => setMode(m)}
                  className={cn(
                    "relative rounded-full px-5 py-2.5 text-[14px] font-medium transition-colors md:px-6",
                    mode === m ? "text-white" : "text-[#0b0e0d]/60 hover:text-[#0b0e0d]"
                  )}
                >
                  {mode === m && (
                    <motion.span layoutId="pricing-pill" className="absolute inset-0 rounded-full bg-[#0b0e0d]" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                  )}
                  <span className="relative">{label}</span>
                </button>
              ))}
            </div>
          </div>
          <p className="mt-3 font-mono text-[12px] text-[#0b0e0d]/50">
            {mode === "impl" ? "One-time setup pricing — you own the system." : "Monthly pricing — we run and maintain it for you."}
          </p>
        </Reveal>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            >
              <Stagger className="grid gap-4 pt-4 md:grid-cols-2 xl:grid-cols-4">
                {plans.map((p) => (
                  <StaggerItem key={p.id} className="h-full">
                    <PlanCard plan={p} mode={mode} />
                  </StaggerItem>
                ))}
              </Stagger>
            </motion.div>
          </AnimatePresence>
        </div>

        <Reveal delay={0.05}>
          <div className="mt-6 space-y-2 font-mono text-[12px] leading-relaxed text-[#0b0e0d]/50">
            <p>Starting prices are indicative. Final pricing depends on workflow complexity, integrations, number of users, infrastructure and AI / API usage.</p>
            <p>Third-party services such as WhatsApp, AI APIs, hosting or other external platforms may have separate usage charges.</p>
          </div>
        </Reveal>

        <div className="mt-14">
          <SectionHeading
            eyebrow="Maintenance"
            title="Keep your automation running."
            copy="Choose ongoing maintenance and optimization after implementation — or switch to Managed Automation above and we handle it end-to-end."
          />
          <Stagger className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {plans.map((p) => (
              <StaggerItem key={p.id} className="h-full">
                <div className="flex h-full flex-col rounded-[1.4rem] border border-[#0b0e0d]/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#0e7c5b]/35 hover:card-shadow">
                  <p className="text-[14.5px] font-semibold">{p.name.replace(" Automation", "")}</p>
                  <p className="mt-1.5 font-mono text-xl font-bold">{p.managedPrice}</p>
                  <ul className="mt-3 space-y-1.5">
                    {p.managedFeatures.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[13px] text-[#0b0e0d]/65">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0e7c5b]" aria-hidden /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-4 font-mono text-[12px] text-[#0b0e0d]/50">Monthly pricing may vary depending on infrastructure, usage and system complexity.</p>
        </div>

        <Reveal delay={0.05}>
          <div className="relative mt-14 overflow-hidden rounded-[1.75rem] bg-[#0b0e0d] px-6 py-10 text-white card-shadow-dark md:px-12 md:py-12">
            <div className="texture-dots pointer-events-none absolute inset-0 opacity-20" aria-hidden />
            <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse-dot" aria-hidden />
                  Cogniv launch offer
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-4xl">Special pricing for our first 10 businesses.</h3>
                <p className="mt-3 max-w-[56ch] text-[14.5px] leading-relaxed text-white/65 md:text-[15.5px]">
                  We’re building our first customer success stories. Early businesses get access to Cogniv at special launch pricing.
                </p>
              </div>
              <a
                href="#contact"
                className="btn-press group inline-flex shrink-0 items-center gap-2 rounded-full bg-white py-2.5 pl-6 pr-2.5 text-[15px] font-semibold text-[#0b0e0d] hover:bg-emerald-100"
              >
                Claim Launch Pricing
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0b0e0d] text-white transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-14">
          <button
            type="button"
            onClick={() => setCompareOpen((v) => !v)}
            aria-expanded={compareOpen}
            className="btn-press flex w-full items-center justify-between rounded-[1.4rem] border border-[#0b0e0d]/10 bg-white px-6 py-5 text-left hover:border-[#0b0e0d]/25 md:px-8"
          >
            <span>
              <span className="block text-[17px] font-semibold tracking-tight">Compare plans in detail</span>
              <span className="mt-0.5 block text-[13.5px] text-[#0b0e0d]/55">Every capability, side by side.</span>
            </span>
            <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0b0e0d]/5 transition-transform duration-300", compareOpen && "rotate-180")}>
              <ChevronDown className="h-5 w-5" aria-hidden />
            </span>
          </button>

          <AnimatePresence initial={false}>
            {compareOpen && (
              <motion.div
                initial={reduce ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={reduce ? undefined : { opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                className="overflow-hidden"
              >
                <div className="hidden pt-4 lg:block">
                  <div className="overflow-hidden rounded-[1.4rem] border border-[#0b0e0d]/10 bg-white card-shadow">
                    <table className="w-full text-left text-[14px]">
                      <thead>
                        <tr className="border-b border-[#0b0e0d]/10">
                          <th scope="col" className="px-6 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[#0b0e0d]/45">Capability</th>
                          {plans.map((p) => (
                            <th key={p.id} scope="col" className="px-4 py-4 text-center">
                              <span className="block text-[14.5px] font-semibold">{p.name}</span>
                              <span className="mt-0.5 block font-mono text-[12px] font-medium text-[#0e7c5b]">{p.implPrice}</span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#0b0e0d]/8">
                        {compareRows.map((r) => (
                          <tr key={r.label} className="transition-colors hover:bg-[#fafaf9]">
                            <th scope="row" className="px-6 py-3 font-medium text-[#0b0e0d]/80">{r.label}</th>
                            {r.values.map((v, i) => (
                              <td key={i} className="px-4 py-3 text-center"><CompareCell value={v} /></td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-2.5 pt-4 lg:hidden">
                  {plans.map((p) => {
                    const open = openPlan === p.id;
                    return (
                      <div key={p.id} className="overflow-hidden rounded-[1.4rem] border border-[#0b0e0d]/10 bg-white">
                        <button
                          type="button"
                          onClick={() => setOpenPlan(open ? null : p.id)}
                          aria-expanded={open}
                          className="flex w-full items-center justify-between px-5 py-4 text-left"
                        >
                          <span>
                            <span className="block text-[15px] font-semibold">{p.name}</span>
                            <span className="font-mono text-[12.5px] text-[#0e7c5b]">{p.implPrice} · from</span>
                          </span>
                          <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0b0e0d]/5 transition-transform duration-300", open && "rotate-180")}>
                            <ChevronDown className="h-4.5 w-4.5" aria-hidden />
                          </span>
                        </button>
                        {open && (
                          <ul className="divide-y divide-[#0b0e0d]/8 border-t border-[#0b0e0d]/8 px-5">
                            {compareRows.map((r) => (
                              <li key={r.label} className="flex items-center justify-between py-2.5 text-[13.5px]">
                                <span className="text-[#0b0e0d]/70">{r.label}</span>
                                <CompareCell value={r.values[plans.indexOf(p)]} />
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-14">
          <SectionHeading
            eyebrow="Estimator"
            title="Not sure what you need?"
            copy="Tell us what you're trying to automate and get an indicative starting range. Your final quote will be provided after a workflow audit."
          />
          <Reveal delay={0.08} className="mt-8">
            <Calculator />
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className="mx-auto mt-14 max-w-3xl rounded-[1.75rem] border border-[#0b0e0d]/10 bg-white p-8 text-center card-shadow md:p-12">
            <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">Still not sure where to start?</h3>
            <p className="mx-auto mt-3 max-w-[52ch] text-[14.5px] leading-relaxed text-[#0b0e0d]/60 md:text-[15.5px]">
              Tell us what your team does manually every day. We’ll identify opportunities where automation could save time and reduce repetitive work.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#contact"
                className="btn-press group inline-flex items-center justify-center gap-2 rounded-full bg-[#0b0e0d] py-2.5 pl-6 pr-2.5 text-[15px] font-medium text-white hover:bg-[#1a201e]"
              >
                Get a Free Automation Audit
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </a>
              <a
                href="#demo"
                className="btn-press inline-flex items-center justify-center rounded-full border border-[#0b0e0d]/15 px-7 py-3.5 text-[15px] font-medium hover:border-[#0b0e0d]/35"
              >
                See Live Demo
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-14 overflow-hidden rounded-[1.75rem] bg-[#0b0e0d] px-6 py-12 text-center text-white card-shadow-dark md:py-16">
            <h3 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
              Your business has work that shouldn’t be manual.
            </h3>
            <p className="mt-3 text-lg text-white/65">Let’s find it.</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#contact"
                className="btn-press group inline-flex items-center justify-center gap-2 rounded-full bg-white py-2.5 pl-6 pr-2.5 text-[15px] font-semibold text-[#0b0e0d] hover:bg-emerald-100"
              >
                Book a Free Automation Audit
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0b0e0d] text-white transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </a>
              <a
                href="#demo"
                className="btn-press inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-[15px] font-medium text-white hover:border-white/45"
              >
                View Demo
              </a>
            </div>
            <p className="mt-5 font-mono text-[11.5px] text-white/40">Affordable to start. Powerful enough to scale.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
