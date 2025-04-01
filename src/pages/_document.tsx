import { Html, Head, Main, NextScript } from 'next/document'
   import Script from 'next/script'

   export default function Document() {
     return (
       <Html lang="en">
         <Head />
         <body>
           <Main />
           <NextScript />
           <Script
             src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
             strategy="beforeInteractive"
           />
         </body>
       </Html>
     )
   }