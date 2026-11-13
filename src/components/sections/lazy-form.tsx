"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";

/**
 * Carga el formulario (y Motion, que solo se usa ahí) cuando el contacto se
 * acerca a la pantalla. Así no pesa en la carga inicial.
 */
export function LazyForm() {
  const ref = useRef<HTMLDivElement>(null);
  const [Form, setForm] = useState<ComponentType | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        import("./contact-form").then((mod) => setForm(() => mod.ContactForm));
      },
      { rootMargin: "120% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="min-h-[30rem]">
      {Form ? <Form /> : null}
    </div>
  );
}
