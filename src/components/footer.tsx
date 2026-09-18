import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";
import { SITE, getWhatsAppUrl } from "@/lib/utils";

const explore = [
  ["Solutions", "/solutions"],
  ["Automation Services", "/automation-services"],
  ["AI Solutions", "/ai-solutions"],
  ["Industries", "/industries"],
  ["Demos", "/demos"],
  ["How It Works", "/how-it-works"],
  ["About", "/about"],
  ["Pricing", "/pricing"],
  ["Free Audit", "/audit"],
];

export function Footer() {
  return (
    <footer className="bg-[#0b0b0c] text-white">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-14 md:px-8 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo dark />
            <p className="mt-5 max-w-[36ch] text-[14.5px] leading-relaxed text-white/60">
              Turn repetitive work into automated systems — built around the tools your team already uses.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <Link
                href="/audit"
                className="btn-press group inline-flex items-center gap-2 rounded-full bg-white py-2 pl-5 pr-2 text-[14px] font-semibold text-[#0b0b0c] hover:bg-[#fff1e6]"
              >
                Book Free Audit
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#ff6a00] text-white transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            </div>
          </div>
          <nav aria-label="Explore">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {explore.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-[14.5px] text-white/70 transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Contact">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">Contact</p>
            <ul className="mt-4 space-y-2.5 text-[14.5px] text-white/70">
              <li>
                <a className="transition-colors hover:text-white" href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <a className="transition-colors hover:text-white" href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
              </li>
              {SITE.calendarUrl ? (
                <li>
                  <a className="transition-colors hover:text-white" href={SITE.calendarUrl} target="_blank" rel="noopener noreferrer">Book a call</a>
                </li>
              ) : (
                <li>
                  <a className="transition-colors hover:text-white" href={`tel:${SITE.phone.replace(/\s+/g, "")}`}>{SITE.phone}</a>
                </li>
              )}
            </ul>
          </nav>
          <nav aria-label="Legal">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">Legal</p>
            <ul className="mt-4 space-y-2.5">
              {[
                ["Privacy Policy", "/privacy"],
                ["Terms of Service", "/terms"],
                ["Data & Security", "/security"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-[14.5px] text-white/70 transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-[12px] text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Cogniv Solutions. All rights reserved.</p>
          <p>No fake clients, no invented numbers.</p>
        </div>
      </div>
    </footer>
  );
}
