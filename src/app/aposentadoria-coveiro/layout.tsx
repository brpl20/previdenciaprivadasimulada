// src/app/aposentadoria-coveiro/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advogado para Aposentadoria especial do Coveiro",
  description:
    "Como qualquer trabalhador, os coveiros também têm direitos, Acompanhe o vídeo para entender esse caso emblemático de um Coveiro que estava há muito tempo buscando sua aposentadoria e Descobriu que tinha Direito à Aposentadoria Especial pela exposição a diversos agentes nocivos em especial a Agentes Biológicos ",
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
