import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { websiteService, websiteAutomationCombo } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

/** Homepage Websites band — visually distinct from automation, same system. */
export function Websites() {
  return (
    <section aria-labelledby="websites-h" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Website development"
              title={<span id="websites-h">{websiteService.summary}</span>}
              copy={websiteService.text}
            />
            <Reveal delay={0.1}>
              <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Website types">
                {websiteService.uses.map((u) => (
                  <li
                    key={u}
                    className="rounded-full border border-[#0b0b0c]/12 bg-[#f4f5f5] px-3 py-1.5 text-[12.5px] font-medium text-[#0b0b0c]/75"
                  >
                    {u}
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex items-baseline gap-2">
                <span className="font-mono text-[1.7rem] font-bold tracking-tight">{websiteService.price}</span>
                <span className="font-mono text-[11.5px] text-[#5f6368]">starting price</span>
              </p>
              <Link
                href="/solutions#website"
                className="btn-press group mt-5 inline-flex items-center gap-2 rounded-full bg-[#0b0b0c] py-2.5 pl-6 pr-2.5 text-[15px] font-medium text-white hover:bg-[#1c1c1e]"
              >
                Discuss Your Website
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ff6a00] text-white transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="flex h-full flex-col rounded-[1.25rem] bg-[#0b0b0c] p-6 text-white md:p-8">
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff8a3d]">
                <span className="h-[2px] w-6 bg-[#ff6a00]" aria-hidden /> {websiteAutomationCombo.title}
              </p>
              <h3 className="section-tight mt-4 text-2xl font-semibold md:text-[1.7rem]">
                {websiteAutomationCombo.summary}
              </h3>
              <p className="mt-3 max-w-[52ch] text-[14.5px] leading-relaxed text-white/60">
                {websiteAutomationCombo.text}
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Website automation includes">
                {["Lead capture", "WhatsApp", "CRM", "Follow-ups", "Forms", "Data handling"].map((u) => (
                  <li
                    key={u}
                    className="rounded-full border border-white/12 px-3 py-1.5 text-[12.5px] font-medium text-white/75"
                  >
                    {u}
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex items-baseline gap-2 border-t border-white/10 pt-5">
                <span className="font-mono text-[1.7rem] font-bold tracking-tight">{websiteAutomationCombo.price}</span>
                <span className="font-mono text-[11.5px] text-white/50">starting price</span>
              </p>
            </div>
          </Reveal>
        </div>
        <p className="mt-6 font-mono text-[12px] leading-relaxed text-[#5f6368]">
          {websiteService.priceNote} {websiteAutomationCombo.priceNote}
        </p>
      </div>
    </section>
  );
}
