// src/components/AllPosts/index.tsx
"use client";

import Link from "next/link";
import { Doc } from "contentlayer/generated";
import { montaguSlab } from "@/app/GoogleFonts";
import { useState, useEffect } from "react";

const AllPosts = () => {
  const [page, setPage] = useState<Doc[] | Error>();

  useEffect(() => {
    if (page) return;
    import("contentlayer/generated")
      .then(({ allDocs }) =>
        setPage(
          allDocs.sort(
            (a, b) =>
              new Date(b.date as string).getTime() -
              new Date(a.date as string).getTime()
          )
        )
      )
      .catch((e) => {
        console.error(e);
        setPage(new Error(e));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  if (page instanceof Error)
    return (
      <main className="md:h-[calc(100vh-120px)] h-[calc(100vh-50px)] md:mt-[120px] 2xl:h-[calc(100vh-150px)] 2xl:mt-[150px] overflow-hidden bg-white max-w-[1024px] 2xl:max-w-[1440px] rounded-[4px] pb-[90px] 2xl:pb-[125px] w-full mx-auto">
        Erro ao Carregar Blog...
      </main>
    );

  return (
    <>
      {page?.length ? (
        <main className="md:h-[calc(100vh-120px)] h-[calc(100vh-50px)] md:mt-[120px] 2xl:h-[calc(100vh-150px)] 2xl:mt-[150px] overflow-hidden bg-white max-w-[1024px] 2xl:max-w-[1440px] rounded-[4px] pb-[90px] 2xl:pb-[125px] w-full mx-auto">
          <h1
            className={`${montaguSlab.className} text-[22px] md:text-[26px] 2xl:text-[42px] text-center mt-[20px] 2xl:mt-[20px] pb-[20px] drop-shadow-2xl border-b-2`}
          >
            Últimas Postagens
          </h1>
          <div className="flex flex-col gap-[10px] 2xl:gap-[50px] md:pt-[20px] 2xl:pt-[40px] overflow-auto no-scrollbar h-full w-full">
            {page.map((post, index) => {
              const firstParagraph = post.description;

              return (
                <div
                  key={post.slug}
                  className={`rounded-[4px] transition-all duration-300 ease-in-out hover:bg-[#f7f7f7] py-[10px] px-[20px] ${montaguSlab.className} w-full lg:max-w-[700px] xl:max-w-[900px] flex flex-col justify-center mx-auto`}
                >
                  <div className="flex gap-[40px] 2xl:gap-[60px]">
                    <div className="after:content-[''] after:w-[2px] 2xl:after:w-[2px] after:h-[calc(100%-30px)] after:mt-[30px] after:border-b after:border-[#C0C0C0] after:border-[2px] after:inline-block relative gap-[20px] 2xl:gap-[40px] hidden lg:flex">
                      <div className="bolinha-verde"></div>
                      <div className="flex flex-col items-center w-[50px]">
                        <span className="text-[#012B09] text-[46px] 2xl:text-[60px]">
                          {post.date.split("-")[2]}
                        </span>
                        <div
                          className={`flex flex-col items-center text-black mt-[-5px] ${montaguSlab.className}`}
                        >
                          <span className="text-[#696969] text-[10px] 2xl:text-[14px]">
                            {months[parseInt(post.date.split("-")[1]) - 1]}
                          </span>
                          <span className="text-[#696969] text-[10px] 2xl:text-[14px]">
                            {post.date.split("-")[0]}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`${montaguSlab.className} flex flex-col 2xl:gap-[5px] w-full`}
                    >
                      <h1 className="font-[500] text-[22px] 2xl:text-[32px] text-[#012B09] w-full">
                        {post.title}
                      </h1>
                      <div className="flex items-center gap-[20px] 2xl:gap-[30px] 2xl:mt-[5px]">
                        <p className="text-[8px] 2xl:text-[12px] text-[#696969]">
                          Autor: {post.author}
                        </p>
                      </div>
                      <p className="text-[12px] 2xl:text-[16px] text-[#696969] mt-[10px] 2xl:mt-[20px] w-full">
                        {firstParagraph?.slice(0, 180) + "..."}
                      </p>

                      <Link
                        className="text-[12px] 2xl:text-[16px] w-[max-content] text-white bg-[#012B09] rounded-[4px] hover:bg-[#285c1e] transition-all duration-300 ease-in-out 2xl:py-[10px] 2xl:px-[20px] py-[6px] px-[10px] mt-[10px]"
                        href={`/blog/${post.slugAsParams}`}
                      >
                        Continuar lendo
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      ) : (
        <main className="md:h-[calc(100vh-120px)] h-[calc(100vh-50px)] md:mt-[120px] 2xl:h-[calc(100vh-150px)] 2xl:mt-[150px] overflow-hidden bg-white max-w-[1024px] 2xl:max-w-[1440px] rounded-[4px] pb-[90px] 2xl:pb-[125px] w-full mx-auto animate-pulse"></main>
      )}
    </>
  );
};

export default AllPosts;
