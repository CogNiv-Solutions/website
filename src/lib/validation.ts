import { z } from "zod";
import { automationInterests } from "./data";

export const contactSchema = z.object({
  interests: z
    .array(z.string().trim().min(1).max(60))
    .min(1, "Select at least one area")
    .max(automationInterests.length, "Too many areas selected")
    .refine(
      (areas) => areas.every((a) => automationInterests.includes(a)),
      "Select from the listed areas"
    ),
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(100, "Name is too long (max 100 characters)"),
  businessName: z
    .string()
    .trim()
    .min(2, "Please enter your business name")
    .max(150, "Business name is too long (max 150 characters)"),
  email: z
    .string()
    .trim()
    .email("Enter a valid work email")
    .max(254, "Email is too long (max 254 characters)"),
  phone: z
    .string()
    .trim()
    .min(6, "Enter a valid phone number")
    .max(30, "Phone number is too long (max 30 characters)"),
  _hp: z
    .string()
    .max(100, "Invalid field")
    .optional(),
});

export const serverAuditSchema = contactSchema.strict();

export type ContactInput = z.infer<typeof contactSchema>;

export type SubmitAuditResult = {
  ok: boolean;
  status: number;
  error?: string;
};

export async function submitAuditRequest(data: ContactInput): Promise<SubmitAuditResult> {
  try {
    const response = await fetch("/api/audit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        error: result?.error ?? "Unable to process request",
      };
    }

    return {
      ok: true,
      status: response.status,
    };
  } catch {
    return {
      ok: false,
      status: 0,
      error: "Unable to process request",
    };
  }
}
