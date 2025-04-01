// src/app/aposentadoria-visao-monocular/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advogado para Aposentadoria para quem tem Visão Monocular",
  description:
    "Já imaginou uma decisão judicial contradizer uma lei específica que reconhece a visão monocular como uma deficiência? Neste vídeo, falo de um caso real envolvendo uma professora que buscava seu direito à aposentadoria, baseando-se em sua condição de visão monocular. A instituição à qual ela pertencia não aceitou a Visão Monocular como uma deficiência, levando-a a recorrer ao judiciário para comprovar seu direito. O judiciário por sua vez, negou sua condição de deficiente, o que considero um retrocesso legislativo, dado que existe uma lei específica da deputada Amália Barros que reconhece a visão monocular como uma deficiência. Infelizmente a Deputada Amália Barros não teve tempo de se pronunciar e acabou falecendo no dia 12/04/2024. Mas a luta pelos direitos dos deficientes e da Visão Monocular continuam. Vamos pra briga!",
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


 