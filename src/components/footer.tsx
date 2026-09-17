import { ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";
import { getWhatsAppUrl } from "@/lib/utils";

const cols = [
  {
    h: "Automation Systems",
    links: [
      ["WhatsApp Automation", "/#solutions"],
      ["Lead & CRM Pipelines", "/#solutions"],
      ["Document & Invoice AI", "/#solutions"],
      ["Operations & ERP Sync", "/#solutions"],
      ["Interactive Demos", "/demo"],
    ],
  },
  {
    h: "Industries",
    links: [
      ["Distributors & Wholesale", "/#industries"],
      ["Real Estate Pipelines", "/#industries"],
      ["Education & Coaching", "/#industries"],
      ["Manufacturing & QC", "/#industries"],
      ["Logistics & Dispatch", "/#industries"],
    ],
  },
  {
    h: "Company",
    links: [
      ["How It Works", "/#how-it-works"],
      ["Pricing & ROI Calculator", "/#pricing"],
      ["Why Cogniv", "/#why-cogniv"],
      ["Frequently Asked Questions", "/#faq"],
    ],
  },
  {
    h: "Get in Touch",
    links: [
      ["Book Free Audit", "/#contact"],
      ["WhatsApp Consultation", getWhatsAppUrl("Hi Cogniv, I would like to inquire about business automation.")],
      ["Email Us", "mailto:cognivsolutions@gmail.com"],
      ["Back to Top", "#top"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0b0e0d] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo dark />
            <p className="mt-4 text-[15px] font-medium text-white/80">Business, Automated.</p>
            <p className="mt-2 max-w-[38ch] text-[14px] leading-relaxed text-white/55">
              We turn repetitive work into automated systems — audited, built and measured around your operation.
            </p>
            <a
              href="/#contact"
              className="btn-press group mt-6 inline-flex w-full sm:w-auto items-center justify-between sm:justify-start gap-2 rounded-full bg-white py-2 pl-5 pr-2 text-[14px] font-semibold text-[#0b0e0d] hover:bg-blue-100"
            >
              <span>Book Automation Audit</span>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0b0e0d] text-white transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </span>
            </a>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {cols.map((c) => (
              <div key={c.h}>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">{c.h}</p>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map(([label, href]) => (
                    <li key={label}>
                      <a href={href} className="text-[14.5px] text-white/70 transition-colors hover:text-white">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 font-mono text-[12px] text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Cogniv Solutions. All rights reserved.</p>
          <p>Built around real workflows — no fake clients, no invented numbers.</p>
        </div>
      </div>
    </footer>
  );
}
