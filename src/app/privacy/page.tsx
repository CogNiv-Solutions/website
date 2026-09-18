import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Contact } from "@/components/contact";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Cogniv Solutions collects, uses, and protects information shared through this website and workflow audits.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    h: "Information we collect",
    p: "When you request a workflow audit, we collect the details you provide: name, business name, email, phone, and the areas you'd like to automate. We also receive standard technical data (such as pages visited) needed to operate and secure the site.",
  },
  {
    h: "How we use it",
    p: "Your details are used only to prepare, schedule, and follow up on your audit request. We do not sell personal information, and we do not share it with third parties for marketing.",
  },
  {
    h: "Data retention",
    p: "Audit enquiries are kept only as long as needed to handle your request and any resulting engagement, then removed on request. Email us any time to ask what we hold or to request deletion.",
  },
  {
    h: "Security",
    p: "We apply reasonable safeguards — encrypted transport, limited access, and minimal collection. No method is perfectly secure, so we avoid collecting sensitive data you don't need to share at the enquiry stage.",
  },
  {
    h: "Contact",
    p: `Questions about privacy: ${SITE.email}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="pt-[68px]">
        <PageHeader
          eyebrow="Legal"
          title="Privacy Policy."
          copy="Last updated September 2026. Plain language, no surprises."
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
