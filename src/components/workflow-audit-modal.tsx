"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight, Loader2, MessageSquare, Shield, Clock } from "lucide-react";
import { contactSchema, submitAuditRequest, type ContactInput } from "@/lib/validation";
import { cn, getWhatsAppUrl } from "@/lib/utils";

const LottieAnimation = dynamic(() => import("./lottie-animation"), { ssr: false });

export interface IndustryWorkflow {
  id: string;
  name: string;
  example: string;
  desc: string;
  types: string[];
  tools?: string[];
  checkpoints?: string[];
}

interface WorkflowAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  industry: IndustryWorkflow | null;
  onJumpToFullForm?: (industry: IndustryWorkflow) => void;
}

export function WorkflowAuditModal({
  isOpen,
  onClose,
  industry,
  onJumpToFullForm,
}: WorkflowAuditModalProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      automationType: industry?.types || ["Lead Management"],
      industry: industry?.name || "",
    },
  });

  // Keep form values in sync when industry changes
  useEffect(() => {
    if (industry) {
      setValue("industry", industry.name);
      setValue("automationType", industry.types);
      setValue("process", `${industry.name} Workflow: ${industry.example}`);
      setStatus("idle");
      setErrorMessage("");
    }
  }, [industry, setValue]);

  // Lock body scroll when open & listen for Escape
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!industry) return null;

  const onSubmit = async (data: ContactInput) => {
    setStatus("sending");
    setErrorMessage("");
    try {
      const payload: ContactInput = {
        ...data,
        industry: industry.name,
        automationType: industry.types,
        process: `[${industry.name} Workflow Audit] ${industry.example}`,
      };
      const res = await submitAuditRequest(payload);
      if (res.ok) {
        setStatus("ok");
        reset();
      } else {
        setStatus("error");
        setErrorMessage(
          res.status === 429
            ? "Too many requests. Please wait a moment or chat on WhatsApp."
            : "Could not submit audit request. Please try again or WhatsApp us directly."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or reach out on WhatsApp.");
    }
  };

  const whatsappMessage = `Hi Cogniv, I would like to audit our ${industry.name} workflow:\n"${industry.example}". Can we connect?`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0b0e0d]/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="audit-modal-title"
            className="relative z-10 w-full max-w-xl rounded-2xl sm:rounded-3xl border border-[#0b0e0d]/10 bg-white p-5 sm:p-7 shadow-2xl my-auto max-h-[92vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close audit dialog"
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-[#0b0e0d]/10 bg-[#fafaf9] text-[#0b0e0d]/70 hover:bg-[#0b0e0d] hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {status === "ok" ? (
              <div className="py-8 text-center" role="status">
                <LottieAnimation name="success" className="mx-auto h-20 w-20" />
                <h3 className="mt-3 text-2xl font-semibold text-[#0b0e0d]">
                  Audit Request Received
                </h3>
                <p className="mx-auto mt-2 max-w-[34ch] text-[14px] leading-relaxed text-[#0b0e0d]/65">
                  We’re preparing your <strong>{industry.name}</strong> workflow breakdown. Our automation engineer will connect within 1 business day.
                </p>
                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
                  <a
                    href={getWhatsAppUrl(`Hi Cogniv, I just submitted an audit for our ${industry.name} workflow.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press inline-flex items-center justify-center gap-2 rounded-full bg-[#2563eb] px-5 py-2.5 text-[13.5px] font-semibold text-white hover:bg-[#1d4ed8]"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Confirm on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn-press rounded-full border border-[#0b0e0d]/15 px-5 py-2.5 text-[13.5px] font-medium text-[#0b0e0d] hover:border-[#0b0e0d]/35"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Header Badge */}
                <div className="flex items-center gap-2 text-[12px] font-semibold text-[#2563eb]">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-[#eff6ff]">
                    <Clock className="h-3 w-3 text-[#2563eb]" />
                  </span>
                  <span>30-Minute Targeted Workflow Audit</span>
                </div>

                <h2 id="audit-modal-title" className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight text-[#0b0e0d]">
                  Audit {industry.name} Workflow
                </h2>

                {/* Workflow Preview Pill */}
                <div className="mt-3 rounded-xl border border-[#2563eb]/20 bg-[#eff6ff]/70 p-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#1d4ed8]">
                    Workflow Under Review
                  </p>
                  <p className="mt-1 font-mono text-[12.5px] font-medium text-[#0b0e0d] leading-relaxed">
                    {industry.example}
                  </p>
                </div>

                {/* Scope Highlights */}
                <div className="mt-4 rounded-xl bg-[#fafaf9] border border-[#0b0e0d]/6 p-3.5">
                  <p className="text-[12.5px] font-semibold text-[#0b0e0d]">What you get in this audit:</p>
                  <ul className="mt-2 space-y-1.5 text-[12.5px] text-[#0b0e0d]/70">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#2563eb]" />
                      <span>Bottleneck identification (where staff hours are being lost)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#2563eb]" />
                      <span>Compatibility check with your existing stack (Tally, WhatsApp, CRM, Sheets)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#2563eb]" />
                      <span>Actionable blueprint with fixed delivery timeline & ROI model</span>
                    </li>
                  </ul>
                </div>

                {/* Quick Audit Form */}
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-5 space-y-3.5">
                  {/* Anti-spam honeypot */}
                  <div style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden="true">
                    <input type="text" tabIndex={-1} autoComplete="off" {...register("_hp")} />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="w-name" className="block text-[12.5px] font-medium text-[#0b0e0d]">
                        Your Name *
                      </label>
                      <input
                        id="w-name"
                        placeholder="Rahul Mehta"
                        className={cn(
                          "mt-1 w-full rounded-xl border bg-white px-3.5 py-2.5 text-[13.5px] text-[#0b0e0d] placeholder:text-[#0b0e0d]/35 transition-colors",
                          errors.name ? "border-red-500" : "border-[#0b0e0d]/15 focus:border-[#2563eb]"
                        )}
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="mt-1 text-[11px] font-medium text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="w-biz" className="block text-[12.5px] font-medium text-[#0b0e0d]">
                        Business Name *
                      </label>
                      <input
                        id="w-biz"
                        placeholder="e.g. Apex Enterprises"
                        className={cn(
                          "mt-1 w-full rounded-xl border bg-white px-3.5 py-2.5 text-[13.5px] text-[#0b0e0d] placeholder:text-[#0b0e0d]/35 transition-colors",
                          errors.businessName ? "border-red-500" : "border-[#0b0e0d]/15 focus:border-[#2563eb]"
                        )}
                        {...register("businessName")}
                      />
                      {errors.businessName && (
                        <p className="mt-1 text-[11px] font-medium text-red-600">{errors.businessName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="w-phone" className="block text-[12.5px] font-medium text-[#0b0e0d]">
                        Phone / WhatsApp *
                      </label>
                      <input
                        id="w-phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        className={cn(
                          "mt-1 w-full rounded-xl border bg-white px-3.5 py-2.5 text-[13.5px] text-[#0b0e0d] placeholder:text-[#0b0e0d]/35 transition-colors",
                          errors.phone ? "border-red-500" : "border-[#0b0e0d]/15 focus:border-[#2563eb]"
                        )}
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-[11px] font-medium text-red-600">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="w-email" className="block text-[12.5px] font-medium text-[#0b0e0d]">
                        Work Email *
                      </label>
                      <input
                        id="w-email"
                        type="email"
                        placeholder="rahul@apex.com"
                        className={cn(
                          "mt-1 w-full rounded-xl border bg-white px-3.5 py-2.5 text-[13.5px] text-[#0b0e0d] placeholder:text-[#0b0e0d]/35 transition-colors",
                          errors.email ? "border-red-500" : "border-[#0b0e0d]/15 focus:border-[#2563eb]"
                        )}
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="mt-1 text-[11px] font-medium text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {status === "error" && (
                    <p className="rounded-lg bg-red-50 p-2.5 text-[12.5px] font-medium text-red-800">
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-press inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2563eb] py-3 px-5 text-[14px] font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-60 shadow-sm"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Scheduling audit…
                      </>
                    ) : (
                      <>
                        Request Free {industry.name} Audit
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Instant WhatsApp Option & On-Page Switcher */}
                <div className="mt-4 pt-3 border-t border-[#0b0e0d]/8 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[12.5px]">
                  <a
                    href={getWhatsAppUrl(whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-[#2563eb] hover:underline"
                  >
                    <MessageSquare className="h-3.5 w-3.5 text-[#2563eb]" />
                    Instant WhatsApp Discussion →
                  </a>

                  {onJumpToFullForm && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onJumpToFullForm(industry);
                      }}
                      className="text-[#0b0e0d]/60 hover:text-[#0b0e0d] underline underline-offset-2"
                    >
                      Fill on main page instead
                    </button>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#0b0e0d]/50">
                  <Shield className="h-3 w-3 text-[#2563eb]" />
                  <span>Strict NDA • Zero sales spam • 100% free workflow review</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
