"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

const preview = FAQS.slice(0, 6);

/** SECTION 11 — FAQ. Short answers to real objections. */
export function FaqPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section aria-labelledby="faq-h" className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Questions"
            title={<span id="faq-h">Asked before every audit.</span>}
            copy="Short answers to the objections we hear most. The full list lives on the FAQ page."
          />
          <Reveal delay={0.12}>
            <Link
              href="/faq"
              className="btn-press mt-7 inline-flex items-center gap-1.5 rounded-full border border-[#0b0b0c]/20 px-5 py-3 text-[14px] font-medium hover:border-[#0b0b0c]/45"
            >
              All questions <ArrowRight className="h-4 w-4 text-[#ff6a00]" aria-hidden />
            </Link>
          </Reveal>
        </div>
        <div className="divide-y divide-[#0b0b0c]/10 border-y border-[#0b0b0c]/10">
          {preview.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="py-5">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="group flex w-full items-start justify-between gap-4 rounded-lg py-1 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`home-faq-${index}`}
                >
                  <span className="text-[16px] font-semibold tracking-tight text-[#0b0b0c] transition-colors group-hover:text-[#a84300] md:text-[17px]">
                    {faq.question}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-200",
                      isOpen ? "rotate-180 border-transparent bg-[#0b0b0c] text-white" : "border-[#0b0b0c]/15 text-[#0b0b0c]"
                    )}
                  >
                    <ChevronDown className="h-4 w-4" aria-hidden />
                  </span>
                </button>
                {isOpen && (
                  <div id={`home-faq-${index}`} role="region" className="mt-3 pr-8 text-[14.5px] leading-relaxed text-[#5f6368]">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Full FAQ list for /faq — same source of truth. */
export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="divide-y divide-[#0b0b0c]/10 border-y border-[#0b0b0c]/10">
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <Reveal key={faq.question} delay={Math.min(index * 0.03, 0.15)}>
            <div className="py-5">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="group flex w-full items-start justify-between gap-4 rounded-lg py-1 text-left"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
              >
                <span className="text-[16px] font-semibold tracking-tight text-[#0b0b0c] transition-colors group-hover:text-[#a84300] md:text-[17px]">
                  {faq.question}
                </span>
                <span
                  className={cn(
                    "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-200",
                    isOpen ? "rotate-180 border-transparent bg-[#0b0b0c] text-white" : "border-[#0b0b0c]/15 text-[#0b0b0c]"
                  )}
                >
                  <ChevronDown className="h-4 w-4" aria-hidden />
                </span>
              </button>
              {isOpen && (
                <div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} className="mt-3 pr-8 text-[14.5px] leading-relaxed text-[#5f6368]">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
