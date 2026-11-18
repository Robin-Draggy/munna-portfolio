import { HomeMotion } from "@/components/motion/home-motion";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Expertise } from "@/components/sections/expertise";
import { Hero } from "@/components/sections/hero";
import { SelectedWork } from "@/components/sections/selected-work";

export default function Home() {
  return (
    <HomeMotion>
      <Hero />
      <SelectedWork />
      <Experience />
      <Expertise />
      <Contact />
    </HomeMotion>
  );
}
