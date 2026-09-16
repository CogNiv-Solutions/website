import { ArrowRight, PlayCircle } from "lucide-react";
import { Eyebrow } from "./section-heading";
import { Reveal } from "./reveal";
import { WorkflowVisual } from "./workflow-visual";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[68px]">
      <div className="texture-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 pb-10 pt-6 md:px-8 md:pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:pb-14">
        <div>
          <Reveal>
            <Eyebrow>Business, Automated.</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-3.5 text-[2.5rem] font-semibold leading-[1.04] tracking-tight text-[#0b0e0d] md:text-5xl lg:text-[3.8rem]">
              Turn repetitive work into automated systems.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-3.5 max-w-[58ch] text-[15px] leading-relaxed text-[#0b0e0d]/70 md:text-base">
              Cogniv finds the repetitive work slowing your business down and builds automated workflows around the tools you already use.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#contact"
                className="btn-press group inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-2.5 py-2 pl-5 text-[14.5px] font-semibold text-white shadow-sm hover:bg-[#1d4ed8]"
              >
                Book a Free Automation Audit
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </a>
              <a
                href="/demo"
                className="btn-press inline-flex items-center justify-center gap-2 rounded-xl border border-[#0b0e0d]/15 bg-white px-5 py-2.5 text-[14.5px] font-medium text-[#0b0e0d] hover:border-[#0b0e0d]/30"
              >
                <PlayCircle className="h-4 w-4" aria-hidden /> See Interactive Demos
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <dl className="mt-6 grid max-w-lg grid-cols-3 divide-x divide-[#0b0e0d]/10 border-y border-[#0b0e0d]/10">
              {[
                ["01", "workflow at a time"],
                ["5-step", "audit to rollout"],
                ["Real tools", "WhatsApp · CRM · Excel"],
              ].map(([k, v]) => (
                <div key={v} className="px-4 py-2.5 first:pl-0">
                  <dt className="font-mono text-[13px] font-semibold text-[#0b0e0d]">{k}</dt>
                  <dd className="mt-0.5 text-[12px] leading-snug text-[#0b0e0d]/55">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <Reveal delay={0.18} y={32}>
          <WorkflowVisual />
          <p className="mt-3 text-center font-mono text-[12px] text-[#0b0e0d]/45">
            Manual steps on the left become one connected system on the right.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
