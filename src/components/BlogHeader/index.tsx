// src/components/BlogHeader/index.tsx
"use client";

import { montaguSlab } from "@/app/GoogleFonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { motion } from "framer-motion";

const BlogHeader = () => {
  const route = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleRedirect = (url: string) => {
    route.push(`/${url}`);
  };

  const openCloseNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header>
      <nav
        className={cn([
          'fixed w-full z-50 bg-[#E9EDE5]',
          'top-0 start-0 shadow-md py-2',
          isNavOpen ? 'h-full': "transition-all duration-200 ease-in-out",
        ])}
      >
        <div className="container mx-auto px-[20px]">
          <div className="flex items-center justify-between px-[20px] py-[2px] md:py-0 ease-in-out transition-all duration-300">
            <Link href="/">
              <Image
                width={120}
                height={70}
                src="/logoCompleta.svg"
                alt="Advogado Previdenciário Benefício INSS"
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
              <IoMenu size={32} color="#012B09" />
            </button>

            <motion.div
              className={`${isNavOpen ? "block" : "hidden"} md:!hidden fixed inset-0 bg-white z-50 flex flex-col items-center`}
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
                    width={160}
                    height={94}
                    src="/logoCompleta.svg"
                    alt="Advogado previdenciário Benefício INSS"
                    className="w-40 lg:w-44 cursor-pointer"
                    loading="lazy"
                  />
                </Link>
              </div>

              <div
                className="flex flex-col items-center justify-center gap-8 mt-[10rem]"
              >
                <Link
                  className="text-[#012B09] text-2xl font-light"
                  href="/"
                >
                  Página Inicial
                </Link>
                
                <div className="text-[#012B09] text-2xl font-semibold mb-2">FAQs</div>
                <button
                  className="text-[#012B09] text-xl font-light"
                  onClick={() => handleRedirect("blog/faq-advogado")}
                >
                  FAQ Advogado
                </button>
                <button
                  className="text-[#012B09] text-xl font-light"
                  onClick={() => handleRedirect("blog/faq-beneficio")}
                >
                  FAQ Benefício
                </button>
                <button
                  className="text-[#012B09] text-xl font-light"
                  onClick={() => handleRedirect("blog/faq-tutoriais")}
                >
                  FAQ Tutoriais
                </button>
                
                <div className="text-[#012B09] text-2xl font-semibold mt-4 mb-2">Ferramentas</div>
                <button
                  className="text-[#012B09] text-xl font-light"
                  onClick={() => handleRedirect("calculadora-pgbl-vgbl")}
                >
                  Calculadora PGBL vs VGBL
                </button>
                
                <div className="text-[#012B09] text-2xl font-semibold mt-4 mb-2">Navegação</div>
                <button
                  className="text-[#012B09] text-xl font-light"
                  onClick={() => handleRedirect("/#especialistas")}
                >
                  Especialistas
                </button>
                <button
                  className="text-[#012B09] text-xl font-light"
                  onClick={() => handleRedirect("blog")}
                >
                  Blog
                </button>
                <button
                  className="text-[#012B09] text-xl font-light"
                  onClick={() => handleRedirect("/#quem_somos")}
                >
                  Quem Somos
                </button>
                <button
                  className="text-[#012B09] text-xl font-light"
                  onClick={() => handleRedirect("ebook")}
                >
                  E-book
                </button>
                <Link
                  className="text-[#012B09] text-2xl font-light text-red-600 font-semibold"
                  href="https://www.youtube.com/@brunopellizzetti"
                  target="_blank"
                  rel="noreferrer"
                >
                  Youtube
                </Link>
                <Link
                  className="text-[#012B09] text-2xl font-light"
                  href="https://api.whatsapp.com/send?phone=5545991313858&text=Ol%C3%A1%2C%20visitei%20seu%20site%20e%20gostaria%20de%20obter%20mais%20informa%C3%A7%C3%B5es%20sobre%20minha%20aposentadoria."
                  target="_blank"
                  rel="noreferrer"
                >
                  Contato
                </Link>
              </div>
            </motion.div>

            <nav
              className={cn([
                "hidden md:flex items-center gap-[30px]",
                "ease-in-out transition-all duration-300",
                montaguSlab.className,
                "text-[#012B09]"
              ])}
            >
              <Link
                className="link-underline text-center text-xl"
                href="/"
              >
                Página Inicial
              </Link>
              
              <div className="relative group">
                <button
                  className="link-underline text-center text-xl flex items-center"
                >
                  FAQs <span className="ml-1">▼</span>
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50 hidden group-hover:block group-hover:opacity-100 opacity-0 transition-opacity duration-300" 
                     style={{ transitionDelay: '150ms' }}>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => handleRedirect("blog/faq-advogado")}
                  >
                    FAQ Advogado
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => handleRedirect("blog/faq-beneficio")}
                  >
                    FAQ Benefício
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => handleRedirect("blog/faq-tutoriais")}
                  >
                    FAQ Tutoriais
                  </button>
                </div>
              </div>
              
              <div className="relative group">
                <button
                  className="link-underline text-center text-xl flex items-center"
                >
                  Ferramentas <span className="ml-1">▼</span>
                </button>
                <div className="absolute left-0 mt-2 w-60 bg-white shadow-lg rounded-md overflow-hidden z-50 hidden group-hover:block group-hover:opacity-100 opacity-0 transition-opacity duration-300"
                     style={{ transitionDelay: '150ms' }}>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => handleRedirect("calculadora-pgbl-vgbl")}
                  >
                    Calculadora PGBL vs VGBL
                  </button>
                </div>
              </div>
              
              <button
                className="link-underline text-center text-xl"
                onClick={() => handleRedirect("/#especialistas")}
              >
                Especialistas
              </button>
              <button
                className="link-underline text-center text-xl"
                onClick={() => handleRedirect("blog")}
              >
                Blog
              </button>
              <button
                className="link-underline text-center text-xl"
                onClick={() => handleRedirect("/#quem_somos")}
              >
                Quem Somos
              </button>
              <button
                className="link-underline text-center text-xl"
                onClick={() => handleRedirect("ebook")}
              >
                E-book
              </button>
              <a
                className="text-white text-xl font-[300] bg-red-600 px-[10px] py-[9px] rounded-[30px] w-[150px] text-center transition-all duration-300 ease-in-out hover:bg-red-700"
                href="https://www.youtube.com/@brunopellizzetti"
                target="_blank"
                rel="noreferrer"
              >
                Youtube
              </a>
              <a
                className="text-[#E5E9E5] text-xl font-[300] bg-[#4C6751] px-[10px] py-[9px] rounded-[30px] w-[150px] text-center transition-all duration-300 ease-in-out hover:bg-[#012B09]"
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

export default BlogHeader;
