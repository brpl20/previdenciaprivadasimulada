// src/app/aposentadoria-rural/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advogado para Aposentadoria especial do Trabalhador Rural",
  description:
    "Se você é produtor rural e está se aproximando da idade para aposentadoria (55 mulheres e 60 homens), este vídeo é para você! Veja como funciona a aposentadoria rural, uma categoria especial que não requer contribuições previdenciárias diretas. Abordo os erros comuns de interpretação do INSS e do Judiciário, além de explicar os requisitos legais e constitucionais que você precisa conhecer para garantir seu benefício. Assista até o final para entender seus direitos, evitar armadilhas e garantir uma aposentadoria tranquila para você e sua família",
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
