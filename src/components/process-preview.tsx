import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { processSteps } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { Stagger, StaggerItem, Reveal } from "./reveal";

/** Compact homepage preview — the full journey lives on /how-it-works. */
export function ProcessPreview() {
  return (
    <section aria-labelledby="how-preview-h" className="bg-[#0b0b0c] text-white">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            dark
            eyebrow="How it works"
            title={<span id="how-preview-h">From manual process to working system.</span>}
            copy="We understand your workflow, identify what is worth automating, build it, connect it to your existing tools, and improve it over time."
          />
          <Reveal delay={0.1}>
            <Link
              href="/how-it-works"
              className="btn-press group inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 px-5 py-3 pl-6 pr-2.5 text-[14px] font-medium text-white hover:border-white/50"
            >
              See How It Works
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#ff6a00] text-white transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </Link>
          </Reveal>
        </div>

        <Stagger className="mt-10 grid gap-px overflow-hidden rounded-[1.25rem] bg-white/10 sm:grid-cols-3 lg:grid-cols-5">
          {processSteps.map((s) => (
            <StaggerItem key={s.n} className="h-full">
              <div className="h-full bg-[#0b0b0c] p-5">
                <p className="font-mono text-[12px] font-bold text-[#ff8a3d]">{s.n}</p>
                <h3 className="mt-2 text-[16px] font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-white/55">{s.short}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
