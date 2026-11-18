import { HomeMotion } from "@/components/motion/home-motion";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Expertise } from "@/components/sections/expertise";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";

export default function Home() {
  return (
    <HomeMotion>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Expertise />
      <Contact />
    </HomeMotion>
  );
}
