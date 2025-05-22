// src/app/layout.tsx
// import { headers } from "next/headers";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { GoogleScripts } from "./GoogleScripts";



export const metadata: Metadata = {
  title: "Calculadora de Previdência: PGBL vs VGBL",
  description: "Compare planos de previdência privada PGBL e VGBL com nossa calculadora. Descubra qual opção é melhor para o seu perfil e otimize seus benefícios fiscais.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Foi deixado caso decida habilitar CSP estricta
  // const nonce = headers().get("x-nonce") ?? undefined;
  const nonce = undefined

  const cookieStore = await cookies()
  const visited = cookieStore.get("visited") as "1" | undefined

  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        suppressHydrationWarning={process.env.NODE_ENV === 'production'}
      >
      </body>
    </html>
  );
}
