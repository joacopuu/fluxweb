import { Hero } from "@/components/sections/hero";
import { Portal } from "@/components/sections/portal";
import { WorkChapters, WorkIntro, WorkOutro } from "@/components/sections/work";
import { Services } from "@/components/sections/services";
import { Audiences } from "@/components/sections/audiences";
import { Process } from "@/components/sections/process";
import { Studio } from "@/components/sections/studio";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { cases } from "@/content/cases";

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
