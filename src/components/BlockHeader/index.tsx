// src/components/BlockHeader/index.tsx
"use client";

import { montaguSlab } from "@/app/GoogleFonts";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";

const BlockHeader = () => {
  const route = useRouter();

  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleRedirect = (url: string) => {
    route.push(url);
  };

  return (
    <>
      <header className="bg-[#012B09] h-[90px] w-full z-50
       backdrop-filter backdrop-blur-lg shadow-md py-[5px] px-[50px] hidden md:flex items-center justify-center">
        <nav className="hidden md:flex items-center justify-between w-[1024px] 2xl:w-[1440px] mx-auto">
          <Image
            width={120}
            height={70}
            src="/logoBranca.svg"
            alt="Logo"
            className="w-[110px] 2xl:w-[150px] cursor-pointer"
            onClick={() => handleRedirect("/")}
            priority
          />
          <ul className={`flex items-center gap-[47px] ${montaguSlab.className} text-[16px] 2xl:text-[20px] font-[300] text-[#CBD4C9]`}>
            <li>
              <Link
                className="link-underline text-center"
                href="/"
              >
                Página Inicial
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="link-underline text-center"
              >
                Blog
              </Link>
            </li>
            <li>
              <a
                className="text-[#CBD4C9] font-[300] bg-[#4C6751] px-[10px] py-[9px] rounded-[30px] w-[150px] text-center transition-all duration-300 ease-in-out hover:bg-[#285c1e]"
                href="https://www.youtube.com/@brunopellizzetti"
                target="_blank"
                rel="noreferrer"
              >
                Youtube
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <header className="block md:hidden z-50 py-[30px] bg-[#012B09] px-[50px]">
        <nav className="flex items-start justify-between">
          <Image
            width={120}
            height={70}
            src="/logoBranca.svg"
            alt="Logo"
            className="w-[110px] 2xl:w-[173px] cursor-pointer"
            onClick={() => handleRedirect("/")}
            priority
          />
          <button aria-label={`${isNavOpen? 'fechar' : 'abrir'} menu`} onClick={() => setIsNavOpen(!isNavOpen)}>
            {isNavOpen ? (
              <IoClose color="#fff" size={32} />
            ) : (
              <IoMenu color="#fff" size={32} />
            )}
          </button>
        </nav>
      </header>

      <div
        className={`${isNavOpen
            ? "fixed inset-0 bg-white z-50 flex flex-col items-center justify-center"
            : "hidden"
          }`}
      >
        <div className="container flex justify-end my-[5px] px-[47px]">
          <button
            className="pt-[25px] pr-[3px]"
            onClick={() => setIsNavOpen(!isNavOpen)}
            aria-label="fechar menu"
          >
            <IoClose size={32} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center h-full gap-[32px] pb-[42px] pl-[3px]">
          <Link
            className="text-[#012B09] text-[30px] font-[300]"
            href="/"
          >
            Página Inicial
          </Link>
          <Link
            className="text-[#012B09] text-[30px] font-[300]"
            href="/blog"
          >
            Blog
          </Link>
          <a
            className="text-[#012B09] text-[30px] font-[300]"
            href="https://www.youtube.com/@brunopellizzetti"
            target="_blank"
            rel="noreferrer"
          >
            Youtube
          </a>
        </div>
      </div>
    </>
  );
};

export default BlockHeader;
