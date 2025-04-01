// src/app/advogado/[slug]/page.tsx
import Footer from "@/components/Footer";
import Lawyers from "@/components/Lawyers";

interface AdvogadoProps {
  params: {
    slug: string;
  };
}

export default function Advogado({ params }: AdvogadoProps) {
  return (
    <div>
      <Lawyers slug={params.slug} />
      <Footer />
    </div>
  );
}
