import { ArrowRight } from "lucide-react";
import { engagementSteps } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

export function ProcessTimeline() {
  return (
    <section id="how-it-works" aria-labelledby="how-h" className="scroll-mt-20 border-t border-[#0b0e0d]/8 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="How we work"
          title={<span id="how-h">From audit to operation, without disruption.</span>}
          copy="A fixed sequence, so you always know what happens next — and what it costs before we build."
        />
        <ol className="relative mt-12 space-y-0">
          <span className="absolute bottom-6 left-[27px] top-6 w-px bg-[#0b0e0d]/10 md:left-[31px]" aria-hidden />
          {engagementSteps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.04}>
              <li className="relative flex gap-5 pb-8 last:pb-0 md:gap-7">
                <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-[#0b0e0d]/10 bg-[#fafaf9] font-mono text-[13px] font-bold md:h-16 md:w-16">
                  {s.n}
                  <span className="absolute -right-px -top-px h-2.5 w-2.5 rounded-full bg-[#0e7c5b]" aria-hidden />
                </span>
                <div className="flex-1 rounded-[1.4rem] border border-[#0b0e0d]/10 bg-[#fafaf9] p-5 transition-colors hover:border-[#0e7c5b]/30 hover:bg-white md:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-[17px] font-semibold tracking-tight">{s.title}</h3>
                    <span className="rounded-full bg-[#0b0e0d]/[0.06] px-2.5 py-1 font-mono text-[11.5px] text-[#0b0e0d]/60">{s.time}</span>
                  </div>
                  <p className="mt-1.5 max-w-[70ch] text-[14.5px] leading-relaxed text-[#0b0e0d]/60">{s.text}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={0.1}>
          <a href="#contact" className="btn-press group mt-10 inline-flex items-center gap-2 rounded-full bg-[#0b0e0d] py-2.5 pl-6 pr-2.5 text-[15px] font-medium text-white hover:bg-[#1a201e]">
            Find What You Can Automate
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
