"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { FAQS } from "@/lib/seo-schema";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { cn, SITE } from "@/lib/utils";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-h"
      className="scroll-mt-20 border-t border-[#0b0e0d]/8 bg-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title={<span id="faq-h">Everything you need to know about our automations.</span>}
              copy="Clear answers about how we map, integrate, build, and support business automation systems with your team."
            />

            <Reveal delay={0.15}>
              <div className="mt-8 rounded-2xl border border-[#0b0e0d]/10 bg-[#fafaf9] p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0b0e0d] text-white">
                    <HelpCircle className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-semibold text-[#0b0e0d]">
                      Have a specific workflow question?
                    </h3>
                    <p className="text-[13.5px] text-[#0b0e0d]/60">
                      We’ll review your exact process on a 30-min call.
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <a
                    href="#contact"
                    className="btn-press inline-flex items-center gap-1.5 rounded-full bg-[#0b0e0d] px-4 py-2.5 text-[13.5px] font-medium text-white hover:bg-[#1a201e]"
                  >
                    Book Automation Audit <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-[13px] font-medium text-[#0b0e0d]/60 hover:text-[#0b0e0d] underline underline-offset-4"
                  >
                    Email questions
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="divide-y divide-[#0b0e0d]/10">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <Reveal key={faq.question} delay={0.06 * index}>
                  <div className="py-5 first:pt-0 last:pb-0">
                    <button
                      type="button"
                      onClick={() => toggle(index)}
                      className="group flex w-full items-start justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e7c5b] focus-visible:ring-offset-2 rounded-lg py-1"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      id={`faq-question-${index}`}
                    >
                      <span className="text-[16.5px] font-semibold tracking-tight text-[#0b0e0d] transition-colors group-hover:text-[#0e7c5b] md:text-[17.5px]">
                        {faq.question}
                      </span>
                      <span
                        className={cn(
                          "mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#0b0e0d]/15 bg-white text-[#0b0e0d] transition-transform duration-200",
                          isOpen && "rotate-180 bg-[#0b0e0d] text-white border-transparent"
                        )}
                      >
                        <ChevronDown className="h-4 w-4" aria-hidden />
                      </span>
                    </button>
                    {isOpen && (
                      <div
                        id={`faq-answer-${index}`}
                        role="region"
                        aria-labelledby={`faq-question-${index}`}
                        className="mt-3.5 pr-8 text-[14.5px] leading-relaxed text-[#0b0e0d]/70"
                      >
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
