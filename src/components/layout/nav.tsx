"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, site } from "@/config/site";
import { Mark, WhatsAppGlyph } from "@/components/brand/mark";
import { WaLink } from "@/components/ui/wa-link";
import { cn } from "@/lib/utils";

/**
 * Navegación. Se esconde al bajar y vuelve al subir. En mobile, el menú ocupa
 * toda la pantalla. El botón de WhatsApp arma el mensaje según la sección.
 */
export function Nav() {
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (Math.abs(delta) < 6) return;
      setSolid(y > 24);
      setHidden(delta > 0 && y > 160);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    menuRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-[480ms] ease-ui",
          "border-b border-transparent",
          solid && !open && "border-line bg-bg",
          hidden && !open && "-translate-y-full",
        )}
      >
        <div className="wrap flex h-[var(--nav-h)] items-center justify-between gap-6">
          <Link
            href="/"
            onClick={close}
            className="flex items-center gap-2.5 text-ink"
            aria-label="FluxWeb, ir al inicio"
            aria-current={pathname === "/" ? "page" : undefined}
          >
            <Mark className="h-7 w-auto text-accent" />
            <span className="font-display text-[1.375rem] font-medium tracking-[-0.02em]">FluxWeb</span>
          </Link>

          <nav aria-label="Secciones del sitio" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-[0.9375rem]">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <WaLink
              context="auto"
              className="btn btn-primary !min-h-11 !px-4 max-lg:!w-11 max-lg:!px-0"
              aria-label="Escribinos por WhatsApp"
            >
              <WhatsAppGlyph className="h-[1.125rem] w-[1.125rem]" />
              <span className="max-lg:hidden">WhatsApp</span>
            </WaLink>
            <button
              ref={toggleRef}
              type="button"
              className="btn btn-ghost !min-h-11 !px-4 lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Cerrar" : "Menú"}
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu-mobile"
        ref={menuRef}
        inert={!open}
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-bg pt-[var(--nav-h)] transition-[clip-path,visibility] duration-[480ms] ease-move lg:hidden",
          open ? "visible [clip-path:inset(0_0_0_0)]" : "invisible [clip-path:inset(0_0_100%_0)]",
        )}
      >
        <nav aria-label="Menú" className="wrap flex flex-1 flex-col justify-center">
          <ul className="flex flex-col gap-1">
            {navLinks.map((item, i) => (
              <li key={item.href} className="overflow-hidden">
                <Link
                  href={item.href}
                  onClick={close}
                  className={cn(
                    "block py-1 font-display text-[clamp(2.75rem,13vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.03em]",
                    "transition-transform duration-[700ms] ease-expo motion-reduce:transition-none",
                    open ? "translate-y-0" : "translate-y-full",
                  )}
                  style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="wrap flex flex-col gap-3 border-t border-line py-6 text-[0.9375rem] text-muted">
          <a href={`mailto:${site.email}`} className="text-ink">
            {site.email}
          </a>
          <div className="flex items-center justify-between">
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
              Instagram {site.instagram.handle}
            </a>
            <span>Córdoba, Argentina</span>
          </div>
        </div>
      </div>
    </>
  );
}
