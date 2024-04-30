import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'


export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `/blog/posts/${post._raw.flattenedPath}` },
  },
}))

export default makeSource({ 
  contentDirPath: 'posts', 
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [
      remarkMath,
    ],
    //@ts-ignore
    rehypePlugins: [rehypeKatex],
  }
})