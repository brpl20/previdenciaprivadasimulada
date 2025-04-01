// src/components/SeventhSection/index.tsx
"use client";

import { montaguSlab } from "@/app/GoogleFonts";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import quem_somos from '../../../public/quem_somos.png'

const SeventhSection = () => {
  const controls = useAnimation();

  const textAnimation = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    if (!inView) {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <section className="flex max-w-[1920px] mx-auto relative" id="quem_somos">
      <div className="w-full relative">
      <div className="absolute inset-0">
  <Image
    src={quem_somos}
    alt="Advogados Previdenciários INSS Benefício Aposentadoria"
    fill
    className="object-cover object-center z-0"
    loading="lazy"
    placeholder="blur"
  />
  <div className="absolute inset-0 bg-black opacity-50"></div>
</div>

        <motion.div
          className="relative flex flex-col items-center gap-[20px] 2xl:gap-[40px] p-[20px] h-auto justify-center"
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={textAnimation}
        >
          <h2 className={`${montaguSlab.className} font-[500] text-[42px] 2xl:text-[60px] text-white text-center`}>
            Quem Somos?
          </h2>
          <span
            className={`w-full md:max-w-[600px] ${montaguSlab.className} text-[14px] lg:text-[18px] 2xl:text-[26px] font-[300] text-white`}
            style={{ textAlign: 'justify' }}
          >
            <p>Uma equipe em constante aprendizado buscando as melhores práticas do
              Direito Previdenciário, tanto na área do Regime Geral de Previdência
              (INSS) quanto nos diversos Regimes Próprios de Previdência (RPPS) na
              esfera Federal, Estadual e Municipal.</p>
            <p>Nosso objetivo é proporcionar
              sempre o melhor benefício para o cliente, estudando os trâmites e
              entendimentos Administrativos e Judiciais, realizando o planejamento
              Previdenciário Completo. </p>
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default SeventhSection;
