import { BiCategory } from "react-icons/bi";
import { LuClipboardList } from "react-icons/lu";
import { IoDocumentAttachOutline, IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineFolderOpen, MdInfoOutline } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import type { NavItem } from "../types/Sidebar";


export const navigations: NavItem[] = [
  {
    id: 1,
    name: "Dashboard",
    path: '/dashboard',
    icon: <BiCategory />
  },
  {
    id: 2,
    name: "Todo list",
    path: '/todo-list',
    icon: <LuClipboardList />
  },
  {
    id: 3,
    name: "Notes",
    path: '/notes',
    icon: <IoDocumentAttachOutline />
  },
  {
    id: 4,
    name: "Projects",
    path: '/projects',
    icon: <MdOutlineFolderOpen />
  },
]

export const subNavigations: NavItem[] = [
  {
    id: 5,
    name: "Notifications",
    path: '/notifications',
    icon: <IoNotificationsOutline />
  },
  {
    id: 6,
    name: "Settings",
    path: '/settings',
    icon: <IoSettingsOutline />
  },
  {
    id: 7,
    name: "Support",
    path: '/support',
    icon: <MdInfoOutline />
  },
]