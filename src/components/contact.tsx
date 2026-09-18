"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { Loader2, TriangleAlert, ArrowRight, Check } from "lucide-react";
import { contactSchema, submitAuditRequest, type ContactInput } from "@/lib/validation";
import { automationInterests } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { cn, SITE, getWhatsAppUrl } from "@/lib/utils";

const LottieAnimation = dynamic(() => import("./lottie-animation"), { ssr: false });

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
      <label htmlFor={htmlFor} className="text-[13.5px] font-medium text-[#0b0b0c]">
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-[12.5px] font-medium text-red-700" role="alert">{error}</p>
      ) : null}
    </div>
  );
}

const inputCls = (bad?: string) =>
  cn(
    "w-full rounded-xl border bg-white px-4 py-3 text-[14.5px] text-[#0b0b0c] placeholder:text-[#0b0b0c]/35 transition-colors",
    bad ? "border-red-500" : "border-[#0b0b0c]/20 hover:border-[#0b0b0c]/40 focus:border-[#ff6a00]"
  );

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { interests: [] },
  });

  const selected = useWatch({ control, name: "interests" }) ?? [];

  const toggleInterest = (area: string) => {
    const next = selected.includes(area)
      ? selected.filter((a) => a !== area)
      : [...selected, area];
    setValue("interests", next, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = async (data: ContactInput) => {
    setStatus("sending");
    setErrorMessage("");
    try {
      const res = await submitAuditRequest(data);
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
          setErrorMessage("Something went wrong. Please try again or email us directly.");
        }
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or email us directly.");
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-h" className="scroll-mt-20 border-t border-[#0b0b0c]/10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div className="min-w-0">
          <SectionHeading
            eyebrow="Request audit"
            title={<span id="contact-h">Tell us how your business works.</span>}
            copy="A focused 30-minute review of one workflow. You leave with a map of what to automate first — whether or not we build it."
          />
          <ul className="mt-7 space-y-3">
            {[
              ["What you get", "One workflow mapped + automation candidates ranked by effort and return."],
              ["What we need", "Access to one process owner and a look at the tools you use today."],
              ["No pressure", "If nothing is worth automating yet, we tell you that plainly."],
            ].map(([k, v]) => (
              <li key={k} className="rounded-2xl border border-[#0b0b0c]/10 bg-white p-4">
                <p className="text-[14px] font-semibold">{k}</p>
                <p className="mt-1 text-[14px] text-[#0b0b0c]/60">{v}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-2 rounded-2xl border border-[#0b0b0c]/10 bg-white p-4">
            <p className="text-[13px] text-[#0b0b0c]/80 flex items-center justify-between">
              <span>💬 Want to talk right now?</span>
              <a
                href={getWhatsAppUrl("Hi Cogniv, I'd like to schedule a Free Workflow Audit for my business.")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#a84300] underline underline-offset-4 hover:text-[#7a3400]"
              >
                Chat on WhatsApp
              </a>
            </p>
            <p className="text-[13px] text-[#0b0b0c]/80 flex items-center justify-between pt-2 border-t border-[#0b0b0c]/10">
              <span>📅 Prefer a direct calendar slot?</span>
              <a
                href={SITE.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#0b0b0c] underline underline-offset-4 hover:text-[#a84300]"
              >
                Book 20-min Call
              </a>
            </p>
            <p className="font-mono text-[12px] text-[#0b0b0c]/50 pt-1">
              Prefer email? <a className="underline underline-offset-4" href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </div>
        </div>

        <div className="min-w-0">
          <Reveal delay={0.08} className="h-full">
          <div className="rounded-[1.25rem] border border-[#0b0b0c]/10 bg-white p-6 card-shadow md:p-8">
            {status === "ok" ? (
              <div className="grid min-h-[480px] place-items-center text-center" role="status">
                <div>
                  <LottieAnimation name="success" className="mx-auto h-24 w-24" />
                  <h3 className="mt-4 text-xl font-semibold">Request received.</h3>
                  <p className="mx-auto mt-2 max-w-[42ch] text-[14.5px] text-[#0b0b0c]/60">
                    Thanks — we’ll reply within one business day to schedule your automation audit.
                  </p>
                  <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <a
                      href={SITE.calendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-press rounded-full bg-[#0b0b0c] px-6 py-3 text-[14px] font-medium text-white hover:bg-[#1c1c1e]"
                    >
                      📅 Pick a calendar slot now
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setStatus("idle");
                        setErrorMessage("");
                      }}
                      className="btn-press rounded-full border border-[#0b0b0c]/20 px-6 py-3 text-[14px] font-medium hover:border-[#0b0b0c]/45"
                    >
                      Send another request
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative grid gap-5 sm:grid-cols-2">
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

                <fieldset className="sm:col-span-2">
                  <legend className="text-[13.5px] font-medium text-[#0b0b0c]">
                    What would you like to automate?
                  </legend>
                  <div className="mt-2.5 flex flex-wrap gap-2" role="group" aria-label="Areas to automate">
                    {automationInterests.map((area) => {
                      const on = selected.includes(area);
                      return (
                        <button
                          key={area}
                          type="button"
                          onClick={() => toggleInterest(area)}
                          aria-pressed={on}
                          className={cn(
                            "btn-press inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-[13.5px] font-medium transition-colors",
                            on
                              ? "border-[#c24e00] bg-[#c24e00] text-white"
                              : "border-[#0b0b0c]/20 bg-white text-[#0b0b0c]/70 hover:border-[#0b0b0c]/45 hover:text-[#0b0b0c]"
                          )}
                        >
                          {on && <Check className="h-3.5 w-3.5" aria-hidden />}
                          {area}
                        </button>
                      );
                    })}
                  </div>
                  {errors.interests ? (
                    <p className="mt-2 text-[12.5px] font-medium text-red-700" role="alert">{errors.interests.message}</p>
                  ) : null}
                </fieldset>

                <Field label="Name" error={errors.name?.message} htmlFor="f-name">
                  <input id="f-name" autoComplete="name" placeholder="Aarav Sharma" className={inputCls(errors.name?.message)} {...register("name")} />
                </Field>
                <Field label="Business name" error={errors.businessName?.message} htmlFor="f-biz">
                  <input id="f-biz" autoComplete="organization" placeholder="Sharma Estates" className={inputCls(errors.businessName?.message)} {...register("businessName")} />
                </Field>
                <Field label="Work email" error={errors.email?.message} htmlFor="f-email">
                  <input id="f-email" type="email" autoComplete="email" placeholder="you@company.com" className={inputCls(errors.email?.message)} {...register("email")} />
                </Field>
                <Field label="Phone number" error={errors.phone?.message} htmlFor="f-phone">
                  <input id="f-phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" className={inputCls(errors.phone?.message)} {...register("phone")} />
                </Field>
                {status === "error" && (
                  <p className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-[13.5px] font-medium text-red-800 sm:col-span-2" role="alert">
                    <TriangleAlert className="h-4 w-4 shrink-0" aria-hidden />
                    {errorMessage || "Something went wrong. Please try again or email us directly."}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-press group inline-flex items-center justify-center gap-2 rounded-full bg-[#0b0b0c] py-2.5 pl-6 pr-2.5 text-[15px] font-medium text-white hover:bg-[#1c1c1e] disabled:opacity-70 sm:col-span-2"
                >
                  {status === "sending" ? (
                    <><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…</>
                  ) : (
                    <>Request Free Workflow Audit
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </span>
                    </>
                  )}
                </button>
                <div className="flex flex-col items-center gap-1 sm:col-span-2">
                  <p className="text-center font-mono text-[11.5px] text-[#0b0b0c]/55">
                    Handled confidentially · No sales spam · Reply within one business day
                  </p>
                  <p className="text-center font-mono text-[10.5px] text-[#0b0b0c]/40">
                    Your details are used only to prepare and schedule your audit.
                  </p>
                </div>
              </form>
            )}
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
