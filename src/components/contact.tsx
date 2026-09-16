"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { Loader2, TriangleAlert, ArrowRight } from "lucide-react";
import { contactSchema, submitAuditRequest, type ContactInput } from "@/lib/validation";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { cn, SITE } from "@/lib/utils";

const LottieAnimation = dynamic(() => import("./lottie-animation"), { ssr: false });

const industries = ["Distributors & Wholesalers", "Real Estate", "Coaching & Education", "Manufacturing", "Logistics", "Professional Services", "Other"];
const sizes = ["1–10", "11–50", "51–200", "200+"];

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
      <label htmlFor={htmlFor} className="text-[13.5px] font-medium text-[#0b0e0d]">
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
    "w-full rounded-xl border bg-white px-4 py-3 text-[14.5px] text-[#0b0e0d] placeholder:text-[#0b0e0d]/35 transition-colors",
    bad ? "border-red-500" : "border-[#0b0e0d]/15 hover:border-[#0b0e0d]/30 focus:border-[#0e7c5b]"
  );

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

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
    <section id="contact" aria-labelledby="contact-h" className="scroll-mt-20 border-t border-[#0b0e0d]/8">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div>
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
              <li key={k} className="rounded-2xl border border-[#0b0e0d]/10 bg-white p-4">
                <p className="text-[14px] font-semibold">{k}</p>
                <p className="mt-1 text-[14px] text-[#0b0e0d]/60">{v}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-[12.5px] text-[#0b0e0d]/50">
            Prefer email? <a className="underline underline-offset-4" href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </div>

        <Reveal delay={0.08}>
          <div className="rounded-[1.75rem] border border-[#0b0e0d]/10 bg-white p-6 card-shadow md:p-8">
            {status === "ok" ? (
              <div className="grid min-h-[480px] place-items-center text-center" role="status">
                <div>
                  <LottieAnimation name="success" className="mx-auto h-24 w-24" />
                  <h3 className="mt-4 text-xl font-semibold">Request received.</h3>
                  <p className="mx-auto mt-2 max-w-[42ch] text-[14.5px] text-[#0b0e0d]/60">
                    Thanks — we’ll reply within one business day to schedule your automation audit.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setErrorMessage("");
                    }}
                    className="btn-press mt-6 rounded-full border border-[#0b0e0d]/15 px-6 py-3 text-[14px] font-medium hover:border-[#0b0e0d]/35"
                  >
                    Send another request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4 sm:grid-cols-2">
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

                <Field label="Name" error={errors.name?.message} htmlFor="f-name">
                  <input id="f-name" autoComplete="name" placeholder="Aarav Sharma" className={inputCls(errors.name?.message)} {...register("name")} />
                </Field>
                <Field label="Business name" error={errors.businessName?.message} htmlFor="f-biz">
                  <input id="f-biz" autoComplete="organization" placeholder="Sharma Estates" className={inputCls(errors.businessName?.message)} {...register("businessName")} />
                </Field>
                <Field label="Work email" error={errors.email?.message} htmlFor="f-email">
                  <input id="f-email" type="email" autoComplete="email" placeholder="you@company.com" className={inputCls(errors.email?.message)} {...register("email")} />
                </Field>
                <Field label="Phone" error={errors.phone?.message} htmlFor="f-phone">
                  <input id="f-phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" className={inputCls(errors.phone?.message)} {...register("phone")} />
                </Field>
                <Field label="Industry" error={errors.industry?.message} htmlFor="f-ind">
                  <select id="f-ind" className={inputCls(errors.industry?.message)} defaultValue="" {...register("industry")}>
                    <option value="" disabled>Select…</option>
                    {industries.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </Field>
                <Field label="Company size" error={errors.companySize?.message} htmlFor="f-size">
                  <select id="f-size" className={inputCls(errors.companySize?.message)} defaultValue="" {...register("companySize")}>
                    <option value="" disabled>Select…</option>
                    {sizes.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <div className="sm:col-span-2">
                  <Field label="What process do you want to automate?" error={errors.process?.message} htmlFor="f-process">
                    <textarea id="f-process" rows={3} placeholder="e.g. All site-visit enquiries come on WhatsApp and we lose track of follow-ups…" className={inputCls(errors.process?.message)} {...register("process")} />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Current tools (optional)" htmlFor="f-tools">
                    <input id="f-tools" placeholder="e.g. WhatsApp, Excel, Tally" className={inputCls(undefined)} {...register("tools")} />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Anything else? (optional)" htmlFor="f-msg">
                    <textarea id="f-msg" rows={2} placeholder="Timings, volumes, deadlines…" className={inputCls(undefined)} {...register("message")} />
                  </Field>
                </div>
                {status === "error" && (
                  <p className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-[13.5px] font-medium text-red-800 sm:col-span-2" role="alert">
                    <TriangleAlert className="h-4 w-4 shrink-0" aria-hidden />
                    {errorMessage || "Something went wrong. Please try again or email us directly."}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-press group inline-flex items-center justify-center gap-2 rounded-full bg-[#0b0e0d] py-2.5 pl-6 pr-2.5 text-[15px] font-medium text-white hover:bg-[#1a201e] disabled:opacity-70 sm:col-span-2"
                >
                  {status === "sending" ? (
                    <><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…</>
                  ) : (
                    <>Request Automation Audit
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </span>
                    </>
                  )}
                </button>
                <p className="text-center font-mono text-[11.5px] text-[#0b0e0d]/45 sm:col-span-2">
                  No spam. Your details are used only to schedule the audit.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
