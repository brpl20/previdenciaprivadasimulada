// src/components/MyBlog/index.tsx
"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { allDocs } from "contentlayer/generated";
import { montaguSlab } from "@/app/GoogleFonts";

const MyBlog = () => {
  const orderedDocs = allDocs.sort(
    (a, b) =>
      new Date(b.date as string).getTime() -
      new Date(a.date as string).getTime()
  );
  const page = orderedDocs.slice(0, 2);

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

  return (
    <section
      className="relative bg-[#4c6751] w-full py-[45px] 2xl:py-[90px]"
      id="blog"
    >
      <div className="container mx-auto relative z-10 flex flex-col gap-[40px] 2xl:gap-[80px] px-[20px] lg:px-[42px]">
        <h2
          className={`text-white text-center ${montaguSlab.className} font-[300] text-[42px] 2xl:text-[60px]`}
        >
          BLOG
        </h2>

        <div className="flex flex-col gap-[60px]">
          {page &&
            page.length > 0 &&
            page?.map((post, index) => {
              const firstParagraph = post.description;

              return (
                <Link
                  key={post._id}
                  className="w-full bg-white 2xl:h-[150px] p-[20px] rounded-[4px] flex gap-[30px]"
                  href={`/blog/${post.slugAsParams}`}
                >
                  <div className="after:content-[''] after:w-[2px] 2xl:after:w-[2px] after:h-full after:border-b after:border-[#A0C499] after:border-[2px] after:inline-block relative gap-[20px] 2xl:gap-[40px] hidden lg:flex">
                    <div className="bolinha-verde2"></div>
                    <div className="flex flex-col items-center">
                      <span className="text-[#012B09] text-[32px] 2xl:text-[42px]">
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
                  <div>
                    <h3 className="font-[500] text-[18px] 2xl:text-[20px] text-[#012B09]">
                      {post.title}
                    </h3>
                    <p className="text-[16px] 2xl:text-[16px] text-[#696969] mt-[10px]">
                      {firstParagraph?.slice(0, 220) + "..."}
                    </p>
                  </div>
                </Link>
              );
            })}

          {page.length === 0 && (
            <p className="text-white">Nenhum post encontrado</p>
          )}
        </div>

        <div className="flex justify-end">
          <Link
            className={`bg-[#012B09] py-[8px] px-[16px] w-[160px] h-[40px] 2xl:w-[200px] 2xl:h-[55px] items-center gap-[10px] rounded-[8px] text-[18px] 2xl:text-[22px] text-white ${montaguSlab.className} font-[400] flex justify-center`}
            href="/blog"
            rel="noreferrer"
            aria-label="ver mais"
          >
            Ver mais
            <FiArrowRight
              color="#fff"
              size={22}
              className="lg:w-[28px] lg:h-[28px] mt-[2px]"
              aria-description="Blog"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MyBlog;
