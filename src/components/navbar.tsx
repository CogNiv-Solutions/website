"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/data";
import { Logo } from "./logo";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500",
          scrolled || open
            ? "border-b border-[#0b0b0c]/10 bg-[#f4f5f5]/90 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav aria-label="Primary" className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 md:px-8">
          <Link href="/" aria-label="Cogniv Solutions — home">
            <Logo />
          </Link>
          <ul className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-full px-4 py-2 text-[14px] font-medium transition-colors",
                      active ? "text-[#0b0b0c]" : "text-[#0b0b0c]/60 hover:text-[#0b0b0c]"
                    )}
                  >
                    {l.label}
                    <span
                      aria-hidden
                      className={cn(
                        "mx-auto mt-0.5 block h-[2px] w-4 rounded-full bg-[#ff6a00] transition-opacity",
                        active ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="hidden lg:block">
            <Link
              href="#contact"
              className="btn-press group inline-flex items-center gap-2 rounded-full bg-[#0b0b0c] py-2 pl-5 pr-2 text-[14px] font-medium text-white hover:bg-[#1c1c1e]"
            >
              Book Free Audit
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#ff6a00] text-white transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-full border border-[#0b0b0c]/15 bg-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 bg-[#0b0b0c] lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex h-full flex-col justify-center gap-1 px-8 pt-16">
              <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff8a3d]">
                <span className="h-[2px] w-6 bg-[#ff6a00]" aria-hidden /> Menu
              </p>
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.08, duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/10 py-3.5 text-[26px] font-semibold tracking-tight text-white"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.45 }}
                className="mt-6 flex flex-col gap-2.5"
              >
                <Link
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c24e00] px-6 py-4 text-base font-semibold text-white"
                >
                  Book Free Audit <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href="/demos"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3.5 text-[15px] font-medium text-white"
                >
                  See Live Demos
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
