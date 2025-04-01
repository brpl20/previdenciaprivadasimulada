// src/app/dashService/layout.tsx
"use client";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";

interface FAQ {
  question: string;
  answer: string;
}

import { IoLogoWhatsapp, IoTimeOutline, IoShieldCheckmarkOutline, IoPeopleOutline, IoHeartOutline, IoSyncOutline, IoBookOutline, IoEllipsisHorizontalOutline, IoStar } from "react-icons/io5";
import { montaguSlab } from "../GoogleFonts";
import Link from "next/link";

import fundo_1 from "public/fundo_1.png"
import advogado_fundo from "public/advogado_fundo.png"
import bruno_pellizzetti from "public/bruno_pellizzetti.png"
import eduardo_walber from "public/eduardo_walber.png"
import joao_prado from "public/joao_prado.png"

const DashService = () => {


  // Serviços
  const services = [
    { title: 'Auxílio acidente', description: 'Nosso atendimento é rápido e eficiente, ajudando você a garantir o benefício de auxílio acidente.', icon: IoLogoWhatsapp },
    { title: 'Aposentadoria por tempo', description: 'Apoiamos você no processo de aposentadoria por tempo, garantindo todos os seus direitos.', icon: IoTimeOutline },
    { title: 'Aposentadoria por invalidez', description: 'Orientamos você para obter a aposentadoria por invalidez com rapidez e eficiência.', icon: IoShieldCheckmarkOutline },
    { title: 'Pensão por morte', description: 'Auxiliamos no processo de obtenção de pensão por morte, garantindo um atendimento ágil e eficiente.', icon: IoPeopleOutline },
    { title: 'Aposentadoria PCD', description: 'Especialistas em direito previdenciário para a obtenção da aposentadoria PCD.', icon: IoHeartOutline },
    { title: 'Revisão de aposentadoria', description: 'Revisamos sua aposentadoria para garantir que você está recebendo todos os benefícios a que tem direito.', icon: IoSyncOutline },
    { title: 'Estudo previdenciário', description: 'Realizamos estudos previdenciários detalhados para garantir o melhor benefício para você.', icon: IoBookOutline },
    { title: 'E muito mais', description: 'Descubra todos os serviços que oferecemos para garantir seus direitos previdenciários.', icon: IoEllipsisHorizontalOutline },
  ];

  const stats = [
    { id: 1, number: "+ 15", label: "anos" },
    { id: 2, number: "+ 4 mil", label: "benefícios" },
    { id: 3, number: "+ 7 mil", label: "atendimentos" },
  ];

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

  return (
    <main>

      <div className="relative flex flex-col items-center justify-center bg-[#4c6751] py-12" id="servicos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white text-center mb-8">Nossos serviços</h2>
          <p className="text-xl text-white text-center mb-12">Entenda como um corpo técnico de advogados especialistas em direito previdenciário pode te beneficiar:</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6 flex items-start">
                <service.icon className="h-12 w-12 text-blue-500 mr-4" /> {/* Ícones maiores */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col items-center mt-10">
          <div className="w-full flex flex-row flex-wrap gap-[40px] justify-center text-center mt-10">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col items-center">
                <span className="text-[#ffff] font-bold text-[24px] sm:text-[36px]">{stat.number}</span>
                <span className="text-[#012B09] text-[16px] sm:text-[20px]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="relative bg-[#4c6751]" id="especialistas">
        <Image
          placeholder="blur"
          width={501}
          height={350}
          src={fundo_1}
          alt=""
          className="absolute inset-0 w-full h-[350px] 2xl:h-[500px] object-cover z-0"
          loading="lazy"
        />

        <h2 className={`text-white text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-semibold text-center p-4 ${montaguSlab.className} z-20 relative`}>
          Quem estará ao seu lado?
        </h2>
        <motion.div
          className="container mx-auto flex flex-col sm:flex-row flex-wrap gap-5 items-center justify-center mt-12 md:mt-20 2xl:mt-56 pb-4 sm:pb-24 cursor-pointer px-5 lg:px-10 relative z-20"
          initial="hidden"
        >
          {cards.map((card) => (
            <Link
              key={card.id}
              className="flex flex-col justify-center items-center gap-6 backdrop-filter backdrop-blur-lg rounded-lg px-6 py-8 md:py-14 relative cursor-pointer transition-all duration-300 ease-in-out hover:shadow-2xl w-full sm:w-[230px] md:w-[300px] 2xl:w-[400px] h-[300px] md:h-[300px] 2xl:h-[380px] shadow-xl"
              href={`/advogado/${card.slug}`}
              aria-label={`Sobre ${card.title}`} 
            >
              <Image
                placeholder="blur"
                width={192}
                height={192}
                src={card.image}
                alt={card.title}
                className="w-48 sm:w-36 md:w-44 2xl:w-56 rounded-full"
                loading="lazy"
              />
              <div className="text-center">
                <h3 className={`text-[#fff] text-lg md:text-xl 2xl:text-3xl font-medium ${montaguSlab.className}`}>
                  {card.title}
                </h3>
                <span className="text-sm md:text-base 2xl:text-lg text-[#fff]">
                  Advogado Previdenciário
                </span>
              </div>
            </Link>
          ))}
        </motion.div>
      </section>
    </main>
  );
};

export default DashService;
