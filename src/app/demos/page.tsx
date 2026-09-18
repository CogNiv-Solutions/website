import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { DemoLab } from "@/components/demo-lab";
import { Contact } from "@/components/contact";
import { AuditCta } from "@/components/ui";
import { demos } from "@/lib/data";

export const metadata: Metadata = {
  title: "Demos",
  description:
    "Explore interactive simulations of common business workflows: WhatsApp lead capture, invoice to data, lead to CRM, follow-ups, and operations reporting.",
  alternates: { canonical: "/demos" },
};

export default function DemosPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="pt-[68px]">
        <PageHeader
          eyebrow="Demo Lab"
          title="See the automation before you buy it."
          copy="Interactive simulations of common business workflows — simplified, with sample data. Your system uses your data and rules."
        />

        <section aria-label="Try the simulations" className="mx-auto max-w-7xl px-4 pt-12 md:px-8">
          <DemoLab />
        </section>

        {/* Static, crawlable record of every scenario — visible with or without JS */}
        <section aria-labelledby="all-scenarios-h" className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <SectionHeading
            eyebrow="All scenarios"
            title={<span id="all-scenarios-h">What each simulation shows.</span>}
            copy="Every demo follows the same arc: problem, trigger, automation, result."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {demos.map((d, i) => (
              <article key={d.id} className="rounded-[1.25rem] border border-[#0b0b0c]/10 bg-white p-6 md:p-7">
                <p className="font-mono text-[12px] font-bold text-[#a84300]">{String(i + 1).padStart(2, "0")} · Interactive simulation</p>
                <h2 className="mt-2 text-[19px] font-semibold tracking-tight">{d.title}</h2>
                <p className="mt-0.5 font-mono text-[12px] text-[#5f6368]">{d.context}</p>
                <dl className="mt-4 space-y-0 divide-y divide-[#0b0b0c]/10 border-y border-[#0b0b0c]/10">
                  {(
                    [
                      ["Problem", d.problem],
                      ["Trigger", d.trigger],
                      ["Automation", d.automation],
                      ["Result", d.result],
                    ] as const
                  ).map(([k, v]) => (
                    <div key={k} className="flex gap-4 py-2.5">
                      <dt className="w-24 shrink-0 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#a84300]">{k}</dt>
                      <dd className="text-[13.5px] leading-relaxed text-[#0b0b0c]/80">{v}</dd>
                    </div>
                  ))}
                </dl>
                <ol className="mt-4 space-y-1.5">
                  {d.steps.map((s, j) => (
                    <li key={s.label} className="flex gap-2.5 text-[13.5px]">
                      <span className="font-mono font-bold text-[#0b0b0c]/35">{j + 1}.</span>
                      <span><strong className="font-semibold">{s.title}</strong> <span className="text-[#5f6368]">— {s.detail}</span></span>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <AuditCta />
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
