import type { ReactNode } from "react";
import { BiCategory } from "react-icons/bi";

export interface NavItem {
  id: string | number;
  name: string;
  path: NamedCurve;
  icon: ReactNode;
}

const navigations: NavItem[] = [
  {
    id: 1,
    name: "Dashboard",
    path: '/dashboard',
    icon: <BiCategory />
  },
  {
    id: 2,
    name: "Dashboard",
    path: '/dashboard',
    icon: <BiCategory />
  },
  {
    id: 3,
    name: "Dashboard",
    path: '/dashboard',
    icon: <BiCategory />
  },
  {
    id: 4,
    name: "Dashboard",
    path: '/dashboard',
    icon: <BiCategory />
  },
]

export default navigations