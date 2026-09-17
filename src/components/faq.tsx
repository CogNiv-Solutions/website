"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FAQS } from "@/lib/seo-schema";
import { SectionHeading } from "./section-heading";
import { Stagger, StaggerItem } from "./reveal";
import { getWhatsAppUrl } from "@/lib/utils";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-20 border-t border-[#0b0e0d]/8 bg-[#fafaf9] py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <SectionHeading
            eyebrow="Frequently Asked Questions"
            title={<span id="faq-heading">Frequently Asked Questions</span>}
            copy="Clear answers regarding our automation audit, implementation timelines, tool integrations, and expected ROI."
            align="center"
          />
        </div>

        <Stagger className="space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const headingId = `faq-q-${index}`;
            const panelId = `faq-a-${index}`;

            return (
              <StaggerItem key={faq.question}>
                <div
                  className={`rounded-2xl border transition-all duration-200 bg-white ${
                    isOpen ? "border-[#ea580c]/40 shadow-sm" : "border-[#0b0e0d]/10 hover:border-[#0b0e0d]/20"
                  }`}
                >
                  <button
                    type="button"
                    id={headingId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                    className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left transition-colors"
                  >
                    <span className="flex items-start gap-3.5">
                      <HelpCircle className={`h-5 w-5 mt-0.5 shrink-0 transition-colors ${isOpen ? "text-[#ea580c]" : "text-[#0b0e0d]/40"}`} />
                      <span className="text-[15.5px] sm:text-[16.5px] font-semibold text-[#0b0e0d] leading-snug">
                        {faq.question}
                      </span>
                    </span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-[#ea580c]/10 text-[#ea580c]" : "bg-[#0b0e0d]/5 text-[#0b0e0d]/60"
                      }`}
                      aria-hidden="true"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={headingId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[#0b0e0d]/8 px-5 pb-6 pt-4 sm:px-6 sm:pb-7 text-[14.5px] leading-relaxed text-[#0b0e0d]/75">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* Bottom Contact Help Card */}
        <div className="mt-10 rounded-2xl border border-[#0b0e0d]/10 bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div>
            <h3 className="text-[16.5px] font-semibold text-[#0b0e0d]">Have a custom workflow question?</h3>
            <p className="mt-1 text-[14px] text-[#0b0e0d]/65">
              Speak directly with our automation architects without any obligation.
            </p>
          </div>
          <a
            href={getWhatsAppUrl("Hi Cogniv, I have a question regarding workflow automation for my business.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#25d366] hover:bg-[#20bd5a] px-5 py-3 text-[14px] font-semibold text-white shadow-sm transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
