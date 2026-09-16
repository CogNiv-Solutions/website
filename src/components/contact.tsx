"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { Loader2, TriangleAlert, ArrowRight, CheckCircle2, MessageSquare, Calendar, Mail, Phone, Sparkles } from "lucide-react";
import { contactSchema, submitAuditRequest, type ContactInput } from "@/lib/validation";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { cn, SITE, getWhatsAppUrl } from "@/lib/utils";

const LottieAnimation = dynamic(() => import("./lottie-animation"), { ssr: false });

const automationOptions = [
  "Lead Management",
  "WhatsApp",
  "Data Entry",
  "Documents",
  "Follow-ups",
  "Internal Operations",
  "Other",
];

function Field({
  label,
  error,
  children,
  htmlFor,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  htmlFor: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-[13px] font-medium text-[#0b0e0d]">
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-[12px] font-medium text-red-600" role="alert">{error}</p>
      ) : null}
    </div>
  );
}

const inputCls = (bad?: string) =>
  cn(
    "w-full rounded-xl border bg-white px-4 py-3 text-[14.5px] text-[#0b0e0d] placeholder:text-[#0b0e0d]/35 transition-colors",
    bad ? "border-red-500" : "border-[#0b0e0d]/15 hover:border-[#0b0e0d]/30 focus:border-[#2563eb]"
  );

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["Lead Management"]);
  const [activeWorkflow, setActiveWorkflow] = useState<{ name: string; example: string } | null>(null);
  const [highlighted, setHighlighted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      automationType: ["Lead Management"],
    },
  });

  useEffect(() => {
    const handleCustomAudit = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail) return;
      setActiveWorkflow({ name: detail.name, example: detail.example });
      if (Array.isArray(detail.types) && detail.types.length > 0) {
        setSelectedTypes(detail.types);
        setValue("automationType", detail.types);
      }
      setValue("industry", detail.name);
      setValue("process", `[${detail.name} Workflow Audit] ${detail.example}`);
      setHighlighted(true);
      setTimeout(() => setHighlighted(false), 2400);
    };

    window.addEventListener("cogniv:audit-workflow", handleCustomAudit);
    return () => window.removeEventListener("cogniv:audit-workflow", handleCustomAudit);
  }, [setValue]);

  const toggleType = (opt: string) => {
    let next: string[];
    if (selectedTypes.includes(opt)) {
      next = selectedTypes.filter((t) => t !== opt);
      if (next.length === 0) next = [opt]; // Keep at least one
    } else {
      next = [...selectedTypes, opt];
    }
    setSelectedTypes(next);
    setValue("automationType", next);
  };

  const onSubmit = async (data: ContactInput) => {
    setStatus("sending");
    setErrorMessage("");
    try {
      const payload: ContactInput = {
        ...data,
        automationType: selectedTypes,
        industry: activeWorkflow?.name || data.industry || undefined,
        process: activeWorkflow
          ? `[${activeWorkflow.name} Workflow Audit] ${activeWorkflow.example} (Automate: ${selectedTypes.join(", ")})`
          : `Automate: ${selectedTypes.join(", ")}`,
      };
      const res = await submitAuditRequest(payload);
      if (res.ok) {
        setStatus("ok");
        reset();
      } else {
        setStatus("error");
        if (res.status === 429) {
          setErrorMessage("Too many requests. Please wait a few minutes and try again.");
        } else if (res.status === 400) {
          setErrorMessage("Please check your information and try again.");
        } else {
          setErrorMessage("Something went wrong. Please try again or message us on WhatsApp.");
        }
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or message us on WhatsApp.");
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-h" className="scroll-mt-20 border-t border-[#0b0e0d]/8">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:px-8 md:py-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
        {/* Final CTA Info (Page 11-12 in PDF) */}
        <div>
          <SectionHeading
            eyebrow="Take Action"
            title={<span id="contact-h">What’s slowing your business down?</span>}
            copy="Tell us what your team does manually every day. We’ll identify what can be automated — and what shouldn’t be."
          />

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#2563eb]/20 bg-[#eff6ff] px-3.5 py-1 text-[12.5px] font-medium text-[#1d4ed8]">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#2563eb]" aria-hidden />
            30-minute workflow review • No obligation
          </div>

          <div className="mt-5 space-y-2.5">
            <div className="flex items-center justify-between rounded-xl border border-[#0b0e0d]/10 bg-white p-3.5">
              <span className="flex items-center gap-2.5 text-[13.5px] font-medium text-[#0b0e0d]">
                <MessageSquare className="h-4 w-4 text-[#2563eb]" aria-hidden />
                Prefer immediate chat?
              </span>
              <a
                href={getWhatsAppUrl("Hi Cogniv, I'd like to book a free Automation Audit for my business.")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#2563eb] underline underline-offset-4 hover:text-[#1d4ed8] text-[13.5px]"
              >
                Chat on WhatsApp
              </a>
            </div>

            {SITE.calendarUrl ? (
              <div className="flex items-center justify-between rounded-xl border border-[#0b0e0d]/10 bg-white p-3.5">
                <span className="flex items-center gap-2.5 text-[13.5px] font-medium text-[#0b0e0d]">
                  <Calendar className="h-4 w-4 text-[#2563eb]" aria-hidden />
                  Book directly on calendar?
                </span>
                <a
                  href={SITE.calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#0b0e0d] underline underline-offset-4 hover:text-[#2563eb] text-[13.5px]"
                >
                  Book 20-min Slot
                </a>
              </div>
            ) : (
              <div className="flex items-center justify-between rounded-xl border border-[#0b0e0d]/10 bg-white p-3.5">
                <span className="flex items-center gap-2.5 text-[13.5px] font-medium text-[#0b0e0d]">
                  <Phone className="h-4 w-4 text-[#2563eb]" aria-hidden />
                  Call us directly
                </span>
                <a
                  href={`tel:${SITE.phone.replace(/\s+/g, "")}`}
                  className="font-mono text-[13px] font-semibold text-[#0b0e0d] hover:text-[#2563eb]"
                >
                  {SITE.phone}
                </a>
              </div>
            )}

            <div className="flex items-center justify-between rounded-xl border border-[#0b0e0d]/10 bg-white p-3.5">
              <span className="flex items-center gap-2.5 text-[13.5px] font-medium text-[#0b0e0d]">
                <Mail className="h-4 w-4 text-[#0b0e0d]/50" aria-hidden />
                Direct inquiry
              </span>
              <a
                href={`mailto:${SITE.email}`}
                className="font-mono text-[12.5px] text-[#0b0e0d]/70 underline underline-offset-4 hover:text-[#2563eb]"
              >
                {SITE.email}
              </a>
            </div>
          </div>

          <p className="mt-5 text-[13.5px] text-[#0b0e0d]/60">
            Want to see real workflows first?{" "}
            <a href="/demo" className="font-semibold text-[#2563eb] underline underline-offset-4 hover:text-[#1d4ed8]">
              See Live Workflow Demos
            </a>
          </p>
        </div>

        {/* Audit Form (Page 12-13 in PDF) */}
        <Reveal delay={0.08}>
          <div
            className={cn(
              "rounded-[1.5rem] border bg-white p-5 card-shadow md:p-7 transition-all duration-500",
              highlighted ? "border-[#2563eb] ring-4 ring-[#2563eb]/20 shadow-xl" : "border-[#0b0e0d]/10"
            )}
          >
            {status === "ok" ? (
              <div className="grid min-h-[420px] place-items-center text-center" role="status">
                <div>
                  <LottieAnimation name="success" className="mx-auto h-20 w-20" />
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight">Audit request received.</h3>
                  <p className="mx-auto mt-2 max-w-[38ch] text-[14.5px] leading-relaxed text-[#0b0e0d]/65">
                    Thank you! We’ll review your business workflows and reach out within 1 business day to schedule your audit.
                  </p>
                  <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    {SITE.calendarUrl ? (
                      <a
                        href={SITE.calendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-press rounded-full bg-[#2563eb] px-6 py-3 text-[14px] font-semibold text-white hover:bg-[#1d4ed8]"
                      >
                        Book immediate calendar slot
                      </a>
                    ) : (
                      <a
                        href={getWhatsAppUrl("Hi Cogniv, I just submitted an Automation Audit request on your website and would like to confirm.")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-press rounded-full bg-[#2563eb] px-6 py-3 text-[14px] font-semibold text-white hover:bg-[#1d4ed8]"
                      >
                        💬 Confirm on WhatsApp
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setStatus("idle");
                        setErrorMessage("");
                      }}
                      className="btn-press rounded-full border border-[#0b0e0d]/15 px-6 py-3 text-[14px] font-medium hover:border-[#0b0e0d]/35"
                    >
                      Submit another
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                {/* Honeypot anti-spam field */}
                <div style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden="true">
                  <label htmlFor="f-hp">Leave this field blank</label>
                  <input
                    id="f-hp"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register("_hp")}
                  />
                </div>

                {/* Active Workflow Banner */}
                {activeWorkflow && (
                  <div className="flex items-center justify-between rounded-2xl border border-[#2563eb]/30 bg-[#eff6ff] p-3.5 text-[13px] text-[#1d4ed8]">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-white text-[#2563eb] shadow-2xs font-bold text-[13px]">
                        🎯
                      </span>
                      <div>
                        <p className="font-semibold text-[#1d4ed8]">
                          Auditing: {activeWorkflow.name} Workflow
                        </p>
                        <p className="font-mono text-[11px] text-[#2563eb]/80 leading-snug">
                          {activeWorkflow.example}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveWorkflow(null);
                        setValue("industry", "");
                        setValue("process", "");
                      }}
                      className="btn-press ml-2 shrink-0 rounded-lg px-2.5 py-1 text-[11.5px] font-semibold text-[#1d4ed8] hover:bg-white transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                )}

                {/* Question 1: What would you like to automate? (Interactive chips) */}
                <div>
                  <label className="block text-[14px] font-semibold text-[#0b0e0d]">
                    What would you like to automate?
                  </label>
                  <p className="mt-0.5 text-[12.5px] text-[#0b0e0d]/50">
                    Select one or more areas you want to streamline:
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {automationOptions.map((opt) => {
                      const active = selectedTypes.includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => toggleType(opt)}
                          className={cn(
                            "btn-press rounded-full px-3.5 py-2 text-[13px] font-medium transition-all",
                            active
                              ? "border border-[#2563eb] bg-[#eff6ff] text-[#1d4ed8] shadow-xs"
                              : "border border-[#0b0e0d]/12 bg-white text-[#0b0e0d]/70 hover:border-[#0b0e0d]/30 hover:text-[#0b0e0d]"
                          )}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4 Low-Friction Details Fields (Page 13 in PDF) */}
                <div className="grid gap-4 sm:grid-cols-2 pt-2">
                  <Field label="Name" error={errors.name?.message} htmlFor="f-name">
                    <input
                      id="f-name"
                      autoComplete="name"
                      placeholder="e.g. Rahul Mehta"
                      className={inputCls(errors.name?.message)}
                      {...register("name")}
                    />
                  </Field>

                  <Field label="Business Name" error={errors.businessName?.message} htmlFor="f-biz">
                    <input
                      id="f-biz"
                      autoComplete="organization"
                      placeholder="e.g. Apex Logistics"
                      className={inputCls(errors.businessName?.message)}
                      {...register("businessName")}
                    />
                  </Field>

                  <Field label="Work Email" error={errors.email?.message} htmlFor="f-email">
                    <input
                      id="f-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      className={inputCls(errors.email?.message)}
                      {...register("email")}
                    />
                  </Field>

                  <Field label="Phone Number" error={errors.phone?.message} htmlFor="f-phone">
                    <input
                      id="f-phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                      className={inputCls(errors.phone?.message)}
                      {...register("phone")}
                    />
                  </Field>
                </div>

                {status === "error" && (
                  <p className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-[13.5px] font-medium text-red-800" role="alert">
                    <TriangleAlert className="h-4 w-4 shrink-0" aria-hidden />
                    {errorMessage || "Something went wrong. Please try again or message us on WhatsApp."}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-press group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2563eb] py-3.5 px-6 text-[15px] font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-70 shadow-sm"
                >
                  {status === "sending" ? (
                    <><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Booking audit…</>
                  ) : (
                    <>
                      {activeWorkflow ? `Request Free ${activeWorkflow.name} Audit` : "Book a Free Automation Audit"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </>
                  )}
                </button>

                <div className="pt-1 text-center">
                  <p className="font-mono text-[11px] text-[#0b0e0d]/50">
                    🔒 Strict NDA & Privacy Guarantee · Zero sales spam · 30-min workflow mapping
                  </p>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
