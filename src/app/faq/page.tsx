import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { AuditCta } from "@/components/ui";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about starting small, keeping your tools, data access, ownership, failures, costs, and support after delivery.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="pt-[68px]">
        <PageHeader
          eyebrow="FAQ"
          title="Answers before the audit."
          copy="How we start, integrate, build, and support automation — and what to expect from working together."
        />
        <section aria-label="Frequently asked questions" className="mx-auto max-w-4xl px-4 py-12 md:px-8">
          <Faq />
          <div className="mt-10 rounded-[1.25rem] border border-[#0b0b0c]/10 bg-white p-6 md:p-8">
            <h2 className="text-[18px] font-semibold tracking-tight">Have a specific workflow question?</h2>
            <p className="mt-1 text-[14px] text-[#5f6368]">We&apos;ll review your exact process on a 30-minute call.</p>
            <div className="mt-5">
              <AuditCta />
            </div>
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
