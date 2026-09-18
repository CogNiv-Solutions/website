import { tools } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

/** SECTION 9 — Existing tools. Compatibility, not a logo wall. */
export function ToolsStrip() {
  return (
    <section aria-labelledby="tools-h" className="bg-[#f4f5f5]">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="Compatibility"
            title={<span id="tools-h">We work with the tools your team already uses.</span>}
            copy="You don't need to replace your existing systems to start automating."
          />
          <Reveal delay={0.1}>
            <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.25rem] border border-[#0b0b0c]/10 bg-[#0b0b0c]/10 sm:grid-cols-4">
              {tools.map((t) => (
                <li key={t.name} className="bg-[#f4f5f5] px-4 py-5 text-center transition-colors hover:bg-white">
                  <p className="text-[14.5px] font-semibold tracking-tight text-[#0b0b0c]">{t.name}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-[#5f6368]">{t.note}</p>
                </li>
              ))}
            </ul>
            <p className="mt-3 font-mono text-[12px] text-[#5f6368]">
              + your CRM, ERP, or database — connected where it helps.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
