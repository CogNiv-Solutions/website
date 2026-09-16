import { ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";

const cols = [
  {
    h: "Company",
    links: [
      ["Solutions", "#solutions"],
      ["How It Works", "#how-it-works"],
      ["Industries", "#industries"],
      ["Stack Checker", "#stack-checker"],
      ["Demo", "#demo"],
      ["Pricing", "#pricing"],
      ["About", "#about"],
      ["FAQ", "#faq"],
    ],
  },
  {
    h: "Start",
    links: [
      ["Book Automation Audit", "#contact"],
      ["Check Stack Compatibility", "#stack-checker"],
      ["Try the Demo", "#demo"],
      ["Estimate Value", "#contact"],
    ],
  },
  {
    h: "Legal",
    links: [
      ["Privacy", "#top"],
      ["Terms", "#top"],
      ["Contact", "#contact"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0b0e0d] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo dark />
            <p className="mt-4 text-[15px] font-medium text-white/80">Business, Automated.</p>
            <p className="mt-2 max-w-[38ch] text-[14px] leading-relaxed text-white/55">
              We turn repetitive work into automated systems — audited, built and measured around your operation.
            </p>
            <a
              href="#contact"
              className="btn-press group mt-6 inline-flex items-center gap-2 rounded-full bg-white py-2 pl-5 pr-2 text-[14px] font-semibold text-[#0b0e0d] hover:bg-emerald-100"
            >
              Book Automation Audit
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0b0e0d] text-white transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </span>
            </a>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
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
