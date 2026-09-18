import { problems } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { Stagger, StaggerItem } from "./reveal";

/** SECTION 3 — The business problem. Concise, human, business-oriented. */
export function Problem() {
  return (
    <section aria-labelledby="problem-h" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHeading
              eyebrow="The problem"
              title={<span id="problem-h">Growth breaks manual work.</span>}
              copy="It works with five people and a spreadsheet. Then enquiries grow, tools multiply — and the cracks show."
            />
          </div>
          <Stagger className="divide-y divide-[#0b0b0c]/10 border-y border-[#0b0b0c]/10">
            {problems.map((p, i) => (
              <StaggerItem key={p.title}>
                <div className="group flex gap-5 py-6">
                  <span className="font-mono text-[13px] font-bold text-[#a84300]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[19px] font-semibold tracking-tight text-[#0b0b0c]">{p.title}</h3>
                    <p className="mt-1 max-w-[52ch] text-[14.5px] leading-relaxed text-[#5f6368]">“{p.text}”</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
