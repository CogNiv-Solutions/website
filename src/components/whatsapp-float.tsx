"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, ArrowUpRight, Sparkles } from "lucide-react";
import { SITE, getWhatsAppUrl, cn } from "@/lib/utils";

const QUICK_PROMPTS = [
  {
    label: "🎯 Book Free Automation Audit",
    text: "Hi Cogniv, I'd like to schedule a Free 30-minute Automation Audit for my business.",
  },
  {
    label: "💬 WhatsApp & CRM Pipeline",
    text: "Hi Cogniv, I'm interested in automating our incoming WhatsApp inquiries and CRM leads.",
  },
  {
    label: "📊 Tally / Excel Automation",
    text: "Hi Cogniv, we want to automate data transfer between Excel/Tally and our daily operations.",
  },
];

export function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={cardRef}
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end print:hidden md:bottom-6 md:right-6"
    >
      {/* Expandable Chat Card */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Chat with Cogniv on WhatsApp"
          className="mb-3 w-[calc(100vw-2.5rem)] max-w-[340px] overflow-hidden rounded-2xl border border-[#0b0e0d]/10 bg-white shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#0b0e0d]/8 bg-[#0b0e0d] px-4 py-3.5 text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15 text-orange-400">
                  <Sparkles className="h-4.5 w-4.5" aria-hidden />
                </span>
                <span
                  className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0b0e0d] bg-orange-400"
                  aria-hidden
                />
              </div>
              <div>
                <p className="text-[14px] font-semibold tracking-tight">{SITE.name}</p>
                <p className="flex items-center gap-1.5 text-[11px] text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                  Online · Replies in &lt;15m
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="grid h-7 w-7 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
              aria-label="Close WhatsApp card"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="bg-[#fafaf9] p-4">
            <div className="rounded-xl border border-[#0b0e0d]/8 bg-white p-3.5 text-[13.5px] leading-relaxed text-[#0b0e0d]/80 shadow-xs">
              👋 <strong>Hi there!</strong> Have a question about automating repetitive work in your business? Tap a quick option below to chat directly:
            </div>

            {/* Quick action chips */}
            <div className="mt-3 flex flex-col gap-1.5">
              {QUICK_PROMPTS.map((prompt) => (
                <a
                  key={prompt.label}
                  href={getWhatsAppUrl(prompt.text)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-[#0b0e0d]/8 bg-white px-3 py-2 text-[12.5px] font-medium text-[#0b0e0d]/80 transition-all hover:border-orange-500/40 hover:bg-orange-50/40 hover:text-orange-950"
                >
                  <span>{prompt.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#0b0e0d]/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-orange-600" />
                </a>
              ))}
            </div>

            {/* Primary Action Button */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-[13.5px] font-semibold text-white shadow-sm transition-opacity hover:opacity-95"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Open WhatsApp Chat
            </a>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close WhatsApp chat" : "Chat with us on WhatsApp"}
        aria-expanded={isOpen}
        className={cn(
          "group relative flex h-13 w-13 items-center justify-center rounded-full border border-white/20 bg-[#0b0e0d] text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#151c19] sm:h-14 sm:w-auto sm:justify-start sm:px-4 sm:gap-2.5",
          isOpen ? "bg-[#151c19]" : ""
        )}
      >
        <span className="relative grid h-8 w-8 place-items-center rounded-full bg-[#25D366] text-white shrink-0">
          <MessageCircle className="h-4.5 w-4.5" strokeWidth={2.2} aria-hidden />
          <span
            className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0b0e0d] bg-orange-400 animate-pulse"
            aria-hidden
          />
        </span>
        <span className="hidden text-[13.5px] font-medium tracking-tight sm:inline">
          Chat on WhatsApp
        </span>
      </button>
    </div>
  );
}
