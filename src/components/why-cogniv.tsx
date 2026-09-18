import { principles } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { Stagger, StaggerItem } from "./reveal";

/** SECTION 8 — Why Cogniv. Editorial numbered principles (dark). */
export function WhyCogniv() {
  return (
    <section aria-labelledby="why-h" className="bg-[#0b0b0c] text-white">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <SectionHeading
          dark
          eyebrow="Why Cogniv"
          title={<span id="why-h">We don&apos;t automate for the sake of automation.</span>}
        />
        <Stagger className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {principles.map((p) => (
            <StaggerItem key={p.n}>
              <div className="grid gap-2 py-7 md:grid-cols-[80px_1fr_1.4fr] md:items-baseline md:gap-6">
                <span className="font-mono text-[14px] font-bold text-[#ff8a3d]">{p.n}</span>
                <h3 className="text-[21px] font-semibold tracking-tight md:text-2xl">{p.title}</h3>
                <p className="max-w-[56ch] text-[14.5px] leading-relaxed text-white/60">{p.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
