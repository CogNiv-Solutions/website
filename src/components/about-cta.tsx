import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { AuditCta, WhatsAppCta } from "./ui";

export function About() {
  return (
    <section id="about" aria-labelledby="about-h" className="scroll-mt-20 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-[1fr_1fr] lg:items-center">
        <SectionHeading
          eyebrow="About Cogniv"
          title={<span id="about-h">Operators first. Technologists second.</span>}
          copy="Cogniv exists for one shift: moving businesses from work that depends on memory to systems that run reliably."
        />
        <Reveal delay={0.1}>
          <div className="grid grid-cols-3 divide-x divide-[#0b0b0c]/10 rounded-[1.25rem] border border-[#0b0b0c]/10 bg-[#f4f5f5]">
            {[
              ["Product", "software that lasts"],
              ["Automation", "workflows that hold"],
              ["AI", "judgement where needed"],
            ].map(([k, v]) => (
              <div key={k} className="px-5 py-6 text-center md:py-8">
                <p className="text-[16px] font-semibold tracking-tight md:text-lg">{k}</p>
                <p className="mt-1 text-[12.5px] leading-snug text-[#5f6368]">{v}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[14px] leading-relaxed text-[#5f6368]">
            We don&apos;t publish client lists or claims we can&apos;t prove. Ask us in the audit — we&apos;ll show you real workflows.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/** SECTION 12 — Final dark CTA. Single consistent CTA system. */
export function FinalCta() {
  return (
    <section aria-labelledby="final-h" className="bg-[#0b0b0c] text-white">
      <div className="relative mx-auto max-w-7xl overflow-hidden px-4 py-20 md:px-8 md:py-28">
        <div className="texture-grid-dark pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ff8a3d]">
              <span className="h-[2px] w-6 bg-[#ff6a00]" aria-hidden /> Start here
            </p>
            <h2 id="final-h" className="display-tight mt-4 text-4xl font-semibold md:text-6xl">
              What repetitive work should we automate first?
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-base leading-relaxed text-white/65 md:text-lg">
              Let&apos;s look at your workflow and find where automation can actually make a difference.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <AuditCta variant="on-dark" />
              <WhatsAppCta />
            </div>
            <p className="mt-6 font-mono text-[12px] text-white/45">
              30-minute workflow review · No obligation
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
