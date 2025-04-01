// src/components/Hero/index.tsx
"use client";

import Image from "next/image";
import FirstSection from "../FirstSection";
import SecondSection from "../SecondSection";
import ThirdSection from "../ThirdSection";
import FourthSection from "../FourthSection";
import FifthSection from "../FifthSection";
import SixthSection from "../SixthSection";
import Seventhsection from "../SeventhSection";

import Footer from "../Footer";
import MyBlog from "../MyBlog";
import { montaguSlab } from "@/app/GoogleFonts";

import Aposentadoria from "public/aposentadoria.jpg"

const Hero = () => {
  return (
    <main>
      <FirstSection />
      {/* Video Institucional */}
      <SecondSection />
      <ThirdSection />

      <div className="bg-[#CBD4C9] relative" id="solucoes">
        <Image
          src={Aposentadoria}
          alt="aposentadoria e INSS, aposentados beneficiários"
          fill
          className="object-cover object-center z-0"
          priority
          placeholder="blur"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto flex flex-col gap-[40px] justify-center items-center pb-[48px] px-[20px] lg:px-[42px] relative z-10">
          <h3
            className={`font-[500] ${montaguSlab.className} text-[42px] 2xl:text-[60px] pt-[64px] text-center text-white`}
          >
            Soluções eficientes em qualquer estágio da sua aposentadoria
          </h3>
          <p
            className={`${montaguSlab.className} font-[400] text-[20px] 2xl:text-[30px] text-center text-white`}
          >
            Sabemos que o momento da aposentadoria pode ser desafiador, trazendo
            muitas dúvidas e ser realmente estressante. São muitas regras a
            serem consideradas e estamos preparados para entender seu problema.
          </p>
          <div className="pt-[8px]">
            <Image
              src="/arrow.svg"
              alt="Benefício Aposentadoria INSS e pensão"
              width={34}
              height={34}
              className="2xl:w-[67px] 2xl:h-[67px]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <FourthSection />
      {/* Avaliações */}
      <FifthSection />
      {/* Canal YT */}
      <SixthSection />
      <MyBlog />
      <Seventhsection />
      <Footer />
    </main>
  );
};

export default Hero;
