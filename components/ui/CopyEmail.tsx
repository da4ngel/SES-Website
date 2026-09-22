"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";

/** Email link + a small copy button. Copying confirms with a toast (the only feedback a copy has). */
export function CopyEmail({ email, className }: { email: string; className?: string }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      toast.success("Email copied", { description: email, id: "copy-email" });
    } catch {
      toast.error("Couldn't copy. Select the address instead.", { id: "copy-email" });
    }
  };
  return (
    <span className={className}>
      <a href={`mailto:${email}`} className="break-all hover:text-accent">
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${email}`}
        className="pressable ml-2 inline-grid size-8 place-items-center rounded-full align-middle text-text-2 hover:bg-surface-2 hover:text-text"
      >
        <Copy className="size-4" strokeWidth={1.5} aria-hidden="true" />
      </button>
    </span>
  );
}
