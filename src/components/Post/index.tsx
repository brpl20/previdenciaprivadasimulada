// src/components/Post/index.tsx
"use client";

import { montaguSlab } from "@/app/GoogleFonts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import * as React from "react";
import Image, { ImageProps } from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const components = {
  h1: ({
    className,
    ...props
  }: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >) => (
    <h1
      className={cn(
        `${montaguSlab.className} text-[20px] md:text-[24px] 2xl:text-[32px] text-[#012B09] mt-[30px] mb-[15px]`,
        className
      )}
      {...props}
    />
  ),
  h2: ({
    className,
    ...props
  }: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >) => (
    <h2
      className={cn(
        `${montaguSlab.className} text-[18px] md:text-[22px] 2xl:text-[28px] mt-[25px] mb-[12px] text-[#012B09]`,
        className
      )}
      {...props}
    />
  ),
  h3: ({
    className,
    ...props
  }: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >) => (
    <h3
      className={cn(
        `${montaguSlab.className} text-[16px] md:text-[20px] 2xl:text-[24px] mt-[20px] mb-[10px] text-[#012B09]`,
        className
      )}
      {...props}
    />
  ),
  h4: ({
    className,
    ...props
  }: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >) => (
    <h4
      className={cn(
        `${montaguSlab.className} text-[15px] md:text-[18px] 2xl:text-[22px] mt-[20px] mb-[10px] text-[#012B09]`,
        className
      )}
      {...props}
    />
  ),
  a: ({
    className,
    ...props
  }: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >) => (
    <a
      className={cn("font-medium underline underline-offset-4", className)}
      aria-label={props["aria-label"] || "Link externo"}
      {...props}
      rel="nofollow"
    />
  ),
  p: ({
    className,
    ...props
  }: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >) => (
    <p
      className={cn(
        `${montaguSlab.className} text-[16px] 2xl:text-[18px] leading-relaxed text-[#012B09] mt-[20px]`,
        className
      )}
      {...props}
    />
  ),
  ul: ({
    className,
    ...props
  }: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  >) => <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />,
  ol: ({
    className,
    ...props
  }: React.DetailedHTMLProps<
    React.OlHTMLAttributes<HTMLOListElement>,
    HTMLOListElement
  >) => <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />,
  li: ({
    className,
    ...props
  }: React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  >) => <li className={cn("mt-2", className)} {...props} />,
  blockquote: ({
    className,
    ...props
  }: React.DetailedHTMLProps<
    React.BlockquoteHTMLAttributes<HTMLQuoteElement>,
    HTMLQuoteElement
  >) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  Image: ({ className, alt = "", style, ...props }: ImageProps) => (
    <Image
      className={cn("rounded-md border !relative", className)}
      alt={alt}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    style,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md border", className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHRElement>, HTMLHRElement>) => (
    <hr className="my-8 border-[#e0e0e0]" {...props} />
  ),  
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn(`${montaguSlab.className} w-full border-collapse`, className)} {...props} />
    </div>
  ),  
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn(`${montaguSlab.className} m-0 border-t p-0 even:bg-[#f7f7f7]`, className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>) => (
    <th
      className={cn(
        `${montaguSlab.className} border px-4 py-2 text-left font-medium text-[14px] md:text-[16px] bg-[#f0f0f0]`,
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>) => (
    <td
      className={cn(
        `${montaguSlab.className} border px-4 py-2 text-left text-[14px] md:text-[16px]`,
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>) => (
    <pre
      className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg border bg-[#f7f7f7] py-4 px-4 font-mono text-[14px]",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => (
    <code
      className={cn(
        "relative rounded border bg-[#f7f7f7] px-[0.3rem] py-[0.2rem] font-mono text-[14px]",
        className
      )}
      {...props}
    />
  ),
  LiteYouTubeEmbed,
};

interface PostProps {
  code: string;
  title: string;
  author?: string;
  date?: string;
}

export function Post({ code, title, author, date }: PostProps) {
  const Component = useMDXComponent(code);
  const formattedDate = date 
    ? format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
    : null;

  return (
    <div className="mdx">
      <main className="md:h-[calc(100vh-120px)] h-[calc(100vh-50px)] md:mt-[120px] 2xl:h-[calc(100vh-150px)] 2xl:mt-[150px] bg-[#EEEEE6] max-w-[1024px] 2xl:max-w-[1440px] rounded-[8px] shadow-md w-full mx-auto overflow-auto no-scrollbar">
        <div className="flex flex-col items-center mb-[40px]">
          <h1
            className={`${montaguSlab.className} text-[18px] md:text-[26px] 2xl:text-[42px] text-center mt-[30px] 2xl:mt-[50px] pb-[20px] text-[#012B09] px-[20px]`}
          >
            {title}
          </h1>
          <div className="flex items-center gap-[30px] mt-[5px]">
            <p className={`${montaguSlab.className} text-[12px] text-[#696969]`}>
              Autor: {author ? author : "Bruno Pellizzetti"}
            </p>
            {formattedDate && (
              <p className={`${montaguSlab.className} text-[12px] text-[#696969]`}>
                {formattedDate}
              </p>
            )}
          </div>
        </div>
        <div className="px-[32px] md:px-[48px] 2xl:px-[64px] pb-[40px] max-w-[800px] 2xl:max-w-[1000px] mx-auto border-l border-r border-black/5 shadow-[inset_0_0_30px_rgba(0,0,0,0.03)] blog-content">
          <Component components={components} />
        </div>
      </main>
    </div>
  );
}
