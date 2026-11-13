import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { Portal } from "@/components/sections/portal";
import { WorkChapters, WorkIntro, WorkOutro } from "@/components/sections/work";
import { Studio } from "@/components/sections/studio";
import { Contact } from "@/components/sections/contact";
import { cases } from "@/content/cases";

// Las secciones interactivas van cada una en su trozo. Se renderizan igual en
// el servidor, pero el navegador las hidrata por separado y en tareas cortas,
// en lugar de una sola tarea larga al cargar.
const Services = dynamic(() => import("@/components/sections/services").then((m) => m.Services));
const Audiences = dynamic(() => import("@/components/sections/audiences").then((m) => m.Audiences));
const Process = dynamic(() => import("@/components/sections/process").then((m) => m.Process));
const Faq = dynamic(() => import("@/components/sections/faq").then((m) => m.Faq));

export default function Home() {
  return (
    <main id="contenido">
      <Hero />
      <Portal>
        <WorkIntro />
      </Portal>
      <WorkChapters />
      <WorkOutro hasCase={cases.some((item) => item.slug === "fluxweb")} />
      <Services />
      <Audiences />
      <Process />
      <Studio />
      <Faq />
      <Contact />
    </main>
  );
}
