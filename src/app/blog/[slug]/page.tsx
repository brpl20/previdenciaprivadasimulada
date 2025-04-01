// src/app/blog/[slug]/page.tsx
import BlogHeader from "@/components/BlogHeader";
import { Post } from "@/components/Post";
import { allDocs, Doc } from "contentlayer/generated";
import { Metadata } from "next";
import Script from "next/script";

interface BlogProps {
  params: Promise<{ slug?: string }>
}

async function getDocFromParams(slug: string) {
  console.log(`Looking for document with slug: ${slug}`);
  
  // First try exact match
  let doc = allDocs.find((doc) => doc.slugAsParams === slug);
  
  if (!doc) {
    // Try case-insensitive match
    doc = allDocs.find((doc) => 
      doc.slugAsParams.toLowerCase() === slug.toLowerCase()
    );
  }
  
  if (!doc) {
    // Try matching with permalink (with various cleanups)
    doc = allDocs.find((doc) => {
      if (!doc.permalink) return false;
      
      // Clean the permalink to get just the slug part
      const cleanPermalink = doc.permalink
        .replace(/^\/?(blog\/)?|\/?$/g, '');
      
      return cleanPermalink === slug;
    });
  }
  
  if (doc) {
    console.log(`Found document: ${doc.title} with slugAsParams: ${doc.slugAsParams}`);
  } else {
    console.log(`No document found for slug: ${slug}`);
    // Log all available slugs for debugging
    console.log(`Available slugs: ${allDocs.map(d => d.slugAsParams).join(', ')}`);
  }
  
  return doc || null;
}

export async function generateStaticParams() {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams,
  }));
}

export async function generateMetadata({ params }: BlogProps) {
  const { slug } = await params || {}
  let doc = slug ? await getDocFromParams(slug) : undefined;
  doc ??= {} as never;
  const { title = '', description = '' } = doc as Doc
  return { 
    title, 
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: doc.date,
      authors: [doc.author || 'Pellizzetti Walber & Associados'],
    },
  };
}

const Blog = async ({ params }: BlogProps) => {
  const { slug } = await params || {}
  const doc = slug ? await getDocFromParams(slug) : null;
  if (!doc) return <div>404 - Not Found</div>;

  // Create JSON-LD for the blog post
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": doc.title,
    "description": doc.description,
    "author": {
      "@type": "Person",
      "name": doc.author || "Pellizzetti Walber & Associados"
    },
    "datePublished": doc.date,
    "publisher": {
      "@type": "Organization",
      "name": "Pellizzetti Walber & Associados",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pellizzettiwalber.adv.br/logoCompleta.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://pellizzettiwalber.adv.br/blog/${doc.slugAsParams}`
    }
  };

  return (
    <div>
      <Script
        id="blog-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogHeader />
      <Post code={doc.body.code} title={doc.title} author={doc.author} date={doc.date} />
    </div>
  );
};

export default Blog;
