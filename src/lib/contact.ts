import { z } from "zod";

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/** Un email, o un teléfono con al menos ocho dígitos. */
export function isContact(value: string) {
  const v = value.trim();
  if (EMAIL.test(v)) return true;
  return /^[+\d\s().-]+$/.test(v) && v.replace(/\D/g, "").length >= 8;
}

export function isEmail(value: string) {
  return EMAIL.test(value.trim());
}

/** Lo que envía el formulario de contacto. Lo validan el cliente y la ruta. */
export const briefSchema = z.object({
  needs: z.array(z.string().trim().min(1).max(60)).min(1).max(10),
  stage: z.string().trim().min(1).max(60),
  problem: z.string().trim().min(5).max(1500),
  when: z.string().trim().min(1).max(60),
  name: z.string().trim().min(2).max(80),
  contact: z.string().trim().max(120).refine(isContact),
  /** Campo trampa: las personas no lo ven, los bots lo completan. */
  website: z.string().max(200).optional().default(""),
  /** Milisegundos desde que se abrió el formulario. */
  elapsed: z.number().int().nonnegative(),
});

export type Brief = z.infer<typeof briefSchema>;

/** Menos que esto entre abrir y enviar no es una persona. */
export const MIN_ELAPSED_MS = 4000;
