// src/app/blog/page.tsx
import AllPosts from "@/components/AllPosts";
import BlogHeader from "@/components/BlogHeader";
import { Doc } from "contentlayer/generated";
import { useEffect, useState } from "react";

const Blog = () => {


  return (
    <div className="px-[20px] md:px-[50px] 2xl:px-0 bg-[#012B09] md:bg-transparent">
      <BlogHeader />
      <AllPosts />
    </div>
  );
};

export default Blog;
