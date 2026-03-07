import type { EdgeType } from "../types/diagram";
import Arrow from "../assets/icons/endEdge/Arrow";
import None from "../assets/icons/startEdge/None";

export const EDGE_END: EdgeType[] = [
  {
    id: 1,
    name: "Arrow",
    component: Arrow,
  },
  {
    id: 2,
    name: "None",
    component: None,
  },
  {
    id: 3,
    name: "OneOptional",
    component: None,
  },
  {
    id: 4,
    name: "OneMandatory",
    component: None,
  },
  {
    id: 5,
    name: "ManyOptional",
    component: None,
  },
  {
    id: 6,
    name: "ManyOptional",
    component: None,
  },
];
