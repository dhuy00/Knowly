import type { NodeType } from "../types/diagram";
import { MdOutlineTableChart } from "react-icons/md";
import { RiStackLine } from "react-icons/ri";

export const NODE_TYPES: NodeType[] = [
  {
    id: 1,
    name: "Table",
    icon: MdOutlineTableChart,
  },
  {
    id: 2,
    name: "Text",
    icon: RiStackLine,
  },
];
