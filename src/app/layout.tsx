// src/app/layout.tsx
// import { headers } from "next/headers";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { GoogleScripts } from "./GoogleScripts";



export const metadata: Metadata = {
  title: "Pellizzetti Walber & Associados - Advogados - Cascavel, PR",
  description: "Advogados Especialistas em Previdência - Cascavel. Agende uma Consulta! Excelência em Direito de Benefício por Invalidez, INSS, Pensão e Aposentadoria no Paraná",
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
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" /> */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        suppressHydrationWarning={process.env.NODE_ENV === 'production'}
      >

        {/* Google Tag Manager*/}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PH5ZGZMP"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager */}
        {children}

        <GoogleScripts {...{nonce, visited}} />
      </body>
    </html>
  );
}
