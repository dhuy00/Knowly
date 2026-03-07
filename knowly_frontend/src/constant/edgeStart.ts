import type { EdgeType } from "../types/diagram";
import None from "../assets/icons/startEdge/None";
import Arrow from "../assets/icons/startEdge/Arrow";
import OneOptional from '../assets/icons/startEdge/OneOptional';
import OneMandatory from '../assets/icons/startEdge/OneMandatory';
import ManyOptional from '../assets/icons/startEdge/ManyOptional';
import ManyMandatory from '../assets/icons/startEdge/ManyMandatory'

export const EDGE_START: EdgeType[] = [
  {
    id: 1,
    name: "Arrow",
    component: Arrow,
    start: "none",
  },
  {
    id: 2,
    name: "None",
    component: None,
    start: "none",
  },
  {
    id: 3,
    name: "OneOptional",
    component: OneOptional,
    start: "one",
    optionalStart: true
  },
  {
    id: 4,
    name: "OneMandatory",
    component: OneMandatory,
    start: "one",
    optionalStart: false
  },
  {
    id: 5,
    name: "ManyOptional",
    component: ManyOptional,
    start: "many",
    optionalStart: true
  },
  {
    id: 6,
    name: "ManyMandatory",
    component: ManyMandatory,
    start: "many",
    optionalStart: false
  },
];
