// src/app/blog/layout.tsx
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pellizzetti Walber & Associados - Blog",
  description: "Advogados Especializados em Direito Previdenciário. Mais de 15 anos de Excelência em Defender o Direito do Beneficiário!",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">{children}</div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
}
