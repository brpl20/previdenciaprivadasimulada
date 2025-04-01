// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => {
      // If permalink is provided, use it
      if (doc.permalink) {
        // Ensure permalink starts with a slash but doesn't have blog duplicated
        const cleanPermalink = doc.permalink.replace(/^\/?(blog\/)?/, '/');
        return cleanPermalink;
      }
      
      // Otherwise use the flattened path, ensuring it starts with a single /blog/
      const path = doc._raw.flattenedPath;
      return path.startsWith('blog/') ? `/${path}` : `/blog/${path.replace(/^blog\//, '')}`;
    },
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => {
      if (doc.permalink) {
        // Remove leading and trailing slashes, and any blog/ prefix
        // This ensures we get just the slug part without any path structure
        return doc.permalink.replace(/^\/?(blog\/)?|\/?$/g, '');
      }
      
      // Extract just the filename without the blog/ prefix
      const pathSegments = doc._raw.flattenedPath.split('/');
      const filename = pathSegments[pathSegments.length - 1];
      
      // Remove date prefix if it exists (YYYY-MM-DD-)
      return filename.replace(/^\d{4}-\d{2}-\d{2}-/, '');
    },
  },
};

export const Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    date: {
      type: "string",
      required: true,
    },
    published: {
      type: "boolean",
      default: true,
    },
    layout: {
      type: "string",
      default: "post",
    },
    permalink: {
      type: "string",
    },
    tags: {
      type: "string",
    },
    author: {
      type: "string",
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "./src/content",
  documentTypes: [Doc],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
});
