// src/components/SixthSection/index.tsx
"use client";

import { FiArrowRight } from "react-icons/fi";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { montaguSlab } from "@/app/GoogleFonts";

const SixthSection = () => {
  const controls = useAnimation();

  const cardAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [controls, inView]);

  return (
    <section className="relative bg-[#012B09] w-full py-12 2xl:py-20" id="youtubeSection">
      <div className="semi_circle top-0 left-1/2"></div>
      <div className="semi_circle_inverted bottom-0 left-0"></div>
      <div className="container mx-auto relative z-10 flex flex-col gap-10 2xl:gap-20 px-5 lg:px-10">
        <div className="flex flex-col items-center gap-5 text-center">
          <div>
            <p className={`text-xl 2xl:text-3xl text-white ${montaguSlab.className} font-normal`}>
              Em nosso canal no Youtube você encontra
            </p>
            <p className={`text-xl 2xl:text-3xl text-white ${montaguSlab.className} font-normal`}>
              diversos conteúdos sobre direito previdenciário.
            </p>
          </div>
          <a
            className={`
            [&:hover>*]:!text-white hover:!animate-bg-darken-red [&:hover>*]:!animate-bg-darken-red [&>*]:animate-color-red-to-white
              animate-bg-white-to-red py-2 px-4 w-56 h-10 lg:w-72 lg:h-14 flex items-center justify-center rounded-md text-lg 2xl:text-xl ${montaguSlab.className} font-normal`}
            href="https://www.youtube.com/@brunopellizzetti"
            target="_blank"
            rel="noreferrer"
            title="Canal do Bruno Pellizzetti"
          >
            <span className="flex items-center gap-2">
              Acessar Canal
              <FiArrowRight size={24} className="lg:w-8 lg:h-8" />
            </span>
          </a>
        </div>
        <motion.div
          className="flex justify-center gap-5 px-8 overflow-x-auto h-full w-full"
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={cardAnimation}
          style={{ flexDirection: "row", flexWrap: "wrap" }}
        >
          {[
            {
              id: "Cz8jLZBAaDI",
              title: "4 Armadilhas que Podem Atrapalhar sua Aposentadoria: Descubra o que o INSS não te contou!",
            },
            {
              id: "xjppMIaFD4w",
              title: "Desvendando a Nova Aposentadoria: 3 Regras de Transição que VOCÊ Precisa Conhecer no INSS",
            },
            {
              id: "8zXWT4ppdMM",
              title: "4 Armadilhas que Podem Atrapalhar sua Aposentadoria: Descubra o que o INSS não te contou!",
            },
          ].map(video => (
            <div key={video.id} className="flex flex-col max-w-xs gap-5 w-full lg:w-1/3">
              <LiteYouTubeEmbed webp
                id={video.id}
                adNetwork
                
                title="Aposentadoria"
                noCookie
              />
              <p className={`text-center ${montaguSlab.className} text-lg 2xl:text-xl text-white`}>
                {video.title}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SixthSection;
