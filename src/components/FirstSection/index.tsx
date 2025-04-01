// src/components/FirstSection/index.tsx
import { montaguSlab } from "@/app/GoogleFonts";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io5";

import fundo_2 from "public/fundo_2.png"

const FirstSection = () => {

  const handleClick = () => {
    window.open("https://api.whatsapp.com/send?phone=5545991313858&text=Ol%C3%A1%2C%20visitei%20seu%20site%20e%20gostaria%20de%20obter%20mais%20informa%C3%A7%C3%B5es%20sobre%20minha%20aposentadoria.", "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center"
      id="home"
    >
      <div className="relative z-40 text-center p-4 bg-[rgba(255,255,255,0.3)] rounded-lg flex flex-col justify-center items-center">
        <h1 className={`font-[500] text-black text-[42px] md:text-[44px] 2xl:text-[60px] ${montaguSlab.className} leading-[60px] mb-4`}>
          Chegou a hora de se aposentar e precisa de um Advogado Previdenciário?
        </h1>

        <div className={`text-black text-[20px] font-[400] ${montaguSlab.className} leading-[40px]`}>
          <p>
            Há mais de 15 anos trabalhando incansavelmente pelo melhor benefício previdenciário.
          </p>
        </div>
        <small className="text-xs"> Cascavel - PR </small>
        <small className="text-xs"> Atendemos todo Brasil</small>
        <button
          className="items-center animate-bg-white-to-green py-2 px-6 w-auto rounded-md flex text-base md:text-lg text-orange-95 [&>*]:animate-color-green-to-white 
font-bold [&:hover>*]:!text-white hover:!animate-bg-darken-dark-green [&:hover>*]:!animate-bg-darken-dark-green  mt-6"
          onClick={handleClick}
        >
          <IoLogoWhatsapp alignmentBaseline="central" size={24} className="mr-2" />
          <span>
          FALE CONOSCO
          </span>
        </button>
      </div>
      <Image
      placeholder="blur"
  src={fundo_2}
  alt="Advogados Previdênciários em Cascavel - Paraná"
  fill
  className="absolute top-0 left-0 w-full h-full object-cover z-0"
  priority
/>
    </section>
  );
};

export default FirstSection;