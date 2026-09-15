"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { industries } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

export function Industries() {
  const [id, setId] = useState(industries[1].id);
  const current = industries.find((i) => i.id === id)!;

  return (
    <section id="industries" aria-labelledby="ind-h" className="scroll-mt-20 border-t border-[#0b0e0d]/8">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="Industries"
          title={<span id="ind-h">Start where the manual work hurts most.</span>}
          copy="Every industry repeats different work. Select one to see a typical flow and where automation fits — mapped during an audit, not assumed."
        />

        <Reveal delay={0.08}>
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2 no-scrollbar" role="tablist" aria-label="Industries">
            {industries.map((ind) => (
              <button
                key={ind.id}
                role="tab"
                aria-selected={id === ind.id}
                onClick={() => setId(ind.id)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2.5 text-[14px] font-medium transition-all",
                  id === ind.id
                    ? "border-[#0b0e0d] bg-[#0b0e0d] text-white"
                    : "border-[#0b0e0d]/12 bg-white text-[#0b0e0d]/65 hover:border-[#0b0e0d]/30 hover:text-[#0b0e0d]"
                )}
              >
                {ind.name}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-4 overflow-hidden rounded-[1.75rem] border border-[#0b0e0d]/10 bg-white card-shadow">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                className="grid gap-0 lg:grid-cols-[1fr_1fr_1fr]"
              >
                <div className="border-b border-[#0b0e0d]/8 p-6 md:p-8 lg:border-b-0 lg:border-r">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0b0e0d]/45">Common manual workflow</p>
                  <ol className="mt-4 space-y-2.5">
                    {current.manual.map((m, i) => (
                      <li key={m} className="flex items-start gap-2.5 text-[14.5px] text-[#0b0e0d]/75">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#0b0e0d]/8 font-mono text-[10.5px] font-semibold">{i + 1}</span>
                        {m}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="border-b border-[#0b0e0d]/8 bg-[#0b0e0d] p-6 text-white md:p-8 lg:border-b-0 lg:border-r lg:border-white/10">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">Automation opportunity</p>
                  <ol className="mt-4 space-y-2.5">
                    {current.automate.map((m) => (
                      <li key={m} className="flex items-start gap-2.5 text-[14.5px] text-white/85">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400/20">
                          <Check className="h-3 w-3 text-emerald-300" aria-hidden />
                        </span>
                        {m}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="bg-[#f2faf6] p-6 md:p-8">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0a5c44]/60">Operational benefit</p>
                  <p className="mt-4 text-[17px] font-medium leading-snug text-[#0b0e0d]">{current.benefit}</p>
                  <a href="#contact" className="btn-press mt-6 inline-flex items-center gap-2 rounded-full bg-[#0b0e0d] px-5 py-3 text-[14px] font-medium text-white hover:bg-[#1a201e]">
                    Audit my {current.name.split(" ")[0]} workflow <ArrowRight className="h-4 w-4" aria-hidden />
                  </a>
                  <p className="mt-3 font-mono text-[11.5px] text-[#0b0e0d]/45">Illustrative example — your audit maps your exact flow.</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
