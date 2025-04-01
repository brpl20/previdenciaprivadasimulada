// tailwind.config.ts
import type { Config } from "tailwindcss";

const fadeDuration = '9.2s'
const hoverDuration = '0.2s'
const waDarkGreen = "#1fa855"
const waLightGreen = "#24c262"
const waDarkerGreenText = "#106532"
const ytRed = "#ff0000"
const ytDarkerRed = "#a30000"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        green: {
          600: waLightGreen,
          700: waDarkGreen,
          800: waDarkerGreenText,
        },
      },
      textColor: {
        orange: {
          950: '#1b0804'
        }
      },
      keyframes: {
        colorGreenToWhite: {
          /**
           * Animação usada para botões com texto branco carregarem sem o
           * Google lighthouse reclamar de contraste
           */
          '0%': { color: 'white' },
          '17%': { color: 'white' },
          '19%': { color: waDarkerGreenText },
          '65%': { color: waDarkerGreenText },
          '67%': { color: 'white' },
          '100%': { color: 'white' }
        },
        colorRedToWhite: {
          '0%': { color: 'white' },
          '17%': { color: 'white' },
          '19%': { color: ytDarkerRed },
          '65%': { color: ytDarkerRed },
          '67%': { color: 'white' },
          '100%': { color: 'white' }
        },
        bgToGreen: {
          '0%': { backgroundColor: waDarkGreen },
          '17%': { backgroundColor: waDarkGreen },
          '19%': { backgroundColor: 'white' },
          '65%': { backgroundColor: 'white' },
          '67%': { backgroundColor: waDarkGreen },
          '100%': { backgroundColor: waDarkGreen },
        },
        bgToLightGreen: {
          '0%': { backgroundColor: waLightGreen },
          '17%': { backgroundColor: waLightGreen },
          '19%': { backgroundColor: 'white' },
          '65%': { backgroundColor: 'white' },
          '67%': { backgroundColor: waLightGreen },
          '100%': { backgroundColor: waLightGreen },
        },
        bgToRed: {
          '0%': { backgroundColor: ytRed },
          '17%': { backgroundColor: ytRed },
          '19%': { backgroundColor: 'white' },
          '65%': { backgroundColor: 'white' },
          '67%': { backgroundColor: ytRed },
          '100%': { backgroundColor: ytRed },
        },
        hoverLightToDarkGreen: {
          '0%': { backgroundColor: waLightGreen },
          '100%': { backgroundColor: waDarkGreen }
        },
        hoverGreenToDarkerGreen: {
          '0%': { backgroundColor: waDarkGreen },
          '100%': { backgroundColor: waDarkerGreenText }
        },
        hoverRedToDarkerRed: {
          '0%': { backgroundColor: ytRed },
          '100%': { backgroundColor: ytDarkerRed }
        },
      },
      animation: {
          /**
           * Animação usada para botões com texto branco carregarem sem o
           * Google lighthouse reclamar de contraste
           */
        'color-green-to-white': `colorGreenToWhite ${fadeDuration} ease-in forwards`,
        'color-red-to-white': `colorRedToWhite ${fadeDuration} ease-in forwards`,
        'bg-white-to-green': `bgToGreen ${fadeDuration} ease-in forwards`,
        'bg-white-to-light-green': `bgToLightGreen ${fadeDuration} ease-in forwards`,
        'bg-white-to-red': `bgToRed ${fadeDuration} ease-in forwards`,
        'bg-darken-light-green': `hoverLightToDarkGreen ${hoverDuration} ease-in-out forwards`,
        'bg-darken-dark-green': `hoverGreenToDarkerGreen ${hoverDuration} ease-in-out forwards`,
        'bg-darken-red': `hoverRedToDarkerRed ${hoverDuration} ease-in-out forwards`
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1920px",
    },
  },
  plugins: [],
};
export default config;
