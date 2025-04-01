// src/components/ThirdSection/index.tsx
"use client";

import { montaguSlab } from "@/app/GoogleFonts";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import bruno_pellizzetti from "public/bruno_pellizzetti.png"
import eduardo_walber from "public/eduardo_walber.png"
import joao_prado from "public/joao_prado.png"
import fundo_1 from "public/fundo_1.png"

const ThirdSection = () => {
  const controls = useAnimation();

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        staggerChildren: 0.2,
      },
    },
  };

  const cards = [
    {
      id: 1,
      image: bruno_pellizzetti,
      title: "Bruno Pellizzetti",
      slug: "bruno-pellizzetti",
    },
    {
      id: 2,
      image: eduardo_walber,
      title: "Eduardo Walber",
      slug: "eduardo-walber",
    },
    {
      id: 3,
      image: joao_prado,
      title: "João Prado",
      slug: "joao-prado",
    },
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
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
    <section className="relative" id="especialistas">
      <Image
        width={592}
        height={360}
        src={fundo_1}
        alt="Previdência especialistas"
        className="absolute inset-0 w-full h-[350px] 2xl:h-[500px] object-cover -z-10"
        loading="lazy"
        placeholder="blur"
      />

      <h2 className={`text-white text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-semibold text-center p-4 ${montaguSlab.className}`}>
        Advogados especializados em direito previdenciário
      </h2>

      <motion.div
        className="container mx-auto flex flex-col sm:flex-row flex-wrap gap-5 items-center justify-center mt-12 md:mt-20 2xl:mt-56 pb-4 sm:pb-24 cursor-pointer px-5 lg:px-10"
        variants={containerAnimation}
        initial="hidden"
        animate={controls}
        ref={ref}
      >
        {cards.map((card) => (
          <Link
            key={card.id}
            className="flex flex-col justify-center items-center gap-6 backdrop-filter backdrop-blur-lg rounded-lg px-6 py-8 md:py-14 relative cursor-pointer transition-all duration-300 ease-in-out hover:shadow-2xl w-full sm:w-[230px] md:w-[300px] 2xl:w-[400px] h-[300px] md:h-[300px] 2xl:h-[380px] shadow-xl"
            href={`/advogado/${card.slug}`}
            aria-label={`sobre ${card.title}`}
          >
            <Image
              width={192}
              height={192}
              src={card.image}
              alt={`card.title Advogado Previdenciário Cascavel`}
              className="w-48 sm:w-36 md:w-44 2xl:w-56 rounded-full"
              loading="lazy"
              placeholder="blur"
            />
            <div className="text-center">
              <h3 className={`text-[#012B09] text-lg md:text-xl 2xl:text-3xl font-medium ${montaguSlab.className}`}>
                {card.title}
              </h3>
              <span className="text-sm md:text-base 2xl:text-lg text-[#012B09]">
                Advogado Previdenciário
              </span>
            </div>
          </Link>
        ))}
      </motion.div>
    </section>
  );
};

export default ThirdSection;
