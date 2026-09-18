import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { Contact } from "@/components/contact";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Data & Security",
  description:
    "How Cogniv handles your business data: minimal access, role-based control, encryption in transit and at rest, and no training of public models on your data.",
  alternates: { canonical: "/security" },
};

const points = [
  {
    h: "Minimal access",
    p: "We request access only to the systems involved in the workflow in scope — nothing broader. Access is revoked or transferred to you at handover.",
  },
  {
    h: "Role-based control",
    p: "Automations run with the narrowest permissions they need. Human approvals stay human where the workflow requires judgement.",
  },
  {
    h: "Encryption",
    p: "Data is encrypted in transit and at rest across our delivery pipeline, and audit enquiries travel over encrypted connections with abuse protection.",
  },
  {
    h: "Your data stays yours",
    p: "Your business data is never used to train public AI models. Credentials and documentation are handed over, and you own the delivered system.",
  },
  {
    h: "When things fail",
    p: "Automations pause with a clear reason and alert the right person instead of failing silently. Every workflow ships with a defined manual fallback.",
  },
  {
    h: "Honest limits",
    p: "We don't claim certifications we don't hold or guarantees we can't prove. Ask us what applies to your stack in the audit — we'll answer directly.",
  },
];

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="pt-[68px]">
        <PageHeader
          eyebrow="Data & Security"
          title="Careful with your data, honest about limits."
          copy="We handle customer and workflow information every day — here's exactly how."
        />
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
          <div className="grid gap-4 md:grid-cols-2">
            {points.map((s, i) => (
              <section key={s.h} aria-label={s.h} className="rounded-[1.25rem] border border-[#0b0b0c]/10 bg-white p-6 md:p-7">
                <p className="font-mono text-[12px] font-bold text-[#a84300]">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-2 text-[18px] font-semibold tracking-tight">{s.h}</h2>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-[#5f6368]">{s.p}</p>
              </section>
            ))}
          </div>
          <div className="mt-10">
            <SectionHeading
              eyebrow="Questions"
              title="Need specifics for your review?"
              copy={`Email ${SITE.email} with what your team needs — access lists, data flow, or retention — and we'll respond directly.`}
            />
          </div>
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
