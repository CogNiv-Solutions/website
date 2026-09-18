import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Contact } from "@/components/contact";
import { industries } from "@/lib/data";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Automation examples for real estate, distribution, education, manufacturing, logistics, and professional services — mapped to your exact operation in an audit.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="pt-[68px]">
        <PageHeader
          eyebrow="Industries"
          title="Does Cogniv understand my business?"
          copy="Typical flows across six industries. Your audit maps your exact operation — never an assumption."
        />
        <div className="mx-auto max-w-7xl space-y-4 px-4 py-12 md:px-8">
          {industries.map((ind, i) => (
            <Reveal key={ind.id} delay={Math.min(i * 0.03, 0.12)}>
              <article className="overflow-hidden rounded-[1.25rem] border border-[#0b0b0c]/10 bg-white">
                <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
                  <div className="border-b border-[#0b0b0c]/10 p-6 md:p-8 lg:border-b-0 lg:border-r">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5f6368]">
                      {ind.name} · Today, manual
                    </p>
                    <p className="mt-2 font-mono text-[13px] leading-relaxed text-[#a84300]">{ind.example}</p>
                    <ol className="mt-4 space-y-2.5">
                      {ind.manual.map((m, j) => (
                        <li key={m} className="flex items-start gap-2.5 text-[14.5px] text-[#0b0b0c]/75">
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#0b0b0c]/[0.07] font-mono text-[10.5px] font-semibold">
                            {j + 1}
                          </span>
                          {m}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="bg-[#0b0b0c] p-6 text-white md:p-8">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                      Automation opportunity
                    </p>
                    <ol className="mt-4 space-y-2.5">
                      {ind.automate.map((m) => (
                        <li key={m} className="flex items-start gap-2.5 text-[14.5px] text-white/85">
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#ff6a00]/20">
                            <Check className="h-3 w-3 text-[#ff8a3d]" aria-hidden />
                          </span>
                          {m}
                        </li>
                      ))}
                    </ol>
                    <p className="mt-5 border-t border-white/10 pt-4 text-[14px] leading-relaxed text-white/70">
                      {ind.benefit}
                    </p>
                    <Link
                      href={`/industries/${ind.id}`}
                      className="btn-press mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-semibold text-[#0b0b0c] hover:bg-[#fff1e6]"
                    >
                      View {ind.name} detail <ArrowRight className="h-4 w-4 text-[#ff6a00]" aria-hidden />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
          <p className="pt-2 font-mono text-[12px] text-[#5f6368]">
            Illustrative examples — your audit maps your exact flow.
          </p>
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
