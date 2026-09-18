import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { solutionCategories } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { Stagger, StaggerItem } from "./reveal";

/** SECTION 4 — What we automate. 4 categories, each Problem → Automation → Outcome. */
export function Solutions() {
  return (
    <section id="solutions" aria-labelledby="solutions-h" className="scroll-mt-20 bg-[#0b0b0c] text-white">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            dark
            eyebrow="What we automate"
            title={<span id="solutions-h">Four kinds of repetitive work.</span>}
            copy="Everything we build falls into four buckets — combined to fit your operation."
          />
          <Link
            href="/solutions"
            className="btn-press inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/20 px-5 py-3 text-[14px] font-medium text-white hover:border-white/50"
          >
            All solutions <ArrowRight className="h-4 w-4 text-[#ff6a00]" aria-hidden />
          </Link>
        </div>

        <Stagger className="mt-12 grid gap-4 md:grid-cols-2">
          {solutionCategories.map((s) => (
            <StaggerItem key={s.id} className="h-full">
              <article className="group flex h-full flex-col rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-[#ff6a00]/50 md:p-8">
                <div className="flex items-baseline justify-between">
                  <p className="font-mono text-[13px] font-bold text-[#ff8a3d]">{s.index}</p>
                  <Link
                    href="/solutions"
                    aria-label={`${s.title} — details`}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/60 transition-all group-hover:border-[#ff6a00] group-hover:text-[#ff8a3d]"
                  >
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
                <h3 className="mt-4 text-[22px] font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-1.5 text-[14.5px] text-white/60">{s.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${s.title} includes`}>
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/12 px-3 py-1.5 text-[12.5px] font-medium text-white/75"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-[13.5px] font-medium text-white/80">
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#ff6a00]" aria-hidden />
                  {s.outcome}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
