import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { industries } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { Stagger, StaggerItem } from "./reveal";

/** SECTION 7 — Who we help. Use-case led, not thin pages. */
export function Industries() {
  return (
    <section id="industries" aria-labelledby="ind-h" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Who we help"
            title={<span id="ind-h">Recognise your own business here.</span>}
            copy="Six industries, one pattern: work worth automating hides in everyday routines."
          />
          <Link
            href="/industries"
            className="btn-press inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#0b0b0c]/20 bg-white px-5 py-3 text-[14px] font-medium hover:border-[#0b0b0c]/45"
          >
            All industries <ArrowRight className="h-4 w-4 text-[#ff6a00]" aria-hidden />
          </Link>
        </div>

        <Stagger className="mt-12 grid gap-px overflow-hidden rounded-[1.25rem] border border-[#0b0b0c]/10 bg-[#0b0b0c]/10 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <StaggerItem key={ind.id} className="h-full">
              <Link
                href={`/industries/${ind.id}`}
                className="group flex h-full flex-col bg-white p-6 transition-colors hover:bg-[#0b0b0c] md:p-7"
              >
                <h3 className="text-[17px] font-semibold tracking-tight text-[#0b0b0c] group-hover:text-white">{ind.name}</h3>
                <p className="mt-2 font-mono text-[12.5px] leading-relaxed text-[#a84300] group-hover:text-[#ff8a3d]">
                  {ind.example}
                </p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[#5f6368] group-hover:text-white/60">{ind.blurb}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13.5px] font-semibold text-[#0b0b0c] group-hover:text-white">
                  See the workflow
                  <ArrowRight className="h-4 w-4 text-[#ff6a00] transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
