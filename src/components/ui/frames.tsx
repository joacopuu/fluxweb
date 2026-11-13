import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Marco de navegador propio: una barra fina con el dominio y un punto con el
 * acento de la piel. Sin semáforos ni dispositivos de stock.
 */
export function BrowserFrame({
  host,
  children,
  className,
}: {
  host: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-[14px] border border-line bg-raise", className)}>
      <div className="flex h-8 items-center gap-2.5 border-b border-line px-3.5">
        <span className="h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
        <span className="t-mono truncate text-muted">{host}</span>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

/** Marco de teléfono propio: un rectángulo redondeado con borde fino. */
export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[clamp(1rem,2.2vw,1.75rem)] border border-line-strong bg-raise p-[clamp(3px,0.5vw,6px)] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)]",
        className,
      )}
    >
      <div className="relative aspect-[9/16.5] overflow-hidden rounded-[clamp(0.8rem,1.8vw,1.4rem)]">
        {children}
      </div>
    </div>
  );
}
