import { ArrowRight } from "lucide-react";
import { transformations } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { Stagger, StaggerItem } from "./reveal";

/** SECTION 2 — Manual → Automated (dark). Keeps the strongest existing concept. */
export function Transform() {
  return (
    <section aria-labelledby="transform-h" className="bg-[#0b0b0c] text-white">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <SectionHeading
          dark
          eyebrow="Manual → automated"
          title={<span id="transform-h">The same work, without the manual middle.</span>}
          copy="Three everyday examples. If any of these look familiar, that is where an audit starts."
        />
        <Stagger className="mt-12 grid gap-px overflow-hidden rounded-[1.25rem] bg-white/10 md:grid-cols-3">
          {transformations.map((t, i) => (
            <StaggerItem key={t.id} className="h-full">
              <article className="flex h-full flex-col bg-[#0b0b0c] p-6 md:p-8">
                <p className="font-mono text-[12px] font-semibold tracking-[0.2em] text-[#ff8a3d]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div className="mt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Today — manual</p>
                  <p className="mt-1.5 text-[16px] font-semibold leading-snug">{t.manual}</p>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-white/55">{t.manualDetail}</p>
                </div>
                <div className="my-5 flex items-center gap-2" aria-hidden>
                  <span className="h-px flex-1 bg-white/12" />
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#ff6a00]">
                    <ArrowRight className="h-3.5 w-3.5 text-white" />
                  </span>
                  <span className="h-px flex-1 bg-white/12" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ff8a3d]">With Cogniv</p>
                  <p className="mt-1.5 text-[16px] font-semibold leading-snug">{t.auto}</p>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-white/55">{t.autoDetail}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
