// src/app/advogado-previdenciario-cascavel/page.tsx
import Footer from "@/components/Footer";
import Lawyers from "@/components/Lawyers";

export const generateMetadata = () => {
  const host = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pellizzetti.adv.br";
  const canonicalUrl = `${host}/advogado/bruno-pellizzetti`;

  return {
    title: "Advogado Bruno Pellizzetti",
    description: "Página do advogado Bruno Pellizzetti, especialista em Direito.",
    alternates: {
      canonical: canonicalUrl,
    },
  };
};

const AdvogadoBruno = () => (
    <div>
      <Lawyers slug="bruno-pellizzetti" />
      <Footer />
    </div>

  );


export default AdvogadoBruno;