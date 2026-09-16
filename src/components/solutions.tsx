import { ArrowUpRight } from "lucide-react";
import { solutions } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { Stagger, StaggerItem } from "./reveal";

export function Solutions() {
  return (
    <section id="solutions" aria-labelledby="solutions-h" className="scroll-mt-20 border-t border-[#0b0e0d]/8 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Solutions"
            title={<span id="solutions-h">Automation built around real work.</span>}
            copy="Six capabilities, combined to fit your operation. No unnecessary software — only what removes work or prevents loss."
          />
          <a href="#contact" className="btn-press inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#0b0e0d]/15 px-5 py-3 text-[14px] font-medium hover:border-[#0b0e0d]/35">
            Discuss your workflow <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <Stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => (
            <StaggerItem key={s.id}>
              <article className="group flex h-full flex-col rounded-[1.4rem] border border-[#0b0e0d]/10 bg-[#fafaf9] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#0b0e0d]/20 hover:bg-white hover:card-shadow md:p-7">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#0b0e0d] text-white transition-colors duration-300 group-hover:bg-[#2563eb]">
                  <s.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-5 text-[18px] font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-1.5 text-[14.5px] font-medium text-[#0b0e0d]/75">{s.short}</p>
                <p className="mt-2.5 text-[14px] leading-relaxed text-[#0b0e0d]/60">{s.detail}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${s.title} includes`}>
                  {s.points.map((p) => (
                    <li key={p} className="rounded-full bg-[#0b0e0d]/[0.05] px-2.5 py-1 text-[12px] font-medium text-[#0b0e0d]/65">
                      {p}
                    </li>
                  ))}
                </ul>
                <a href="#demo" className="mt-5 inline-flex items-center gap-1 text-[14px] font-semibold text-[#2563eb]">
                  <span className="underline-offset-4 group-hover:underline">See it in the demo</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </a>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
