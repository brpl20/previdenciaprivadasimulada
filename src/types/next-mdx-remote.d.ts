declare module 'next-mdx-remote/rsc' {
  import { ComponentType, ReactNode } from 'react';

  export interface MDXRemoteProps {
    source: string;
    components?: Record<string, ComponentType<any>>;
  }

  export function MDXRemote(props: MDXRemoteProps): ReactNode;
}
