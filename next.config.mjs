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
