import { Crosshair, Puzzle, Cpu, Gauge, Package } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Stagger, StaggerItem } from "./reveal";

const points = [
  {
    icon: Crosshair,
    title: "Problem-first",
    text: "We start with the workflow, not the technology. If a checklist fixes it, we say so.",
  },
  {
    icon: Puzzle,
    title: "Built around your business",
    text: "No bloated suites. The system fits how your team already works.",
  },
  {
    icon: Cpu,
    title: "AI where it helps",
    text: "AI for judgement-like steps; plain automation where rules are enough — and cheaper.",
  },
  {
    icon: Gauge,
    title: "Measurable outcomes",
    text: "Response time, hours saved, errors avoided — tracked in plain numbers.",
  },
  {
    icon: Package,
    title: "Product mindset",
    text: "Reusable systems with logs and owners — not temporary scripts tied to one person.",
  },
];

export function WhyCogniv() {
  return (
    <section aria-labelledby="why-h" className="border-t border-[#0b0e0d]/8">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="Why Cogniv"
          title={<span id="why-h">Operators first. Technologists second.</span>}
          copy="Anyone can demo AI. Fewer teams will sit with your staff, learn the messy reality, and stay until the numbers move."
        />
        <Stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {points.map((p, i) => (
            <StaggerItem key={p.title} className={i === 0 ? "lg:col-span-2" : undefined}>
              <article className="flex h-full gap-4 rounded-[1.4rem] border border-[#0b0e0d]/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:card-shadow">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#e6f4ee] text-[#0a5c44]">
                  <p.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <span>
                  <h3 className="text-[16.5px] font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-[#0b0e0d]/60">{p.text}</p>
                </span>
              </article>
            </StaggerItem>
          ))}
          <StaggerItem>
            <div className="flex h-full flex-col justify-between rounded-[1.4rem] bg-[#0b0e0d] p-6 text-white">
              <p className="text-[17px] font-medium leading-snug">“These people understand business operations, not just AI.”</p>
              <p className="mt-4 font-mono text-[12px] text-white/50">— what we want every audit to leave behind</p>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
