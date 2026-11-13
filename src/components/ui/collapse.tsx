import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Panel que se abre animando su altura con grid-template-rows (0fr a 1fr),
 * sin medir nada en JavaScript. Cerrado queda inerte: no se tabula adentro.
 */
export function Collapse({
  open,
  id,
  labelledBy,
  children,
  className,
}: {
  open: boolean;
  id: string;
  labelledBy?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      id={id}
      role="region"
      aria-labelledby={labelledBy}
      inert={!open}
      className={cn(
        "grid transition-[grid-template-rows,opacity] duration-[320ms] ease-ui motion-reduce:transition-none",
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
    >
      <div className={cn("min-h-0 overflow-hidden", className)}>{children}</div>
    </div>
  );
}
