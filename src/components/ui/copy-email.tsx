"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/** Copia el email al portapapeles y lo confirma en el mismo botón y por `aria-live`. */
export function CopyEmail({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      // Sin permiso de portapapeles: se abre el cliente de correo.
      window.location.href = `mailto:${site.email}`;
      return;
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2400);
  };

  return (
    <span className={cn("inline-flex flex-wrap items-center gap-x-4 gap-y-2", className)}>
      <a href={`mailto:${site.email}`} className="link link-on break-all">
        {site.email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line-strong px-3 text-[0.8125rem] transition-[transform,border-color] duration-150 hover:border-ink active:scale-[0.97]"
      >
        <span key={copied ? "ok" : "copy"} className="swap-in inline-flex items-center gap-1.5">
          {copied ? (
            <Check className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <Copy className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
          )}
          {copied ? "Copiado" : "Copiar"}
        </span>
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Copiado. Pegalo donde quieras." : ""}
      </span>
    </span>
  );
}
