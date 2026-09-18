import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Contact } from "@/components/contact";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using the Cogniv Solutions website and requesting a workflow audit.",
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    h: "What this site is",
    p: "This website describes Cogniv Solutions' automation services and lets you request a free workflow audit. Content here is general information, not a quote, proposal, or guarantee of results.",
  },
  {
    h: "Audits and estimates",
    p: "Audits map your workflow and identify automation candidates. Any prices, timelines, or savings figures shown are starting points or illustrative estimates — confirmed in writing only after scoping.",
  },
  {
    h: "Acceptable use",
    p: "Don't misuse the contact forms, attempt to disrupt the site, or submit someone else's details without permission. Automated abuse is rate-limited and blocked.",
  },
  {
    h: "Intellectual property",
    p: "Site content and the Cogniv logo belong to Cogniv Solutions. Workflows, documentation, and credentials built for you are handed over as agreed in your engagement.",
  },
  {
    h: "Liability",
    p: "We work to keep information accurate, but the site is provided as-is. Engagements are governed by their own written terms agreed before work begins.",
  },
  {
    h: "Contact",
    p: `Questions about these terms: ${SITE.email}.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="pt-[68px]">
        <PageHeader
          eyebrow="Legal"
          title="Terms of Service."
          copy="Last updated September 2026."
        />
        <div className="mx-auto max-w-3xl space-y-8 px-4 py-12 md:px-8">
          {sections.map((s) => (
            <section key={s.h} aria-label={s.h}>
              <h2 className="text-[19px] font-semibold tracking-tight">{s.h}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#0b0b0c]/80">{s.p}</p>
            </section>
          ))}
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
