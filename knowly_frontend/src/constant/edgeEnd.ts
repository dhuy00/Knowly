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
    end: 'arrow',
  },
  {
    id: 2,
    name: "None",
    component: None,
    end: "none",
  },
  {
    id: 3,
    name: "OneOptional",
    component: OneOptional,
    end: "one",
    optionalEnd: true
  },
  {
    id: 4,
    name: "OneMandatory",
    component: OneMandatory,
    end: "one",
    optionalEnd: false
  },
  {
    id: 5,
    name: "ManyOptional",
    component: ManyOptional,
    end: "many",
    optionalEnd: true,
  },
  {
    id: 6,
    name: "ManyMandatory",
    component: ManyMandatory,
    end: "many",
    optionalEnd: false
  },
];
