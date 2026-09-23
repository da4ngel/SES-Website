"use client";

import Link from "next/link";
import { useId, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import type { FieldDef, FormSchema } from "@/content/forms";
import { formErrors } from "@/content/forms";
import { ease, spring } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";

type Values = Record<string, string | boolean>;

function initialValues(fields: FieldDef[]): Values {
  return Object.fromEntries(fields.map((f) => [f.name, f.type === "checkbox" ? false : ""]));
}

function validateField(f: FieldDef, v: string | boolean): string | undefined {
  if (f.type === "checkbox") return f.required && !v ? formErrors.consent : undefined;
  const s = String(v).trim();
  if (!s) return f.required ? (f.type === "select" || f.type === "chips" ? formErrors.choose : formErrors.required) : undefined;
  if (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s)) return formErrors.email;
  if (f.type === "tel" && s.replace(/\D/g, "").length < 10) return formErrors.phone;
  return undefined;
}

// Optional prefill from the URL, e.g. /contact/?interest=pilot selects "Pilot Program".
const noopSubscribe = () => () => {};

const HONEYPOT_FIELD = "website";

/**
 * ============================================================================
 * TODO(backend): this is a stub. No submission currently reaches anywhere.
 * Wire this to a real form service, CRM or API before launch. `formId` tells
 * the backend which form this is (contact / pilot / ses-pro). Example:
 *
 *   const res = await fetch(process.env.NEXT_PUBLIC_FORM_ENDPOINT!, {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ formId, ...values }),
 *   });
 *   if (!res.ok) throw new Error(`Form submission failed: ${res.status}`);
 * ============================================================================
 */
async function submitLead(formId: string, values: Values): Promise<void> {
  void formId;
  void values;
  if (process.env.NODE_ENV !== "production") {
    console.warn("[Form] submitLead is a stub — no backend is configured. See the TODO(backend) comment above submitLead().");
  }
  await new Promise((r) => setTimeout(r, 600));
}

/**
 * Schema-driven lead form (content/forms.ts).
 * Validation is inline: a field is checked when you leave it, then live as you fix it.
 * On submit, focus jumps to the first invalid field. Success replaces the form in place.
 */
export function Form({ schema }: { schema: FormSchema }) {
  const prefillParam = schema.prefill?.param;
  const prefill = useSyncExternalStore(
    noopSubscribe,
    () => {
      if (!schema.prefill || !prefillParam) return "";
      const p = new URLSearchParams(window.location.search).get(prefillParam);
      return (p && schema.prefill.map[p]) || "";
    },
    () => "",
  );
  const [values, setValues] = useState<Values>(() => initialValues(schema.fields));
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  // Spam trap: real visitors never see or fill this field. A filled value means a bot.
  const [honeypot, setHoneypot] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  const current: Values = { ...values };
  if (schema.prefill && prefill && !values[schema.prefill.field]) current[schema.prefill.field] = prefill;

  const errors = Object.fromEntries(schema.fields.map((f) => [f.name, validateField(f, current[f.name])]));
  const show = (name: string) => (touched[name] ? errors[name] : undefined);
  const set = (name: string, v: string | boolean) => setValues((prev) => ({ ...prev, [name]: v }));
  const blur = (name: string) => setTouched((t) => ({ ...t, [name]: true }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      // Silently drop bot submissions: show the same success state, send nothing.
      setStatus("sent");
      return;
    }
    setTouched(Object.fromEntries(schema.fields.map((f) => [f.name, true])));
    const firstBad = schema.fields.find((f) => errors[f.name]);
    if (firstBad) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstBad.name}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      await submitLead(schema.id, current);
      setStatus("sent");
      trackEvent("generate_lead", { form_id: schema.id });
    } catch {
      setStatus("idle");
      // Network failure: the form keeps its values; a toast explains what to do.
      toast.error(formErrors.network, { id: `${schema.id}-error` });
    }
  };

  const reset = () => {
    setValues(initialValues(schema.fields));
    setTouched({});
    setStatus("idle");
  };

  return (
    <div aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <m.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: spring.ui }}
            exit={{ opacity: 0, transition: { duration: 0.15, ease: ease.out } }}
            onAnimationStart={() => {
              if (status !== "sent") return;
              // The success card is shorter than the form: bring it into view and move focus to it.
              successRef.current?.focus({ preventScroll: true });
              successRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
            }}
            className="flex min-h-[24rem] flex-col items-center justify-center text-center"
          >
            <m.span
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ ...spring.ui, delay: 0.08 }}
              className="grid size-16 place-items-center rounded-full bg-accent-soft text-accent"
            >
              <CheckCircle2 className="size-8" strokeWidth={1.5} aria-hidden="true" />
            </m.span>
            <h3 ref={successRef} tabIndex={-1} className="text-headline mt-6 text-text outline-none">
              {schema.success.headline}
            </h3>
            <p className="text-body mt-3 max-w-[26rem] text-text-2">{schema.success.line}</p>
            <Button variant="ghost" className="mt-6" onClick={reset}>
              {schema.success.again}
            </Button>
          </m.div>
        ) : (
          <m.form
            key="form"
            ref={formRef}
            method="post"
            // noValidate suppresses the browser's own error bubbles in favor of the inline
            // errors below; `required`/`aria-required` on each field still matter for
            // accessibility (and as an honest signal to autofill/AT), even though real
            // empty-submission protection has to happen server-side regardless.
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2, ease: ease.out } }}
            exit={{ opacity: 0, transition: { duration: 0.15, ease: ease.out } }}
            className="grid gap-5 sm:grid-cols-2"
          >
            {/* Spam trap: hidden from sighted/AT users via off-screen positioning (not
                display:none), which basic bots still fill in because they parse the DOM. */}
            <div aria-hidden="true" className="absolute -left-[9999px] top-auto size-px overflow-hidden">
              <label htmlFor={`${schema.id}-website`}>Leave this field empty</label>
              <input
                id={`${schema.id}-website`}
                type="text"
                name={HONEYPOT_FIELD}
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            {schema.fields.map((f) => (
              <Field
                key={f.name}
                def={f}
                value={current[f.name]}
                error={show(f.name)}
                onChange={(v) => set(f.name, v)}
                onBlur={() => blur(f.name)}
              />
            ))}
            <div className="sm:col-span-2">
              <Button type="submit" size="lg" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : schema.submitLabel}
              </Button>
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}

const chevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2386868b' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`;

function inputClass(invalid: boolean) {
  return cn(
    // 17px text: at or above 16px, so iOS never zooms into the field
    "block h-12 w-full rounded-sm-card bg-surface px-4 text-[1.0625rem] text-text ring-1 ring-inset outline-none transition-shadow placeholder:text-text-2/70",
    "focus-visible:ring-2 focus-visible:outline-none",
    invalid ? "ring-danger focus-visible:ring-danger" : "ring-hairline focus-visible:ring-accent",
  );
}

function Field({
  def: f,
  value,
  error,
  onChange,
  onBlur,
}: {
  def: FieldDef;
  value: string | boolean;
  error?: string;
  onChange: (v: string | boolean) => void;
  onBlur: () => void;
}) {
  const id = useId();
  const errId = `${id}-error`;
  const aria = { "aria-invalid": !!error, "aria-describedby": error ? errId : undefined, "aria-required": !!f.required };
  const span = f.half ? "" : "sm:col-span-2";

  if (f.type === "checkbox") {
    return (
      <div className="sm:col-span-2">
        <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
          <input
            id={id}
            type="checkbox"
            name={f.name}
            checked={!!value}
            required={f.required}
            onChange={(e) => {
              onChange(e.target.checked);
              onBlur();
            }}
            {...aria}
            className="mt-0.5 size-5 shrink-0 accent-[var(--accent-fill)]"
          />
          <span className="text-caption text-text-2">
            {f.label}{" "}
            <Link href="/privacy/" className="text-accent underline underline-offset-4">
              Privacy policy
            </Link>
            .
          </span>
        </label>
        <ErrorText id={errId} message={error} />
      </div>
    );
  }

  if (f.type === "chips") {
    // Single-choice pills. Native radios underneath: arrow keys and screen readers just work.
    return (
      <fieldset className="sm:col-span-2" aria-describedby={error ? errId : undefined}>
        <legend className="text-caption mb-3 block font-medium text-text">{f.label}</legend>
        <div className="flex flex-wrap gap-2">
          {f.options?.map((o) => (
            <label key={o} className="pressable cursor-pointer">
              <input
                type="radio"
                name={f.name}
                value={o}
                checked={value === o}
                required={f.required}
                onChange={() => onChange(o)}
                onBlur={onBlur}
                className="peer sr-only"
              />
              <span className="block rounded-full bg-surface px-4 py-2 text-caption font-medium text-text ring-1 ring-inset ring-hairline transition-colors peer-checked:bg-text peer-checked:text-bg peer-checked:ring-text peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                {o}
              </span>
            </label>
          ))}
        </div>
        <ErrorText id={errId} message={error} />
      </fieldset>
    );
  }

  return (
    <div className={span}>
      <label htmlFor={id} className="text-caption mb-2 block font-medium text-text">
        {f.label}
        {!f.required && <span className="font-normal text-text-2"> (optional)</span>}
      </label>
      {f.type === "select" ? (
        <select
          id={id}
          name={f.name}
          value={String(value)}
          required={f.required}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          {...aria}
          className={cn(inputClass(!!error), "appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10", !value && "text-text-2")}
          style={{ backgroundImage: chevron }}
        >
          <option value="" disabled>
            Choose one
          </option>
          {f.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : f.type === "textarea" ? (
        <textarea
          id={id}
          name={f.name}
          rows={4}
          value={String(value)}
          placeholder={f.placeholder}
          required={f.required}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          {...aria}
          className={cn(inputClass(!!error), "h-auto resize-y py-3")}
        />
      ) : (
        <input
          id={id}
          name={f.name}
          type={f.type}
          inputMode={f.type === "email" ? "email" : f.type === "tel" ? "tel" : undefined}
          autoComplete={f.autoComplete}
          enterKeyHint="next"
          value={String(value)}
          placeholder={f.placeholder}
          required={f.required}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          {...aria}
          className={inputClass(!!error)}
        />
      )}
      <ErrorText id={errId} message={error} />
    </div>
  );
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-caption mt-2 flex items-center gap-1.5 text-danger">
      <AlertCircle className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
      {message}
    </p>
  );
}
