// src/app/advogado/[slug]/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advogados Previdenciários em Cascavel - PR.",
  description: "Consulte Já os Melhores Advogados Especialistas em Direito Previdenciário! Atendemos todo o Brasil online. Aposentadoria e INSS.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
