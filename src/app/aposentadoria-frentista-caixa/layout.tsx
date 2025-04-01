// src/app/aposentadoria-frentista-caixa/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advogado para Aposentadoria especial do Frentista e Caixa de Postos de Combustíveis",
  description:
    "Se você trabalha em um posto de combustível como frentista ou caixa, sabe que essa é uma ocupação que envolve alguns riscos. Os funcionários de posto de gasolina estão em constante exposição a agentes de alta periculosidade e a ambientes insalubres. Com isso surge, a dúvida quem trabalha no posto de combustível têm direito a aposentadoria especial? Nesse vídeo eu respondo sua dúvida sobre a aposentadoria especial para frentista, chefe de pista, caixa, gerente e outros funcionários de posto de combustível.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <div>{children}</div>
      </div>
    </>
  );
}
