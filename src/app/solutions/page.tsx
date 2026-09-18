import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ToolsStrip } from "@/components/tools";
import { Contact } from "@/components/contact";
import { AuditCta, CtaButton } from "@/components/ui";
import { solutionCategories, websiteService, websiteAutomationCombo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Two connected capabilities: website development starting from ₹2,000–₹3,000, and business automation — capture leads, reduce data entry, automate follow-ups.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="pt-[68px]">
        <PageHeader
          eyebrow="Solutions"
          title="We build websites. We automate workflows."
          copy="Two connected capabilities — combined when your business needs both."
        />

        {/* A — Website development */}
        <section id="website" aria-labelledby="website-h" className="scroll-mt-20 mx-auto max-w-7xl px-4 pt-12 md:px-8">
          <Reveal>
            <div className="grid gap-8 rounded-[1.25rem] border border-[#0b0b0c]/10 bg-white p-6 md:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
              <div>
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a84300]">
                  <span className="h-[2px] w-6 bg-[#ff6a00]" aria-hidden /> A · Website development
                </p>
                <h2 id="website-h" className="section-tight mt-4 text-3xl font-semibold md:text-4xl">
                  {websiteService.summary}
                </h2>
                <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-[#5f6368]">
                  {websiteService.text}
                </p>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Website types">
                  {websiteService.uses.map((u) => (
                    <li
                      key={u}
                      className="rounded-full border border-[#0b0b0c]/12 bg-[#f4f5f5] px-3 py-1.5 text-[12.5px] font-medium text-[#0b0b0c]/75"
                    >
                      {u}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <CtaButton href="#contact">Discuss Your Website</CtaButton>
                </div>
              </div>
              <div className="rounded-[1.25rem] bg-[#f4f5f5] p-6 md:p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5f6368]">Pricing</p>
                <p className="mt-2 font-mono text-[2.2rem] font-bold leading-none tracking-tight">
                  {websiteService.price}
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-[#5f6368]">{websiteService.priceNote}</p>
                <p className="mt-3 text-[14px] leading-relaxed text-[#5f6368]">
                  Final price varies with pages, design complexity, functionality, forms, and integrations.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* B — Business automation */}
        <section aria-labelledby="sol-auto-h" className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
          <SectionHeading
            eyebrow="B · Business automation"
            title={<span id="sol-auto-h">Four kinds of repetitive work.</span>}
            copy="Combined to fit your operation — AI included only where it genuinely helps."
          />
          <div className="mt-10 divide-y divide-[#0b0b0c]/10 border-y border-[#0b0b0c]/10">
            {solutionCategories.map((s) => (
              <div key={s.id} className="grid gap-3 py-7 md:grid-cols-[70px_1fr_1.2fr] md:gap-6">
                <span className="font-mono text-[14px] font-bold text-[#a84300]">{s.index}</span>
                <div>
                  <h3 className="text-[20px] font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-1 text-[14.5px] text-[#5f6368]">{s.summary}</p>
                </div>
                <div>
                  <ul className="flex flex-wrap gap-1.5">
                    {s.items.map((item) => (
                      <li key={item} className="rounded-full border border-[#0b0b0c]/12 bg-white px-3 py-1.5 text-[12.5px] font-medium text-[#0b0b0c]/75">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-[13.5px] font-medium">{s.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Website + Automation combo */}
        <section aria-labelledby="combo-h" className="bg-[#0b0b0c] text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:px-8 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff8a3d]">
                <span className="h-[2px] w-6 bg-[#ff6a00]" aria-hidden /> {websiteAutomationCombo.title}
              </p>
              <h2 id="combo-h" className="section-tight mt-4 text-3xl font-semibold md:text-4xl">
                {websiteAutomationCombo.summary}
              </h2>
              <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-white/60">
                {websiteAutomationCombo.text} Website → business workflow → automation.
              </p>
              <div className="mt-6">
                <AuditCta variant="on-dark" />
              </div>
            </div>
            <Reveal delay={0.1}>
              <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">Starting from</p>
                <p className="mt-2 font-mono text-[2.6rem] font-bold leading-none tracking-tight">
                  {websiteAutomationCombo.price}
                </p>
                <p className="mt-4 text-[14px] leading-relaxed text-white/60">
                  {websiteAutomationCombo.priceNote}
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-white/60">
                  Final pricing depends on the website scope, automation requirements, integrations, and complexity.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="border-t border-[#0b0b0c]/10">
          <ToolsStrip />
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
