// src/components/FifthSection/index.tsx
"use client";

import { motion, useAnimation } from "framer-motion";
import { FiUser, FiStar } from "react-icons/fi";

const FifthSection = () => {
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

  const controls = useAnimation();

  return (
    <section className="relative bg-[#012B09] w-full py-[45px] 2xl:py-[90px]">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Avaliações dos Clientes</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="p-3 space-y-2 text-sm dark:text-gray-600 bg-white rounded-md"
              initial="hidden"
              animate={controls}
            >
              <div className="flex items-center space-x-3">
                <FiUser className="w-10 h-10 text-gray-500" />
                <div>
                  <h3 className="font-bold text-sm">{review.name}</h3>
                  <span className="text-xs text-gray-600">2 days ago</span>
                </div>
              </div>
              <div className="flex items-center space-x-1 mt-2 text-yellow-700">
                <FiStar className="w-4 h-4 fill-current text-yellow-500" />
                <span className="text-base font-bold">{review.rating}</span>
              </div>
              <p className="mt-2 text-sm">{review.comment}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FifthSection;