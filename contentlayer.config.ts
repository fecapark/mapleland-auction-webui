// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";

export const UpdatePost = defineDocumentType(() => ({
  name: "UpdatePost",
  filePathPattern: `**/updates/*.mdx`,
  contentType: "mdx",
  fields: {
    index: {
      type: "number",
      required: true,
    },
    title: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
  },
}));

export const NoticePost = defineDocumentType(() => ({
  name: "NoticePost",
  filePathPattern: `**/notices/*.mdx`,
  contentType: "mdx",
  fields: {
    index: {
      type: "number",
      required: true,
    },
    title: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "posts/",
  documentTypes: [UpdatePost, NoticePost],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});
