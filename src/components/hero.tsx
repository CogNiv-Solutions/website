"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { transformations } from "@/lib/data";
import { Reveal } from "./reveal";
import { Eyebrow } from "./section-heading";
import { AuditCta, DemosCta } from "./ui";

/** Bridge-inspired Manual → Cogniv → Automated visual. */
function BridgeVisual() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setActive((a) => (a + 1) % transformations.length), 2200);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <div
      className="relative overflow-hidden rounded-[1.75rem] border border-[#0b0b0c]/10 bg-white p-5 card-shadow md:p-6"
      role="img"
      aria-label="Diagram: manual work on the left becomes an automated workflow on the right through Cogniv"
    >
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5f6368]">
          Manual <ArrowRight className="mb-0.5 inline h-3 w-3 text-[#ff6a00]" aria-hidden /> Automated
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0b0b0c]/[0.05] px-2.5 py-1 font-mono text-[11px] text-[#0b0b0c]/60">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff6a00] animate-pulse-dot" aria-hidden />
          live flow
        </span>
      </div>

      <div className="mt-4 space-y-2.5">
        {transformations.map((t, i) => {
          const on = i === active;
          return (
            <div
              key={t.id}
              className={cn(
                "grid grid-cols-[1fr_auto_1fr] items-stretch gap-2 rounded-2xl border p-2.5 transition-all duration-500",
                on ? "border-[#ff6a00]/45 bg-[#fff1e6]" : "border-[#0b0b0c]/10 bg-[#f4f5f5]"
              )}
            >
              <div className={cn("rounded-xl px-3 py-2.5 transition-colors", on ? "bg-white" : "bg-white/70")}>
                <p className="text-[12.5px] font-semibold leading-snug text-[#0b0b0c]">{t.manual}</p>
                <p className="mt-0.5 hidden text-[11.5px] leading-snug text-[#5f6368] sm:block">{t.manualDetail}</p>
              </div>
              <div className="flex flex-col items-center justify-center px-0.5" aria-hidden>
                <svg width="26" height="30" viewBox="0 0 26 30" fill="none" className="overflow-visible">
                  <path
                    d="M2 26C8 26 9 6 13 6C17 6 18 26 24 26"
                    stroke={on ? "#FF6A00" : "#0B0B0C"}
                    strokeOpacity={on ? 1 : 0.22}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={on && !reduce ? "4 4" : undefined}
                    className={on && !reduce ? "animate-flow-dash" : undefined}
                  />
                </svg>
                <span className={cn("mt-1 h-1.5 w-1.5 rounded-full transition-colors", on ? "bg-[#ff6a00]" : "bg-[#0b0b0c]/20")} />
              </div>
              <div className={cn("rounded-xl px-3 py-2.5 transition-colors", on ? "bg-[#0b0b0c] text-white" : "bg-white/70")}>
                <p className={cn("text-[12.5px] font-semibold leading-snug", on ? "text-white" : "text-[#0b0b0c]")}>{t.auto}</p>
                <p className={cn("mt-0.5 hidden text-[11.5px] leading-snug sm:block", on ? "text-white/65" : "text-[#5f6368]")}>{t.autoDetail}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-1.5" aria-hidden>
        {transformations.map((t, i) => (
          <motion.span
            key={t.id}
            className={cn("h-1.5 rounded-full transition-all duration-500", i === active ? "w-8 bg-[#ff6a00]" : "w-3 bg-[#0b0b0c]/15")}
            layout
          />
        ))}
        <p className="ml-auto font-mono text-[11px] text-[#5f6368]">via Cogniv</p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[68px]">
      <div className="texture-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-10 md:px-8 md:pt-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:pb-24">
        <div>
          <Reveal>
            <Eyebrow>Business automation company</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display-tight mt-5 text-[2.75rem] font-semibold text-[#0b0b0c] md:text-6xl lg:text-[4.35rem]">
              Turn repetitive work into{" "}
              <span className="relative inline-block">
                automated systems.
                <svg viewBox="0 0 320 12" fill="none" className="absolute -bottom-1 left-0 w-full" aria-hidden preserveAspectRatio="none">
                  <path d="M2 9C60 9 90 3 160 3C230 3 260 9 318 9" stroke="#FF6A00" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[54ch] text-base leading-relaxed text-[#5f6368] md:text-lg">
              We automate the work your team repeats every day — from WhatsApp enquiries and follow-ups to data entry and reporting.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <AuditCta />
              <DemosCta />
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <dl className="mt-8 flex flex-wrap gap-x-7 gap-y-2 border-t border-[#0b0b0c]/10 pt-5 text-[13px] text-[#5f6368]">
              {[
                ["Built around", "your current tools"],
                ["Start with", "one workflow"],
                ["You own", "the system"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline gap-1.5">
                  <dt className="font-medium text-[#0b0b0c]/50">{k}</dt>
                  <dd className="font-semibold text-[#0b0b0c]">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <Reveal delay={0.18} y={32}>
          <BridgeVisual />
          <p className="mt-3 text-center font-mono text-[12px] text-[#5f6368]">
            Manual steps in <span className="text-[#0b0b0c]">—</span> one connected system out.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
