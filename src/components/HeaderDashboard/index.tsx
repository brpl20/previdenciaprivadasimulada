// src/components/HeaderDashboard/index.tsx
"use client";

import { IoMenu, IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { montaguSlab } from "@/app/GoogleFonts";
import { useNavStyles } from "@/hooks/useNavStyles";
import { useNavAnimation } from "@/hooks/useNavAnimation";
import { cn } from "@/lib/utils";
import { useMobileNav } from "@/hooks/useMobileNav";
import { PositionColorRelation } from "@/hooks/types";

interface HeaderProps {
  positionColorRelation: PositionColorRelation
}

export const Header = ({positionColorRelation}: HeaderProps) => {
  const route = useRouter();
  const {navStyles} = useNavStyles(positionColorRelation)
  const {menuAnimation, navOptionsAnimation} = useNavAnimation()
  const {handleRedirect, isNavOpen, openCloseNav} = useMobileNav()

  return (
    <header>
      <nav
        className={
          cn([
            'fixed w-full z-50 backdrop-blur-xl',
            navStyles.isFixed ? 'top-0 start-0 backdrop-filter shadow-md py-2 backdrop-invert-[10%]'
            : 'pt-5 !backdrop-brightness-100',
            isNavOpen ? 'h-full': "transition-all duration-200 ease-in-out",
            navStyles.isLight ? 'backdrop-brightness-[85%]' : 'backdrop-brightness-[150%]'
          ])
        }
      >
        <div className="container mx-auto px-[20px]">
          <div className="flex items-center justify-between px-[20px] py-[2px] md:py-0 ease-in-out transition-all duration-300">
          <Link href="/">
          <Image
                width={120}
                height={70}
                src={navStyles.isLight? "/logoCompletaBranca.svg" : "/logoCompleta.svg"}
                alt="Advogado Benefício Aposentadoria Previdenciário"
                className="w-[120px] lg:w-[133px] cursor-pointer"
                priority
              />
              </Link>

            <button
              onClick={openCloseNav}
              className="md:hidden flex items-center py-[10px]"
              name="menu"
              aria-label="menu"
              aria-labelledby="menu"
            >
              <IoMenu size={32} />
            </button>

            <motion.div
              className={`${isNavOpen ? "block" : "hidden"} md:hidden fixed inset-0 bg-white z-50 flex flex-col items-center`}
              variants={menuAnimation}
              initial="hidden"
              animate={isNavOpen ? "visible" : "hidden"}
            >
              <div className="w-full flex justify-end p-4">
                <button onClick={openCloseNav} aria-label="fechar menu">
                  <IoClose size={32} />
                </button>
              </div>

              <div className="flex flex-col items-center justify-center mt-4 mb-8">
              <Link href="/">
                <Image
                  src="/logoCompleta.svg"
                  alt="Advogado Previdenciário Cascavel"
                  className="w-40 lg:w-44 cursor-pointer"
                  width={120}
                  height={70}
                  loading="lazy"
                />
                </Link>
              </div>

              <motion.div
                className="flex flex-col items-center justify-center gap-8 mt-[10rem]"
                variants={navOptionsAnimation}
                initial="hidden"
                animate={isNavOpen ? "visible" : "hidden"}
              >

                <button
                  className="text-[#4C6751] text-2xl font-light"
                  onClick={() => handleRedirect("especialistas")}
                >
                  Serviços
                </button>
                <button
                  className="text-[#4C6751] text-2xl font-light"
                  onClick={() => handleRedirect("especialistas")}
                >
                  Especialistas
                </button>
                <button
                  className="text-[#4C6751] text-2xl font-light"
                  onClick={() => handleRedirect("avaliacoes")}
                >
                  Avaliações
                </button>
                <button
                  className="text-[#4C6751] text-2xl font-light"
                  onClick={() => handleRedirect("quem_somos")}
                >
                  Quem Somos
                </button>
                <button
                className="text-[#4C6751] text-2xl font-light"
                onClick={() => handleRedirect("ebook")}
              >
                E-book
              </button>
                <Link
                  className="text-[#4c6751] text-2xl font-light"
                  href="https://api.whatsapp.com/send?phone=5545991313858&text=Ol%C3%A1%2C%20visitei%20seu%20site%20e%20gostaria%20de%20obter%20mais%20informa%C3%A7%C3%B5es%20sobre%20minha%20aposentadoria."
                  target="_blank"
                  rel="noreferrer"
                >
                  Contato
                </Link>
              </motion.div>
            </motion.div>

            <nav
              className={
                cn([
                  "hidden md:flex items-center gap-[47px]",
                  "ease-in-out transition-all duration-300",
                  montaguSlab.className,
                  navStyles.isLight ? "text-white" : "text-[#012B09]"
                ])}
              >
              <button
                className="link-underline text-center"
                onClick={() => handleRedirect("servicos")}
              >
                Serviços
              </button>

              <button
                className="link-underline text-center"
                onClick={() => handleRedirect("especialistas")}
              >
                Especialistas
              </button>
              <button
                className="link-underline text-center"
                onClick={() => handleRedirect("avaliacoes")}
              >
                Avaliações
              </button>
              <button
                className="link-underline text-center"
                onClick={() => handleRedirect("faqs")}
              >
                FAQs
              </button>
              <button
                className="link-underline text-center"
                onClick={() => handleRedirect("quem_somos")}
              >
                Quem Somos
              </button>
              <button
                className="link-underline text-center"
                onClick={() => handleRedirect("ebook")}
              >
                E-book
              </button>
              <a
                className="text-[#E5E9E5] font-[300] bg-[#4C6751] px-[10px] py-[9px] rounded-[30px] w-[150px] text-center transition-all duration-300 ease-in-out hover:bg-[#afbcaf]"
                href="https://api.whatsapp.com/send?phone=5545991313858&text=Ol%C3%A1%2C%20visitei%20seu%20site%20e%20gostaria%20de%20obter%20mais%20informa%C3%A7%C3%B5es%20sobre%20minha%20aposentadoria."
                target="_blank"
                rel="noreferrer nofollow"
              >
                Contato
              </a>
            </nav>
          </div>
        </div>
      </nav>
    </header>
  );
};
