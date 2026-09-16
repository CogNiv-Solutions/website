import { ArrowRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

export function About() {
  return (
    <section id="about" aria-labelledby="about-h" className="scroll-mt-20 border-t border-[#0b0e0d]/8 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-[1fr_1fr] lg:items-center">
        <SectionHeading
          eyebrow="About Cogniv"
          title={<span id="about-h">Manual operations → intelligent systems.</span>}
          copy="Cogniv Solutions exists for one shift: helping businesses move from work that depends on memory and effort to systems that run reliably. Product thinking, automation engineering and applied AI — aimed at the operation, not the demo."
        />
        <Reveal delay={0.1}>
          <div className="grid grid-cols-3 divide-x divide-[#0b0e0d]/10 rounded-[1.4rem] border border-[#0b0e0d]/10 bg-[#fafaf9]">
            {[
              ["Product", "software that lasts"],
              ["Automation", "workflows that hold"],
              ["AI", "judgement where needed"],
            ].map(([k, v]) => (
              <div key={k} className="px-5 py-6 text-center md:py-8">
                <p className="text-[16px] font-semibold tracking-tight md:text-lg">{k}</p>
                <p className="mt-1 text-[12.5px] leading-snug text-[#0b0e0d]/55">{v}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[14px] leading-relaxed text-[#0b0e0d]/60">
            We don’t publish client lists, counts or claims we can’t prove. Ask us in the audit — we’ll show you real
            workflows, not logos.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section aria-labelledby="final-h" className="border-t border-[#0b0e0d]/8 bg-[#0b0e0d] text-white">
      <div className="relative mx-auto max-w-7xl overflow-hidden px-4 py-20 md:px-8 md:py-28">
        <div className="texture-dots pointer-events-none absolute inset-0 opacity-20" aria-hidden />
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="font-mono text-[12px] uppercase tracking-[0.24em] text-blue-300">Final question</p>
            <h2 id="final-h" className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              What’s slowing your business down?
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-base leading-relaxed text-white/65 md:text-lg">
              Tell us how your business works. We’ll help identify what can be automated — and what should be left alone.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#contact"
                className="btn-press group inline-flex items-center justify-center gap-2 rounded-full bg-white py-2.5 pl-6 pr-2.5 text-[15px] font-semibold text-[#0b0e0d] hover:bg-blue-100"
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
                Try the Demo
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
