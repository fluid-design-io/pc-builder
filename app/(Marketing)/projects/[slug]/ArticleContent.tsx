'use client';

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';

export function ArticleContent({ content }: { content: MDXRemoteProps }) {
  return <MDXRemote {...content} />;
}
