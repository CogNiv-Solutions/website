import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Contact } from "@/components/contact";
import { AuditCta } from "@/components/ui";
import { principles } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Cogniv Solutions: operators first, technologists second. How we think, how we work, and why our approach is different.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="pt-[68px]">
        <PageHeader
          eyebrow="About Cogniv"
          title="Operators first. Technologists second."
          copy="We understand business workflows deeply — and happen to be very good at technology."
        />

        <section aria-labelledby="story-h" className="mx-auto max-w-7xl px-4 pt-12 md:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <SectionHeading
              eyebrow="Our story"
              title={<span id="story-h">Repetitive work is a systems problem.</span>}
            />
            <Reveal delay={0.08}>
              <div className="space-y-4 text-[15.5px] leading-relaxed text-[#0b0b0c]/80">
                <p>
                  Most businesses don&apos;t have a technology problem. They have a repetition problem:
                  the same enquiries answered by hand, the same data typed twice, the same follow-ups
                  depending on someone&apos;s memory.
                </p>
                <p>
                  Cogniv started to fix exactly that — by sitting with teams, learning how work really
                  moves, and turning the repetitive parts into systems that run reliably around the
                  tools already in place.
                </p>
                <p>
                  AI is part of our toolkit, not our identity. We use it where it genuinely removes
                  work or prevents loss — and leave it out where a simpler workflow does the job.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section aria-labelledby="think-h" className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
          <SectionHeading
            eyebrow="How we think"
            title={<span id="think-h">Why our approach is different.</span>}
          />
          <div className="mt-10 divide-y divide-[#0b0b0c]/10 border-y border-[#0b0b0c]/10">
            {principles.map((p) => (
              <div key={p.n} className="grid gap-2 py-6 md:grid-cols-[70px_1fr_1.4fr] md:items-baseline md:gap-6">
                <span className="font-mono text-[14px] font-bold text-[#a84300]">{p.n}</span>
                <h3 className="text-[19px] font-semibold tracking-tight">{p.title}</h3>
                <p className="max-w-[56ch] text-[14.5px] leading-relaxed text-[#5f6368]">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="work-h" className="bg-[#0b0b0c] text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-[1fr_1fr] lg:items-center">
            <SectionHeading
              dark
              eyebrow="How we work"
              title={<span id="work-h">One workflow at a time.</span>}
              copy="We start with a single bottleneck, prove the system in daily use, then extend. No big-bang rebuilds, no shelfware."
            />
            <Reveal delay={0.1}>
              <ol className="space-y-3">
                {[
                  ["Audit", "A 30-minute review of one workflow. You keep the map either way."],
                  ["Prototype", "One automation, working with your real data, in weeks."],
                  ["Integrate", "Connected to your tools, handed over with documentation."],
                  ["Improve", "Measured, tightened, then extended to the next workflow."],
                ].map(([k, v], i) => (
                  <li key={k} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <span className="font-mono text-[13px] font-bold text-[#ff8a3d]">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="block text-[15.5px] font-semibold">{k}</span>
                      <span className="mt-0.5 block text-[14px] text-white/60">{v}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <AuditCta variant="on-dark" />
                <Link href="/how-it-works" className="btn-press inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-[15px] font-medium text-white hover:border-white/50">
                  Process in detail <ArrowRight className="h-4 w-4 text-[#ff8a3d]" aria-hidden />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section aria-labelledby="trust-h" className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
          <SectionHeading
            eyebrow="Trust"
            title={<span id="trust-h">No invented proof.</span>}
            copy="We don't publish client lists, awards, or metrics we can't document. In the audit, we show real workflows — and tell you plainly when something isn't worth automating yet."
          />
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
