// src/app/dashAvalations/layout.tsx
"use client";
import { motion } from "framer-motion";
import { IoPeopleOutline, IoStar } from "react-icons/io5";

const DashAvaliations = () => {

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

  return (
    <main>

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
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-sm">{review.name}</h4>
                    <IoStar className="w-4 h-4 fill-current text-yellow-500" />
                    <span className="text-base font-bold">{review.rating}</span>
                  </div>
                </div>
                <p className="mt-2 text-sm">{review.comment}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashAvaliations;
