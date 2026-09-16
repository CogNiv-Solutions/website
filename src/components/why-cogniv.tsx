import { Target, Puzzle, Sparkles, BarChart3 } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Stagger, StaggerItem } from "./reveal";

const points = [
  {
    icon: Target,
    tag: "01 — Workflow First",
    title: "Problem First",
    text: "We identify the workflow before recommending technology. If a simple rule or standard tool fixes it, we implement that.",
  },
  {
    icon: Puzzle,
    tag: "02 — Non-Disruptive",
    title: "Built Around Your Business",
    text: "We work with the tools and processes your team already uses — WhatsApp, sheets, CRMs, email — rather than forcing you to switch.",
  },
  {
    icon: Sparkles,
    tag: "03 — Practical Tech",
    title: "AI Where It Helps",
    text: "We use AI where it provides real business value rather than forcing complex AI into every routine workflow.",
  },
  {
    icon: BarChart3,
    tag: "04 — Clear ROI",
    title: "Measurable Outcomes",
    text: "We focus on measurable improvements such as hours saved, faster response time, and reduced manual copy-paste errors.",
  },
];

export function WhyCogniv() {
  return (
    <section id="why-cogniv" aria-labelledby="why-h" className="scroll-mt-20 border-t border-[#0b0e0d]/8">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="Why Cogniv"
          title={<span id="why-h">We start with the work, not the technology.</span>}
          copy="Cogniv acts as your automation partner. We eliminate repetitive friction without unnecessary tech jargon or forced complexity."
        />

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p) => (
            <StaggerItem key={p.title} className="h-full">
              <article className="flex h-full flex-col justify-between rounded-[1.4rem] border border-[#0b0e0d]/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#2563eb]/40 hover:card-shadow">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#eff6ff] text-[#2563eb]">
                      <p.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#0b0e0d]/40">
                      {p.tag}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[17px] font-semibold tracking-tight text-[#0b0e0d]">{p.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[#0b0e0d]/65">{p.text}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
