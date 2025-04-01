// src/components/BlogCard/index.tsx
"use client";

interface BlogCardProps {
  content: string;
}

const BlogCard = ({ content }: BlogCardProps) => {
  return (
    <div>
      <p className="w-full">{content}</p>
    </div>
  );
};

export default BlogCard;
