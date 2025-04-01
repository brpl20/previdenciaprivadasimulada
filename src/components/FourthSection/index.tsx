// src/components/FourthSection/index.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { montaguSlab } from "@/app/GoogleFonts";

const FourthSection = () => {
  const controls = useAnimation();

  const [selectedCard, setSelectedCard] = useState<number>(1);

  const cards = [
    {
      id: 1,
      title: "Cogitação",
      subtitle:
        "Nesta fase há uma dificuldade em entender o que é previdência, para quem serve, como pagar.",
    },
    {
      id: 2,
      title: "Planejamento",
      subtitle:
        "Nessa etapa percebe-se a importância de contribuir para a previdência.",
    },
    {
      id: 3,
      title: "Decisões",
      subtitle:
        "Avançando no processo de aposentadoria, muitas vezes é difícil tomar decisões sobre os caminhos a serem seguidos na previdência.",
    },
    {
      id: 4,
      title: "Pedido",
      subtitle:
        "Nessa etapa o cliente já está pronto para realizar o pedido, porém tem algumas dificuldades em saber qual caminho traçar e quais soluções podem lhe ajudar.",
    },
    {
      id: 5,
      title: "Indeferimento",
      subtitle:
        "O pedido já foi feito, porém indeferido, há alguma situação que está impedindo o reconhecimento de aposentadoria.",
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
    <section className="relative flex sm:flex-row flex-col items-center justify-center my-[68px]">
      <div className="absolute w-[30px] h-full bg-[#4C6751] left-[-12px] rounded-[100px] z-40 hidden sm:flex"></div>
      <div className="container mx-auto px-[20px] lg:px-[42px] mb-[50px] overflow-x-auto hidden sm:block">
        <div className="w-full flex flex-col gap-[22px]">
          <ol className="flex items-center w-full">
            {cards.map((card) => (
              <li
                className={`before:content-[''] before:w-[100px] after:w-[100px] lg:before:w-[100px] 2xl:before:w-full before:border-b before:border-[#728F6B] before:border-[2px] before:inline-block flex w-full items-center text-[#728F6B] after:content-[''] lg:after:w-[100px] 2xl:after:w-full after:border-b after:border-[#728F6B] after:border-[2px] after:inline-block`}
                key={card.id}
              >
                <span
                  className={`text-[#012B09] font-[500] text-[20px] flex items-center justify-center w-[42px] h-[42px] bg-[#728F6B] rounded-full shrink-0`}
                >
                  {card.id}
                </span>
              </li>
            ))}
          </ol>
          <div className="flex gap-[10px] justify-between relative mb-[20px]">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`flex flex-col gap-[16px] bg-white min-w-[230px] 2xl:min-w-[350px] h-[330px] 2xl:h-[600px] rounded-[4px] drop-shadow-md px-[16px] cursor-pointer transition-all duration-300 ease-in-out`}
              >
                <span className={`font-[500] ${montaguSlab.className} text-[22px] 2xl:text-[30px] text-[#000000DE] border-b border-b-[#8E8E8E] py-[16px]`}>
                  {card.title}
                </span>
                <p className={`${montaguSlab.className} font-[500] text-[14px] 2xl:text-[24px] text-[#000000CC]`}>
                  {card.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="sm:hidden space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-emerald-500 before:to-transparent">
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-[#F9E5C5] group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              <span className="text-gray-600 font-bold">{card.id}</span>
            </div>
            <div className="w-[calc(100%-4rem)] bg-white p-6 rounded border border-slate-200 shadow mr-4">
              <div className="flex items-center justify-between space-x-2 mb-1">
                <div className="font-bold text-slate-900">{card.title}</div>
              </div>
              <div className="text-slate-500">{card.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FourthSection;