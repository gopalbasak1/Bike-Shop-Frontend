import { ReactNode } from "react";

export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TUserPaths = {
  name?: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPaths[];
};

export type TSidebarItem =
  | {
      key: string | undefined;
      label: ReactNode;
      children?: TSidebarItem[];
    }
  | undefined;
