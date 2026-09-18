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
import { processSteps } from "@/lib/data";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "From first call to working system in five steps: understand, find, build, integrate, improve. Know exactly what happens and when.",
  alternates: { canonical: "/how-it-works" },
};

const need = [
  ["One process owner", "Someone who knows how the work really gets done day to day."],
  ["A look at your tools", "Access to the sheets, chats, and software involved in that workflow."],
  ["One decision-maker", "Someone who can approve the target workflow when the prototype is ready."],
];

const get = [
  ["A mapped workflow", "Current flow and target flow — what changes, who approves, what connects."],
  ["A working prototype", "One automation running end to end with your real data."],
  ["Measured next steps", "What to extend, what to leave manual, and what it costs."],
];

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="pt-[68px]">
        <PageHeader
          eyebrow="How it works"
          title="From manual process to working system."
          copy="Five short steps from first call to working automation — with timelines, so you always know what happens next."
        />

        <section aria-label="Process steps" className="mx-auto max-w-7xl px-4 pt-12 md:px-8">
          <ol className="relative">
            <span className="absolute bottom-8 left-[27px] top-8 w-px bg-[#0b0b0c]/10 md:left-[31px]" aria-hidden />
            {processSteps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.03}>
                <li className="relative flex gap-5 pb-6 last:pb-0 md:gap-7">
                  <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-[#0b0b0c]/10 bg-white font-mono text-[13px] font-bold md:h-16 md:w-16">
                    {s.n}
                    <span className="absolute -right-px -top-px h-2.5 w-2.5 rounded-full bg-[#ff6a00]" aria-hidden />
                  </span>
                  <div className="flex-1 rounded-[1.25rem] border border-[#0b0b0c]/10 bg-white p-5 md:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h2 className="text-[18px] font-semibold tracking-tight">{s.title}</h2>
                      <span className="rounded-full bg-[#0b0b0c]/[0.06] px-2.5 py-1 font-mono text-[11.5px] text-[#5f6368]">{s.time}</span>
                    </div>
                    <p className="mt-1.5 max-w-[68ch] text-[14.5px] leading-relaxed text-[#5f6368]">{s.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        <section aria-label="What we need and what you get" className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[1.25rem] border border-[#0b0b0c]/10 bg-white p-6 md:p-8">
              <SectionHeading eyebrow="From you" title="What we need." />
              <ul className="mt-6 space-y-4">
                {need.map(([k, v]) => (
                  <li key={k} className="border-t border-[#0b0b0c]/10 pt-4 first:border-0 first:pt-0">
                    <p className="text-[15.5px] font-semibold">{k}</p>
                    <p className="mt-0.5 text-[14px] text-[#5f6368]">{v}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[1.25rem] bg-[#0b0b0c] p-6 text-white md:p-8">
              <SectionHeading dark eyebrow="From us" title="What you get." />
              <ul className="mt-6 space-y-4">
                {get.map(([k, v]) => (
                  <li key={k} className="border-t border-white/10 pt-4 first:border-0 first:pt-0">
                    <p className="flex items-center gap-2 text-[15.5px] font-semibold">
                      <ArrowRight className="h-4 w-4 text-[#ff8a3d]" aria-hidden /> {k}
                    </p>
                    <p className="mt-0.5 text-[14px] text-white/60">{v}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <AuditCta />
            <Link href="/demos" className="btn-press inline-flex items-center justify-center rounded-full border border-[#0b0b0c]/20 bg-white px-7 py-3.5 text-[15px] font-medium hover:border-[#0b0b0c]/45">
              See Live Demos
            </Link>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
