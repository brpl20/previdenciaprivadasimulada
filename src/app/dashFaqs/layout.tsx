// src/app/dashFaqs/layout.tsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io5";

const DashFaqs = () => {

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleClick = () => {
    window.open("https://api.whatsapp.com/send?phone=5545991313858&text=Ol%C3%A1%2C%20visitei%20seu%20site%20e%20gostaria%20de%20obter%20mais%20informa%C3%A7%C3%B5es%20sobre%20minha%20aposentadoria.", "_blank");
  };

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

  return (
    <main>

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
font-bold hover:!animate-bg-darken-dark-green [&:hover>*]:!animate-bg-darken-dark-green  [&:hover>*]:!text-white transition-all duration-300 items-center"
              onClick={handleClick}
            >
              <IoLogoWhatsapp alignmentBaseline="central" size={24} className="mr-2" />
              <span>FALE CONOSCO</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashFaqs;
