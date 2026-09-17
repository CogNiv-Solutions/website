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
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
        <SectionHeading
          eyebrow="Why Cogniv"
          title={<span id="why-h">We start with the work, not the technology.</span>}
          copy="Cogniv acts as your automation partner. We eliminate repetitive friction without unnecessary tech jargon or forced complexity."
        />

        <Stagger className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p) => (
            <StaggerItem key={p.title} className="h-full">
              <article className="flex h-full flex-col justify-between rounded-[1.3rem] border border-[#0b0e0d]/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#ea580c]/40 hover:card-shadow">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#fff7ed] text-[#ea580c]">
                      <p.icon className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#0b0e0d]/40">
                      {p.tag}
                    </span>
                  </div>
                  <h3 className="mt-3.5 text-[16.5px] font-semibold tracking-tight text-[#0b0e0d]">{p.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[#0b0e0d]/65">{p.text}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Integration Ecosystem & SEO Keywords */}
        <div className="mt-8 rounded-2xl border border-[#0b0e0d]/10 bg-white p-5 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-[#0b0e0d]/8 pb-4">
            <div>
              <h4 className="text-[14.5px] font-semibold text-[#0b0e0d]">Zero Tech Debt — Integrates Directly With Your Existing Stack</h4>
              <p className="text-[12.5px] text-[#0b0e0d]/60">We connect and orchestrate workflows without forcing your team onto unfamiliar software.</p>
            </div>
            <span className="font-mono text-[11px] font-semibold text-[#ea580c] bg-[#ea580c]/10 px-3 py-1 rounded-full shrink-0 w-fit">
              100% Native Compatibility
            </span>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {[
              "WhatsApp Business API",
              "Tally Prime & ERP9",
              "Zoho CRM & Books",
              "HubSpot",
              "LeadSquared",
              "Google Sheets / Excel",
              "Make & n8n Enterprise",
              "Intelligent Invoice OCR",
              "Salesforce",
              "PostgreSQL & Cloud DBs",
              "Custom Python & Webhooks",
            ].map((tool) => (
              <span
                key={tool}
                className="rounded-lg border border-[#0b0e0d]/8 bg-[#fafaf9] px-3 py-1 text-[12px] font-medium text-[#0b0e0d]/75 shadow-2xs transition-colors hover:border-[#ea580c]/40 hover:text-[#ea580c]"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
