// src/app/aposentadoria-motorista/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advogado para Aposentadoria Especial do Motorista",
  description:
    "Os motoristas de ônibus e caminhão possuem uma série de direitos previdenciários específicos Porem, ao longo dos anos conseguir esses direitos foi ficando cada vez mais difícil, Primeiro tínhamos uma presunção por categoria profissional, depois por exposição a agentes nocivos como ruídos e vibrações Demonstrar esses critérios sempre foi muito mais difícil, de forma que passamos a apelar para o critério da Penosidade Acompanhe nosso vídeo para entender mais sobre a classe dos motorista e a aposentadoria especial",
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
