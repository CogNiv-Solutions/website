"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

const before = ["WhatsApp", "Excel", "Employee", "Follow-up", "Another Excel", "Manual report"];
const after = ["Customer", "AI triage", "Workflow", "CRM", "Notification", "Dashboard"];

export function Problem() {
  const [mode, setMode] = useState<"before" | "after">("before");
  const steps = mode === "before" ? before : after;

  return (
    <section aria-labelledby="problem-h" className="border-t border-[#0b0e0d]/8 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="The problem"
          title={<span id="problem-h">Your business may be running on manual work.</span>}
          copy="Leads tracked by memory. Enquiries answered one-by-one. The same data typed into three places. It works — until volume grows, someone is on leave, or a follow-up slips."
        />

        <Reveal delay={0.1} className="mt-10">
          <div className="overflow-hidden rounded-[1.75rem] border border-[#0b0e0d]/10 bg-[#fafaf9] card-shadow">
            <div className="flex flex-col gap-3 border-b border-[#0b0e0d]/8 p-4 sm:flex-row sm:items-center sm:justify-between md:p-5">
              <div role="tablist" aria-label="Before and after comparison" className="inline-flex rounded-full border border-[#0b0e0d]/10 bg-white p-1">
                {(["before", "after"] as const).map((m) => (
                  <button
                    key={m}
                    role="tab"
                    aria-selected={mode === m}
                    onClick={() => setMode(m)}
                    className={cn(
                      "relative rounded-full px-5 py-2 text-[14px] font-medium transition-colors",
                      mode === m ? "text-white" : "text-[#0b0e0d]/60 hover:text-[#0b0e0d]"
                    )}
                  >
                    {mode === m && (
                      <motion.span layoutId="mode-pill" className="absolute inset-0 rounded-full bg-[#0b0e0d]" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                    )}
                    <span className="relative">{m === "before" ? "Before" : "After Cogniv"}</span>
                  </button>
                ))}
              </div>
              <p className="font-mono text-[12px] text-[#0b0e0d]/50">
                {mode === "before" ? "6 handoffs · 0 visibility" : "1 flow · full visibility"}
              </p>
            </div>

            <div className="p-4 md:p-8">
              <ol className="flex flex-col gap-0 md:flex-row md:items-stretch">
                {steps.map((s, i) => (
                  <li key={s} className="flex flex-1 items-stretch gap-3 md:flex-col">
                    <div className="flex flex-col items-center">
                      <motion.span
                        key={mode + s}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.07, duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                        className={cn(
                          "grid h-9 w-9 shrink-0 place-items-center rounded-full font-mono text-[12px] font-semibold",
                          mode === "before" ? "bg-[#0b0e0d]/8 text-[#0b0e0d]/70" : "bg-[#0e7c5b] text-white"
                        )}
                      >
                        {i + 1}
                      </motion.span>
                      {i < steps.length - 1 && (
                        <span className={cn("w-px flex-1 md:h-px md:w-full md:flex-none", mode === "before" ? "bg-[#0b0e0d]/10" : "bg-[#0e7c5b]/30")} aria-hidden />
                      )}
                    </div>
                    <div className="pb-5 md:pb-0 md:pt-3 md:text-center">
                      <p className="text-[14.5px] font-semibold text-[#0b0e0d]">{s}</p>
                      <p className="mt-0.5 hidden text-[12.5px] text-[#0b0e0d]/50 md:block">
                        {mode === "before" ? "manual step" : "connected step"}
                      </p>
                    </div>
                    {i < steps.length - 1 && (
                      <ArrowRight className="ml-auto h-4 w-4 shrink-0 self-center text-[#0b0e0d]/25 md:hidden" aria-hidden />
                    )}
                  </li>
                ))}
              </ol>
              <div
                className={cn(
                  "mt-4 rounded-2xl border px-4 py-3.5 text-[14px] leading-relaxed",
                  mode === "before" ? "border-[#b45309]/25 bg-[#fff8ed] text-[#7c3f0c]" : "border-[#0e7c5b]/25 bg-[#f2faf6] text-[#0a5c44]"
                )}
                role="status"
              >
                {mode === "before"
                  ? "Every arrow is a person remembering to act. Miss one, and the lead, payment or update stalls."
                  : "Every arrow is a system moving work forward — with a person stepping in only where judgement matters."}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {["Leads in chats", "Re-typed data", "Late follow-ups", "Excel operations", "Scattered info"].map((t) => (
              <li key={t} className="rounded-2xl border border-[#0b0e0d]/10 bg-[#fafaf9] px-4 py-3 text-[13.5px] font-medium text-[#0b0e0d]/75">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
