import type { ReactNode } from "react";

export interface NavItem {
  id: string | number;
  name: string;
  path: string;
  icon: ReactNode;
}
