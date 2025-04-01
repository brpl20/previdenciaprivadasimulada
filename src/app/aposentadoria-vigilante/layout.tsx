// src/app/aposentadoria-vigilante/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advogado para Aposentadoria especial do Vigilante",
  description:
    "Já há muitos anos os vigilantes possuem direito a aposentadoria especial, Entretanto, esse direito tem sido cada vez mais difícil de conseguir, Várias discussões foram superadas, como por exemplo a necessidade de exposição cosntante a risco de vida Bem como ao uso de arma de fogo (STJ), A questão foi decidida definitivamente pelo STJ, porém, hoje Se aguarda a resolução do  Supremo Tribunal Federal (STF) está prestes a julgar a aposentadoria do vigilante, ado uma jornada tumultuada em busca de seus direitos previdenciários. Enquanto isso, processos ficam parados, o tempo passa, e a necessidade da aposentadoria se torna cada vez mais urgente para muitos.",
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



