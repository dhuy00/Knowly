import type { EdgeType } from "../types/diagram";
import Arrow from "../assets/icons/endEdge/Arrow";
import None from "../assets/icons/startEdge/None";
import OneOptional from "../assets/icons/endEdge/OneOptional";
import OneMandatory from "../assets/icons/endEdge/OneMandatory";
import ManyOptional from "../assets/icons/endEdge/ManyOptional";
import ManyMandatory from "../assets/icons/endEdge/ManyMandatory";

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
    component: OneOptional,
  },
  {
    id: 4,
    name: "OneMandatory",
    component: OneMandatory,
  },
  {
    id: 5,
    name: "ManyOptional",
    component: ManyOptional,
  },
  {
    id: 6,
    name: "ManyMandatory",
    component: ManyMandatory,
  },
];
