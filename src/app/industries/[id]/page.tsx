import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Contact } from "@/components/contact";
import { AuditCta } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { industries } from "@/lib/data";

export function generateStaticParams() {
  return industries.map((ind) => ({ id: ind.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const ind = industries.find((i) => i.id === id);
  return {
    title: ind ? `${ind.name} Automation` : "Industry",
    description: ind
      ? `${ind.name}: ${ind.example}. ${ind.benefit}`
      : "Industry automation example.",
    alternates: { canonical: `/industries/${id}` },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ind = industries.find((i) => i.id === id);
  if (!ind) notFound();
  const siblings = industries.filter((i) => i.id !== id);

  return (
    <>
      <Navbar />
      <main id="main" className="pt-[68px]">
        <PageHeader
          eyebrow={ind.name}
          title={ind.benefit}
          copy={`${ind.example}. Illustrative example — your audit maps your exact flow.`}
        />

        <div className="mx-auto max-w-7xl px-4 pt-10 md:px-8">
          <Reveal>
            <div className="overflow-hidden rounded-[1.25rem] border border-[#0b0b0c]/10 bg-white">
              <div className="grid gap-0 lg:grid-cols-2">
                <div className="border-b border-[#0b0b0c]/10 p-6 md:p-8 lg:border-b-0 lg:border-r">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5f6368]">
                    Common manual workflow
                  </p>
                  <ol className="mt-4 space-y-2.5">
                    {ind.manual.map((m, i) => (
                      <li key={m} className="flex items-start gap-2.5 text-[14.5px] text-[#0b0b0c]/75">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#0b0b0c]/[0.07] font-mono text-[10.5px] font-semibold">
                          {i + 1}
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
                  <div className="mt-6">
                    <AuditCta variant="on-dark" />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10 flex flex-wrap gap-2" aria-label="Other industries">
              <Link
                href="/industries"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#0b0b0c]/20 bg-white px-4 py-2.5 text-[14px] font-medium hover:border-[#0b0b0c]/40"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden /> All industries
              </Link>
              {siblings.map((s) => (
                <Link
                  key={s.id}
                  href={`/industries/${s.id}`}
                  className="rounded-full border border-[#0b0b0c]/12 bg-white px-4 py-2.5 text-[14px] font-medium text-[#5f6368] hover:border-[#0b0b0c]/30 hover:text-[#0b0b0c]"
                >
                  {s.name}
                </Link>
              ))}
            </div>
            <Link href="/demos" className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#a84300]">
              See these flows in the Demo Lab <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
