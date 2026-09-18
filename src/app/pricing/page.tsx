import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { Stagger, StaggerItem, Reveal } from "@/components/reveal";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { AuditCta, CtaButton } from "@/components/ui";
import { pricingTiers, websiteService, websiteAutomationCombo } from "@/lib/data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Starting prices: website development from ₹3,000–₹5,000, business automation tiers, and website + automation from ₹7,999+. Final pricing scoped after audit.",
  alternates: { canonical: "/pricing" },
};

const websiteScope = [
  "Business websites",
  "Landing pages",
  "Company & service websites",
  "Custom requirements",
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="pt-[68px]">
        <PageHeader
          eyebrow="Pricing"
          title="Two kinds of work. Starting prices."
          copy="Websites, automation, or both combined. Everything below is a starting price — final pricing is scoped after a free audit."
        />

        {/* A — Website development */}
        <section aria-labelledby="price-web-h" className="mx-auto max-w-7xl px-4 pt-12 md:px-8">
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal className="h-full">
              <div className="flex h-full flex-col rounded-[1.25rem] border border-[#0b0b0c]/10 bg-white p-6 md:p-8">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a84300]">
                  <span className="h-[2px] w-6 bg-[#ff6a00]" aria-hidden /> A · Website development
                </p>
                <h2 id="price-web-h" className="mt-3 text-[22px] font-semibold tracking-tight">
                  A website built around your business.
                </h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {websiteScope.map((w) => (
                    <li key={w} className="flex items-start gap-2.5 text-[14px] text-[#0b0b0c]/80">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6a00]" aria-hidden />
                      {w}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <CtaButton href="#contact">Discuss Your Website</CtaButton>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="h-full">
              <div className="flex h-full flex-col rounded-[1.25rem] bg-[#0b0b0c] p-6 text-white md:p-8">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff8a3d]">
                  <span className="h-[2px] w-6 bg-[#ff6a00]" aria-hidden /> {websiteAutomationCombo.title}
                </p>
                <h3 className="mt-3 text-[22px] font-semibold tracking-tight">
                  {websiteAutomationCombo.summary}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/60">
                  Lead capture, WhatsApp, CRM, follow-ups, and forms — connected to the site.
                </p>
                <p className="mt-5 font-mono text-[2rem] font-bold leading-none tracking-tight">
                  {websiteAutomationCombo.price}
                </p>
                <p className="mt-2 font-mono text-[11.5px] text-white/45">starting price</p>
              </div>
            </Reveal>
          </div>
          <div className="mt-6 grid gap-4 rounded-[1.25rem] border border-[#0b0b0c]/10 bg-white p-6 sm:grid-cols-2 md:p-7">
            <div>
              <p className="font-mono text-[2rem] font-bold leading-none tracking-tight">{websiteService.price}</p>
              <p className="mt-1.5 font-mono text-[11.5px] text-[#5f6368]">website starting price</p>
            </div>
            <div className="text-[13.5px] leading-relaxed text-[#5f6368]">
              <p>{websiteService.priceNote}</p>
              <p className="mt-2">{websiteAutomationCombo.priceNote}</p>
            </div>
          </div>
        </section>

        {/* B — Automation */}
        <section aria-labelledby="price-auto-h" className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
          <SectionHeading
            eyebrow="B · Business automation"
            title={<span id="price-auto-h">Automation tiers.</span>}
            copy="One workflow or many — pick the starting point that matches the work."
          />
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {pricingTiers.map((t) => (
              <StaggerItem key={t.id} className="h-full">
                <article
                  className={cn(
                    "relative flex h-full flex-col rounded-[1.25rem] border bg-white p-6 md:p-7",
                    t.featured ? "border-[#ff6a00]/60 card-shadow" : "border-[#0b0b0c]/10"
                  )}
                >
                  {t.featured && (
                    <p className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 whitespace-nowrap rounded-full bg-[#c24e00] px-3.5 py-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-white">
                      Most popular
                    </p>
                  )}
                  <h3 className="mt-1 text-[18px] font-semibold tracking-tight">{t.name}</h3>
                  <p className="mt-3 font-mono text-[2rem] font-bold leading-none tracking-tight">{t.price}</p>
                  <p className="mt-1.5 font-mono text-[11.5px] text-[#5f6368]">starting price · scoped after audit</p>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#5f6368]">{t.blurb}</p>
                  <ul className="mt-5 space-y-2.5 border-t border-[#0b0b0c]/10 pt-5">
                    {t.points.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[14px] text-[#0b0b0c]/80">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6a00]" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <AuditCta className="w-full" />
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-8 border-t border-[#0b0b0c]/10 pt-5 font-mono text-[12px] leading-relaxed text-[#5f6368]">
            Final pricing depends on scope, functionality, integrations, and automation requirements.
            Third-party services such as WhatsApp Business, AI APIs, or hosting bill separately.
          </p>
        </section>

        <section aria-labelledby="care-h" className="border-t border-[#0b0b0c]/10 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
            <SectionHeading
              eyebrow="Care plans"
              title={<span id="care-h">Maintenance, without surprises.</span>}
              copy="Optional monthly care after delivery — monitoring, updates, and small fixes. Cancel anytime; you own everything either way."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.25rem] border border-[#0b0b0c]/10 bg-[#f4f5f5] p-6 md:p-7">
                <h3 className="text-[18px] font-semibold tracking-tight">Website Care</h3>
                <p className="mt-3 flex items-baseline gap-2">
                  <span className="font-mono text-[2rem] font-bold leading-none tracking-tight">₹999</span>
                  <span className="font-mono text-[12px] text-[#5f6368]">/month onwards</span>
                </p>
                <ul className="mt-4 space-y-2">
                  {["Updates, backups & security checks", "Small content edits", "Uptime monitoring"].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[14px] text-[#0b0b0c]/80">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6a00]" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[1.25rem] border border-[#0b0b0c]/10 bg-[#f4f5f5] p-6 md:p-7">
                <h3 className="text-[18px] font-semibold tracking-tight">Automation Care</h3>
                <p className="mt-3 flex items-baseline gap-2">
                  <span className="font-mono text-[2rem] font-bold leading-none tracking-tight">₹1,999</span>
                  <span className="font-mono text-[12px] text-[#5f6368]">/month onwards</span>
                </p>
                <ul className="mt-4 space-y-2">
                  {["Workflow monitoring & failure alerts", "Fixes and small improvements", "Monthly summary of what ran"].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[14px] text-[#0b0b0c]/80">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6a00]" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-5 font-mono text-[12px] leading-relaxed text-[#5f6368]">
              Starting prices; scoped with your project. No lock-in — your site, workflows, and credentials stay yours.
            </p>
          </div>
        </section>

        <section aria-labelledby="pricing-faq-h" className="border-t border-[#0b0b0c]/10 bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-8 md:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeading
              eyebrow="Questions"
              title={<span id="pricing-faq-h">Pricing questions, answered.</span>}
            />
            <Faq />
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
