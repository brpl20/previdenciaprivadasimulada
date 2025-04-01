// src/app/aposentadoria-enfermeiro/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advogado para Aposentadoria especial da Enfermeira",
  description:
    "A enfermagem é uma área desafiadora, lidando com ambientes insalubres e uma carga pesada, enfrentando situações de vulnerabilidade e estresse. Além disso, há o constante contato com agentes contaminantes, esterilização de materiais, partes do corpo humano, doenças e pacientes contaminados, bem como o desafio dos equipamentos de proteção individual inadequados para lidar com tantos elementos, além de uma carga horária difícil.",
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
