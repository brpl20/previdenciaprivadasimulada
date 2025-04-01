// src/app/advogado/[slug]/page.tsx
import Footer from "@/components/Footer";
import Lawyers from "@/components/Lawyers";

const Advogado = ({ params: { slug } }: { params: { slug: string } }) => {
  return (
    <div>
      <Lawyers slug={slug} />
      <Footer />
    </div>
  );
};

export default Advogado;
