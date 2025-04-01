// next.config.mjs
/**
 * @typedef {{ key: string; value: string;}} Header
 * @type {Array<Header>}
 */
const headers = [{
  key: 'Content-Security-Policy',
  value: `
      default-src 'self' https: data:;
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.hotjar.com https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.google.com https://www.googleadservices.com https://www.pellizzetti.adv.br;
      script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.google.com https://www.googleadservices.com https://www.pellizzetti.adv.br https://*.hotjar.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.hotjar.com;
      font-src 'self' https://fonts.gstatic.com https://*.hotjar.com;
      img-src * data: https://*.hotjar.com;
      connect-src 'self' https://*.hotjar.com https://*.hotjar.io wss://*.hotjar.com https://www.google-analytics.com https://www.googletagmanager.com https://googleads.g.doubleclick.net https://www.google.com https://www.googleadservices.com;
      frame-src 'self' https://youtube-nocookie.com https://www.youtube-nocookie.com https://www.youtube.com https://www.googletagmanager.com https://td.doubleclick.net https://www.google.com https://googleads.g.doubleclick.net;
      base-uri 'self';
      frame-ancestors 'self';
  `.replace(/\n\s+/g, '')
}];

/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: () => [
    process.env.NODE_ENV === 'production' ? {
      source: '/(.*)',
      headers,
    } : undefined,
  ].filter(Boolean),
  
  async redirects() {
    return [
      // Rural Worker
      {
        source: '/trabalhador-rural-e-a-sua-aposentadoria-especial',
        destination: '/blog/trabalhador-rural-direitos-aposentadoria',
        permanent: true,
      },
      // Slaughterhouse Worker
      {
        source: '/magarefe-tem-direito-a-aposentadoria-especial',
        destination: 'blog/aposentadoria-especial-agentes-biologicos',
        permanent: true,
      },
      // Retirement Review
      {
        source: '/revisao-da-aposentadoria-o-que-e-e-como-pedir',
        destination: '/blog/revisao-aposentadoria-guia',
        permanent: true,
      },
      // Pre-reform retirement
      {
        source: '/pedir-ou-nao-a-aposentadoria-antes-da-reforma',
        destination: '/blog',
        permanent: true,
      },
      // Special retirement new rules
      {
        source: '/aposentadoria-especial-veja-as-novas-regras',
        destination: '/blog/aposentadoria-especial-novas-regras-2025',
        permanent: true,
      },
      // Gas station workers
      {
        source: '/frentista-e-hora-de-pedir-a-aposentadoria',
        destination: '/blog/frentista-aposentadoria-especial-2025',
        permanent: true,
      },
      // MEI retirement
      {
        source: '/mei-como-funciona-a-sua-aposentadoria',
        destination: '/blog/mei-aposentadoria-guia',
        permanent: true,
      },
      // COVID-19 related (redirect to blog main page as it's outdated)
      {
        source: '/portadores-de-coronavirus-tem-direito-ao-auxilio-doenca',
        destination: '/blog',
        permanent: true,
      },
      // Delayed retirement
      {
        source: '/atraso-na-aposentadoria-saiba-o-que-fazer',
        destination: '/blog',
        permanent: true,
      },
      // Motorcycle courier
      {
        source: '/motoboy-tem-direito-a-aposentadoria-especial',
        destination: '/blog/motoboy-aposentadoria-especial',
        permanent: true,
      },
      // Disabled retirement
      {
        source: '/aposentadoria-por-idade-de-deficientes-novos-criterios',
        destination: '/blog/revisao-do-deficiente-80-100-da-media-do-beneficio',
        permanent: true,
      },
      // Consumer rights (redirect to main blog as it's not relevant)
      {
        source: '/direito-do-consumidor',
        destination: '/blog',
        permanent: true,
      },
      // Health professional special retirement
      {
        source: '/aposentadoria-especial-do-profissional-da-saude-regime-proprio-ipmc-e-outros',
        destination: '/aposentadoria-especial-enfermagem',
        permanent: true,
      },
      // Biological agents exposure
      {
        source: '/trabalhador-exposto-virus-e-bacterias-tem-direito-aposentadoria-especial',
        destination: '/blog/aposentadoria-especial-agentes-biologicos-procedimentos',
        permanent: true,
      },
      // Rural retirement denial
      {
        source: '/minha-esposa-nao-conseguiu-a-aposentadoria-rural-corro-o-mesmo-risco',
        destination: '/blog/aposentadoria-rural-negada-solucoes',
        permanent: true,
      },
      // Pension reform (outdated)
      {
        source: '/novo100reformadaprevidencia',
        destination: '/blog',
        permanent: true,
      }
    ]
  },

  experimental: {
    nextScriptWorkers: false,
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lztforeferfiles.s3.us-west-2.amazonaws.com'
      }
    ],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
  }
};

export default nextConfig;
