import { ReactNode } from 'react';

export namespace TypeLayout {
  export type LayoutProps = {
    appBarText: string;
    items: {
      text: string;
      Icon: React.ElementType;
      path: string;
    }[];
    children: ReactNode;
  };
}
