import Link from "next/link";
import { ArrowRight, FlaskConical } from "lucide-react";
import { demos } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { Stagger, StaggerItem } from "./reveal";

/** Homepage Demo Lab teaser — the full simulations live on /demos. */
export function DemoPreview() {
  const preview = demos.slice(0, 3);
  return (
    <section aria-labelledby="demo-preview-h" className="bg-[#f4f5f5]">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Demo Lab"
              title={<span id="demo-preview-h">See the automation before you buy it.</span>}
              copy="Explore simplified simulations of the workflows we automate for businesses."
            />
            <Link
              href="/demos"
              className="btn-press group mt-7 inline-flex items-center gap-2 rounded-full bg-[#0b0b0c] py-2.5 pl-6 pr-2.5 text-[15px] font-medium text-white hover:bg-[#1c1c1e]"
            >
              Explore Demo Lab
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ff6a00] text-white transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </Link>
          </div>
          <Stagger className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {preview.map((d, i) => (
              <StaggerItem key={d.id} className="h-full">
                <Link
                  href="/demos"
                  className="group flex h-full flex-col rounded-[1.25rem] border border-[#0b0b0c]/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#ff6a00]/50 hover:card-shadow"
                  aria-label={`${d.title} — try it in the Demo Lab`}
                >
                  <span className="flex items-center justify-between">
                    <FlaskConical className="h-4.5 w-4.5 text-[#a84300]" aria-hidden />
                    <span className="font-mono text-[12px] font-bold text-[#0b0b0c]/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="mt-3 block text-[15px] font-semibold tracking-tight">{d.title}</span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-[#5f6368]">{d.problem}</span>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[13px] font-semibold text-[#0b0b0c]">
                    Try it
                    <ArrowRight className="h-3.5 w-3.5 text-[#ff6a00] transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <p className="mt-6 font-mono text-[12px] text-[#5f6368]">
          Simulations with sample data — 5 scenarios in the full lab.
        </p>
      </div>
    </section>
  );
}
