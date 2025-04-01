// src/components/GravediggerRetirement/index.tsx
"use client";

import FifthSection from "@/components/SeventhSection";
import Footer from "@/components/Footer";
import { Header } from "@/components/HeaderDashboard";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import DashService from "@/app/dashService/layout";
import DashAvaliations from "@/app/dashAvalations/layout";
import DashFaqs from "@/app/dashFaqs/layout";
import { IoLogoWhatsapp } from "react-icons/io5";
import Image from "next/image";
import { montaguSlab } from "@/app/GoogleFonts";
import { NavColor } from "@/hooks/types";

import coveiro from 'public/coveiro.jpg'
import aposentadoria_coveiro from 'public/aposentadoria-coveiro.jpg'

const GravediggerRetirement = () => {

  // Whatsapp
  const handleClick = () => {
    window.open("https://api.whatsapp.com/send?phone=5545991313858&text=Ol%C3%A1%2C%20visitei%20seu%20site%20e%20gostaria%20de%20obter%20mais%20informa%C3%A7%C3%B5es%20sobre%20minha%20aposentadoria.", "_blank");
  };

  return (
    <main>
      <Header positionColorRelation={{
        0: NavColor.light,
        6: NavColor.dark,
        12: NavColor.light,
        23: NavColor.dark,
        39: NavColor.light,
        82: NavColor.dark,
      }}
      />
      <div className="relative min-h-screen flex items-center justify-center" id="home">
        <Image
        placeholder="blur"
          src={coveiro}
          priority
          alt="aposentadoria coveiro cemitério benefício"
          width={501}
          height={902}
          className="absolute inset-0 w-full h-full object-cover z-0 bg-black opacity-95 "
        />
        <div className="relative z-40 text-center p-4 bg-[#f2ebd191] rounded-lg flex flex-col justify-center items-center">
          <h1 className={`font-[600] text-[#012B09] text-[42px] md:text-[44px] 2xl:text-[60px] ${montaguSlab.className} leading-[60px] mb-4`}>
            Procurando Advogado Especialista em Aposentadoria para Coveiro?
          </h1>

          <div className={`text-[#012B09] text-[20px] font-[500] ${montaguSlab.className} leading-[40px] mb-4`}>
            <p>Te ajudamos a garantir uma vida tranquila com o direito à aposentadoria.</p>
          </div>
          <button
            className="animate-bg-white-to-green py-2 px-6 w-auto rounded-md flex text-base md:text-lg text-orange-95 [&>*]:animate-color-green-to-white 
font-bold [&:hover>*]:!text-white hover:!animate-bg-darken-dark-green [&:hover>*]:!animate-bg-darken-dark-green  mt-6 items-center"
            onClick={handleClick}
          >
            <IoLogoWhatsapp alignmentBaseline="central" size={24} className="mr-2" />
            <span>
            FALE CONOSCO
            </span>
          </button>
        </div>
      </div>

      <DashService />

      <div
        className="bg-[#CBD4C9] relative"
        id="solucoes"
      >
                                <Image
                                placeholder="blur"
          src={aposentadoria_coveiro}
          alt="aposentadoria coveiro INSS benefício"
          fill
          className="object-cover object-center z-0"
          loading="lazy"

        />
        <div className="absolute inset-0 bg-[#f2ebd191] opacity-90"></div>
        <div className="container mx-auto flex flex-col gap-[40px] justify-center items-center pb-[48px] px-[20px] lg:px-[42px] relative z-10">
          <h3 className={`font-[500] ${montaguSlab.className} text-[42px] 2xl:text-[60px] pt-[64px] text-center text-[#012B09]`}>
            Advogado para Aposentadoria especial do Coveiro
          </h3>
          <p className={`${montaguSlab.className} font-[500] text-[20px] 2xl:text-[30px] text-justify text-center text-[#012B09]`}>
            Como qualquer trabalhador, os coveiros também têm direitos, Acompanhe o vídeo para entender esse caso emblemático de um Coveiro que estava há muito tempo buscando sua aposentadoria e Descobriu que tinha Direito à Aposentadoria Especial pela exposição a diversos agentes nocivos em especial a Agentes Biológicos Entre em contato para entender um pouco mais sobre ess modalidade de aposentadoria.
          </p>
          <button
            className="animate-bg-white-to-green py-2 px-6 w-auto rounded-md flex text-base md:text-lg text-orange-95 [&>*]:animate-color-green-to-white 
font-bold [&:hover>*]:!text-white hover:!animate-bg-darken-dark-green [&:hover>*]:!animate-bg-darken-dark-green  mt-6 items-center"
            onClick={handleClick}
          >
            <IoLogoWhatsapp alignmentBaseline="central" size={24} className="mr-2" />
            <span>FALE CONOSCO</span>
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="w-full h-full relative">
          <LiteYouTubeEmbed webp
            id="klso4F_MCio"
            adNetwork
            playlist={false}
            
            title="Aposentadoria_coveiro"
            noCookie
          />
        </div>
      </div>

      <DashAvaliations />
      <DashFaqs />
      <FifthSection />
      <Footer />
    </main>
  );
};

export default GravediggerRetirement;