import { discoverSteps } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { Stagger, StaggerItem } from "./reveal";

export function WhatWeDo() {
  return (
    <section aria-labelledby="find-h" className="border-t border-[#0b0e0d]/8">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="What Cogniv does"
          title={<span id="find-h">Find the work. Fix the workflow.</span>}
          copy="We don't start with technology. We start with your week — then remove the parts a system should have been doing all along."
        />
        <Stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5 lg:gap-3">
          {discoverSteps.map((s) => (
            <StaggerItem key={s.n}>
              <article className="group flex h-full flex-col rounded-[1.4rem] border border-[#0b0e0d]/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#ea580c]/30 hover:card-shadow">
                <p className="font-mono text-[12px] font-semibold tracking-[0.18em] text-[#ea580c]">{s.n}</p>
                <h3 className="mt-3 text-[17px] font-semibold uppercase tracking-tight text-[#0b0e0d]">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#0b0e0d]/60">{s.text}</p>
                <span className="mt-auto block pt-5" aria-hidden>
                  <span className="block h-1 overflow-hidden rounded-full bg-[#0b0e0d]/8">
                    <span className="block h-full w-0 rounded-full bg-[#ea580c] transition-all duration-500 group-hover:w-full" />
                  </span>
                </span>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
