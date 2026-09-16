import { ArrowRight } from "lucide-react";
import { engagementSteps } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

export function ProcessTimeline() {
  return (
    <section id="how-it-works" aria-labelledby="how-h" className="scroll-mt-20 border-t border-[#0b0e0d]/8 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
        <SectionHeading
          eyebrow="How It Works"
          title={<span id="how-h">From manual process to working system.</span>}
          copy="A transparent 5-step process — from identifying repetitive bottlenecks to integrating and optimizing an automated workflow."
        />
        <ol className="relative mt-7 flex flex-col gap-3 md:gap-3.5">
          <span className="absolute bottom-6 left-[23px] top-6 w-px bg-[#0b0e0d]/10 md:left-[27px]" aria-hidden />
          {engagementSteps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.04}>
              <li className="relative flex items-start gap-3.5 md:gap-5">
                <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[#0b0e0d]/10 bg-[#fafaf9] font-mono text-[12.5px] font-bold md:h-13 md:w-13">
                  {s.n}
                  <span className="absolute -right-px -top-px h-2 w-2 rounded-full bg-[#2563eb]" aria-hidden />
                </span>
                <div className="flex-1 rounded-[1.25rem] border border-[#0b0e0d]/10 bg-[#fafaf9] p-4 transition-all duration-200 hover:border-[#2563eb]/30 hover:bg-white hover:card-shadow md:p-4.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-[16px] font-semibold tracking-tight text-[#0b0e0d]">{s.title}</h3>
                    <span className="rounded-full bg-[#0b0e0d]/[0.06] px-2.5 py-0.5 font-mono text-[11px] font-medium text-[#0b0e0d]/60">{s.time}</span>
                  </div>
                  <p className="mt-1 max-w-[70ch] text-[13.5px] leading-relaxed text-[#0b0e0d]/65">{s.text}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={0.1}>
          <a href="#contact" className="btn-press group mt-6 inline-flex items-center gap-2 rounded-full bg-[#0b0e0d] py-2 pl-5 pr-2 text-[14px] font-medium text-white hover:bg-[#1a201e]">
            Find What You Can Automate
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
