// src/app/dashboard/layout.tsx
"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import FifthSection from "@/components/SeventhSection";
import Footer from "@/components/Footer";
import { Header } from "@/components/HeaderDashboard";

import Fundo1 from "public/fundo_1.png"
import Aposentadoria from "public/aposentadoria.jpg"
import bruno_pellizzetti from "public/bruno_pellizzetti.png"
import eduardo_walber from "public/eduardo_walber.png"
import joao_prado from "public/joao_prado.png"



interface FAQ {
  question: string;
  answer: string;
}

import { IoLogoWhatsapp, IoTimeOutline, IoShieldCheckmarkOutline, IoPeopleOutline, IoHeartOutline, IoSyncOutline, IoBookOutline, IoEllipsisHorizontalOutline, IoStar } from "react-icons/io5";
import { useState } from "react";
import { montaguSlab } from "../GoogleFonts";
import Link from "next/link";
import { NavColor } from "@/hooks/types";
const Dashboard = () => {

  // Whatsapp
  const handleClick = () => {
    window.open("https://api.whatsapp.com/send?phone=5545991313858&text=Ol%C3%A1%2C%20visitei%20seu%20site%20e%20gostaria%20de%20obter%20mais%20informa%C3%A7%C3%B5es%20sobre%20minha%20aposentadoria.", "_blank");
  };

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

  const reviews = [
    {
      name: "Ketlyn Maria",
      comment:
        "Ótimo atendimento, serviço de qualidade e foram esclarecedores com relação às minhas dúvidas.",
      rating: 5,
    },
    {
      name: "Lucas Pereira",
      comment:
        "Eu fui muito bem atendido e amparado. Foi tudo bem esclarecido entre ambas as partes.",
      rating: 5,
    },
    {
      name: "Irno Masceno",
      comment:
        "Advogados nota 10, do princípio ao fim não tive nenhuma preocupação. E o mais importante: causa ganha! Parabéns a toda equipe do escritório!",
      rating: 5,
    },
    {
      name: "Juliano Ortmeier",
      comment:
        "Muito bom o escritório, advogados excelentes, muito atenciosos, sempre tive contato direto a qualquer dia e horário, nunca me deixaram na mão!",
      rating: 5,
    },
    {
      name: "Fabricia Naomi",
      comment:
        "Ótimo atendimento e agilidade com os serviços prestados. Estamos muito satisfeitos com os resultados obtidos.",
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "Como é feita a revisão de valores da aposentadoria?",
      answer: "Com a revisão é possível corrigir possíveis enganos no cálculo inicial. Pode envolver desde a inclusão de períodos não considerados, bem como reanálise da base de cálculo ou ajustes em virtude da legislação."
    },
    {
      question: "Quais são os principais benefícios do INSS que o escritório transita no Direito Previdenciário?",
      answer: "NO Direito Previdenciário, englobamos uma gama de benefícios, como Auxílio-doença, Auxílio-acidente, Aposentadoria por Idade, Aposentadoria por Invalidez, Aposentadoria por Tempo, Aposentadoria Especial, Aposentadoria para Pessoas com Deficiência, Pensão Por Morte, dentre outros."
    },
    {
      question: "Vale a pena fazer um Planejamento Previdenciário?",
      answer: "Com certeza, isso porque o Planejamento Previdenciário visa garantir a melhor forma de aposentadoria possível para quem nos procura."
    },
    {
      question: "Entrei com solicitação de Aposentadoria Especial, mas o INSS me concedeu a Aposentadoria Comum com um valor abaixo do esperado. Posso fazer a revisão da minha aposentadoria?",
      answer: "Sim. Só porque o INSS já concedeu a aposentadoria comum não o impede de solicitar a Revisão de Aposentadoria para o regime especial."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <main>
            <Header positionColorRelation={{
          0: NavColor.dark,
          13: NavColor.light,
          34: NavColor.dark,
          42: NavColor.light,
          52: NavColor.dark,
          63: NavColor.light,
          65: NavColor.dark,
          78: NavColor.light,
        }} />
      <div className="relative min-h-screen flex items-center justify-center bg-[#4c6751]" id="home">
        <div className="relative z-40 text-center p-4 bg-[rgba(255,255,255,0.3)] rounded-lg flex flex-col justify-center items-center">
          <h1 className={`font-[500] text-white text-[42px] md:text-[44px] 2xl:text-[60px] ${montaguSlab.className} leading-[60px] mb-4`}>
            Advogados Especialistas em Direito Previdenciário
          </h1>

          <div className={`text-white text-[20px] font-[400] ${montaguSlab.className} leading-[40px] mb-4`}>
            <p>Te ajudamos a garantir uma vida tranquila com o direito à aposentadoria.</p>
          </div>
          <button
            className="animate-bg-white-to-green py-2 px-6 w-auto rounded-md flex text-base md:text-lg text-orange-95 [&>*]:animate-color-green-to-white 
font-bold [&:hover>*]:!text-white hover:!animate-bg-darken-dark-green [&:hover>*]:!animate-bg-darken-dark-green  mt-6 items-center"
            onClick={handleClick}
          >
            <IoLogoWhatsapp alignmentBaseline="central" size={24} className="mr-2" />
            <span>
            FALE CONOSCO
            </span>
          </button>
        </div>
      </div>

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
          loading="lazy"
          width={501}
          height={350}
          src={Fundo1}
          alt=""
          className="absolute inset-0 w-full h-[350px] 2xl:h-[500px] object-cover z-0"
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
                loading="lazy"
                width={176}
                height={176}
                src={card.image}
                alt={card.title}
                className="w-48 sm:w-36 md:w-44 2xl:w-56 rounded-full"
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

      <div className="bg-[#CBD4C9] relative" id="solucoes">
        <Image
        placeholder="blur"
          loading="lazy"
          src={Aposentadoria}
          alt="Aposentadoria e INSS"
          fill
          className="object-cover object-center z-0"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto flex flex-col gap-[40px] justify-center items-center pb-[48px] px-[20px] lg:px-[42px] relative z-10">
          <h3 className={`font-[500] ${montaguSlab.className} text-[42px] 2xl:text-[60px] pt-[64px] text-center text-white`}>
            Soluções eficientes em qualquer estágio da sua aposentadoria
          </h3>
          <p className={`${montaguSlab.className} font-[400] text-[20px] 2xl:text-[30px] text-center text-white`}>
            Sabemos que o momento da aposentadoria pode ser desafiador, trazendo
            muitas dúvidas e ser realmente estressante. São muitas regras a
            serem consideradas e estamos preparados para entender seu problema.
          </p>
          <button
            className="animate-bg-white-to-green py-2 px-6 w-auto rounded-md flex text-base md:text-lg text-orange-95 [&>*]:animate-color-green-to-white 
font-bold [&:hover>*]:!text-white hover:!animate-bg-darken-dark-green [&:hover>*]:!animate-bg-darken-dark-green  mt-6 items-center"
            onClick={handleClick}
          >
            <IoLogoWhatsapp alignmentBaseline="central" size={24} className="mr-2" />
            <span>
            FALE CONOSCO
            </span>
          </button>
          <div className="pt-[8px]">
            <Image
              loading="lazy"
              src="/arrow.svg"
              alt=""
              width={34}
              height={34}
              className="2xl:w-[67px] 2xl:h-[67px]"
            />
          </div>
        </div>
      </div>

      <section className="relative bg-[#4c6751] w-full py-[45px] 2xl:py-[90px]" id="avaliacoes">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Avaliações dos Clientes</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                className="p-4 md:p-5 space-y-3 text-sm dark:text-gray-600 bg-white rounded-md"
                initial="hidden"
              >
                <div className="flex items-center space-x-3">
                  <IoPeopleOutline className="w-10 h-10 text-gray-500" />
                  <div>
                    <h4 className="font-bold text-sm">{review.name}</h4>
                    <span className="text-xs text-gray-600">2 days ago</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 mt-2 text-yellow-700">
                  <IoStar className="w-4 h-4 fill-current text-yellow-500" />
                  <span className="text-base font-bold">{review.rating}</span>
                </div>
                <p className="mt-2 text-sm">{review.comment}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#4c6751] w-full py-[45px] 2xl:py-[90px]" id="faqs">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Perguntas Frequentes</h2>
          <div className="grid grid-cols-1 gap-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="cursor-pointer flex items-center justify-between p-6 bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
                  onClick={() => toggleIndex(index)}
                >
                  <h2 className="text-lg font-semibold text-gray-900">{faq.question}</h2>
                  <span className={`transition-transform duration-300 transform ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}>
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </span>
                </div>
                {openIndex === index && (
                  <div className="p-6 bg-gray-50">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="animate-bg-white-to-green py-2 px-6 w-auto rounded-md flex text-base md:text-lg text-orange-95 [&>*]:animate-color-green-to-white 
font-bold [&:hover>*]:!text-white hover:!animate-bg-darken-dark-green [&:hover>*]:!animate-bg-darken-dark-green  items-center"
              onClick={handleClick}
            >
              <IoLogoWhatsapp alignmentBaseline="central" size={24} className="mr-2" />
              <span>
              FALE CONOSCO
              </span>
            </button>
          </div>
        </div>
      </section>

      <FifthSection />
      <Footer />
    </main>
  );
};

export default Dashboard;
