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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname === "/") {
      const hashLinks = navLinks.filter((l) => l.href.startsWith("#") || l.href.startsWith("/#"));
      const ids = hashLinks.map((l) => l.href.replace(/^\/?#/, ""));
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(`/#${e.target.id}`);
          });
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) obs.observe(el);
      });
      return () => obs.disconnect();
    } else {
      setActive(pathname);
    }
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500",
          scrolled
            ? "border-b border-[#0b0e0d]/8 bg-[#fafaf9]/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav aria-label="Primary" className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 md:px-8">
          <Link href="/" aria-label="Cogniv Solutions — home">
            <Logo dark={open} />
          </Link>
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => {
              const isCurrent = active === l.href || pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={isCurrent ? "true" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[14px] font-medium transition-colors",
                      isCurrent ? "text-[#0b0e0d]" : "text-[#0b0e0d]/60 hover:text-[#0b0e0d]"
                    )}
                  >
                    {l.label}
                    {isCurrent && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-[#0b0e0d]/[0.06]"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="hidden lg:block">
            <Link
              href="/audit"
              className="btn-press group inline-flex items-center gap-2 rounded-full bg-[#0b0e0d] py-2.5 pl-5 pr-2.5 text-[14px] font-medium text-white hover:bg-[#1a201e]"
            >
              Book Automation Audit
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(
              "grid h-11 w-11 place-items-center rounded-full border transition-colors lg:hidden",
              open
                ? "border-white/20 bg-white/15 text-white"
                : "border-[#0b0e0d]/10 bg-white text-[#0b0e0d]"
            )}
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
            className="fixed inset-0 z-30 flex flex-col justify-center bg-[#0b0e0d]/95 backdrop-blur-2xl lg:hidden overflow-y-auto max-h-[100dvh]"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex flex-col justify-center gap-1.5 px-6 sm:px-8 py-20 my-auto">
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
                    className="flex min-h-[48px] items-center border-b border-white/10 py-3 text-2xl sm:text-3xl font-semibold tracking-tight text-white active:text-orange-400"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.45 }}
              >
                <Link
                  href="/audit"
                  onClick={() => setOpen(false)}
                  className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-base font-semibold text-[#0b0e0d] active:bg-orange-50"
                >
                  Book Automation Audit <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
