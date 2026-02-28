// NEED REFACTOR
import React, { useState } from "react";
import type { AddNodeFunction } from "../../hooks/useNode";
import { IoLogoWebComponent } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineTableChart } from "react-icons/md";
import { RiStackLine } from "react-icons/ri";
import Divider from "../common/Divider";
import EdgeType from "../../assets/icons/OrthogonalEdge";
import OrthogonalEdge from "../../assets/icons/OrthogonalEdge";
import Selection from "./Selection";
import None from "../../assets/icons/startEdge/None";
import EndArrow from "../../assets/icons/endEdge/Arrow";
import StartArrow from "../../assets/icons/startEdge/Arrow";
import { TbColorPicker } from "react-icons/tb";

interface DiagramToolbarProp {
  addNode: AddNodeFunction;
}

type EdgeType = {
  id: number;
  name: string;
  component: React.ComponentType<{ size?: number }>;
};

type NodeType = {
  id: number;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
};

const DiagramToolbar: React.FC<DiagramToolbarProp> = ({ addNode }) => {
  const handleAddNode = (type: string) => {
    addNode(type);
  };

  const defaultEdgeTypeId = 1;
  const defaultEdgeStart = 1;
  const defaultEdgeEnd = 1;

  const [openEdgeTypes, setOpenEdgeTypes] = useState<boolean>(false);
  const [openEdgeStart, setOpenEdgeStart] = useState<boolean>(false);
  const [openEdgeEnd, setOpenEdgeEnd] = useState<boolean>(false);

  const [currentEdgeType, setCurrentEdgeType] =
    useState<number>(defaultEdgeTypeId);
  const [currentEdgeStart, setCurrentEdgeStart] =
    useState<number>(defaultEdgeStart);
  const [currentEdgeEnd, setCurrentEdgeEnd] = useState<number>(defaultEdgeEnd);

  const edgeTypes: EdgeType[] = [
    {
      id: 1,
      name: "Orthogonal",
      component: OrthogonalEdge,
    },
    {
      id: 2,
      name: "Orthogonal",
      component: OrthogonalEdge,
    },
    {
      id: 3,
      name: "Orthogonal",
      component: OrthogonalEdge,
    },
    {
      id: 4,
      name: "Orthogonal",
      component: OrthogonalEdge,
    },
    {
      id: 5,
      name: "Orthogonal",
      component: OrthogonalEdge,
    },
    {
      id: 6,
      name: "Orthogonal",
      component: OrthogonalEdge,
    },
  ];

  const nodeTypes: NodeType[] = [
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

  const edgeSymbolStart: EdgeType[] = [
    {
      id: 1,
      name: "Arrow",
      component: StartArrow,
    },
    {
      id: 2,
      name: "None",
      component: None,
    },
    {
      id: 3,
      name: "None",
      component: None,
    },
    {
      id: 4,
      name: "None",
      component: None,
    },
    {
      id: 5,
      name: "None",
      component: None,
    },
  ];

  const edgeSymbolEnd: EdgeType[] = [
    {
      id: 1,
      name: "Arrow",
      component: EndArrow,
    },
    {
      id: 2,
      name: "Orthogonal",
      component: OrthogonalEdge,
    },
    {
      id: 3,
      name: "Orthogonal",
      component: OrthogonalEdge,
    },
    {
      id: 4,
      name: "Orthogonal",
      component: OrthogonalEdge,
    },
    {
      id: 5,
      name: "Orthogonal",
      component: OrthogonalEdge,
    },
    {
      id: 6,
      name: "Orthogonal",
      component: OrthogonalEdge,
    },
  ];

  const selectedEdge = edgeTypes.find((item) => item.id === currentEdgeType);
  const selectedEdgeStart = edgeSymbolStart.find(
    (item) => item.id === currentEdgeStart,
  );
  const selectedEdgeEnd = edgeSymbolEnd.find(
    (item) => item.id === currentEdgeEnd,
  );

  const SelectedEdgeTypeIcon = selectedEdge?.component || OrthogonalEdge;
  const SelecedEdgeStartIcon = selectedEdgeStart?.component || StartArrow;
  const SelecedEdgeEndIcon = selectedEdgeEnd?.component || EndArrow;

  const handleEdgeTypeSelect = () => {
    setOpenEdgeTypes(!openEdgeTypes);
  };

  const handleEdgeStartSelect = () => {
    setOpenEdgeStart(!openEdgeStart);
  };

  const handleEdgeEndSelect = () => {
    setOpenEdgeEnd(!openEdgeEnd);
  };

  const handleChangeEdgeType = (edgeType: number) => {
    setCurrentEdgeType(edgeType);
    setOpenEdgeTypes(false);
  };

  const handleChangeEdgeStart = (type: number) => {
    setCurrentEdgeStart(type);
    setOpenEdgeStart(false);
  };

  const handleChangeEdgeEnd = (type: number) => {
    setCurrentEdgeEnd(type);
    setOpenEdgeEnd(false);
  };

  return (
    <div className="shadow-sm gap-2 w-62 rounded-md flex flex-col overflow-hidden bg-background-primary px-3">
      <div className="w-full text-sm font-semibold py-2 flex items-center gap-2">
        <span className="bg-indigo-600 text-white p-1 rounded-sm">
          <IoLogoWebComponent className="text-xl" />
        </span>
        <div className="flex flex-col">
          <span className="leading-none">components</span>
          <span className="leading-none text-small text-gray-500">diagram</span>
        </div>
      </div>
      {/* Search bar */}
      <div className="flex bg-[#F6F6F6] gap-2 justify-center items-center px-2 py-1 rounded-sm border border-gray-300">
        <IoSearchOutline className="text-xl" />
        <input
          type="text"
          className="w-full focus:outline-none placeholder:text-small placeholder:font-semibold text-small text-text-secondary
        font-semibold"
          placeholder="Search"
        />
      </div>

      {nodeTypes.map((nodeType, index) => {
        const Icon = nodeType.icon;
        return (<div
          className="flex items-center gap-2 py-1 px-2 hover:bg-stone-100 rounded-sm cursor-pointer"
          onClick={() => handleAddNode(nodeType.name.toLowerCase())}
        >
          <Icon className="text-lg text-gray-600" />
          <span className="text-common font-medium text-black">{nodeType.name}</span>
        </div>)
        
      })}

      {/* <div
        className="flex items-center gap-2 py-1 px-2 hover:bg-stone-100 rounded-sm cursor-pointer"
        onClick={() => handleAddNode("table")}
      >
        <MdOutlineTableChart className="text-lg text-gray-600" />
        <span className="text-common font-medium text-black">Table</span>
      </div>

      <div className="flex items-center gap-2 py-1 px-2 hover:bg-stone-100 rounded-sm cursor-pointer">
        <RiStackLine className="text-lg text-gray-600" />
        <span className="text-common font-medium text-black">Node</span>
      </div> */}
      <Divider />
      <span className="text-small text-text-secondary font-medium">
        Configuaration
      </span>
      <div className="flex gap-1">
        <Selection
          options={edgeTypes}
          open={openEdgeTypes}
          setOpen={handleEdgeTypeSelect}
          handleSelect={handleChangeEdgeType}
          CurrentValue={SelectedEdgeTypeIcon}
        />
        <Selection
          options={edgeSymbolStart}
          open={openEdgeStart}
          setOpen={handleEdgeStartSelect}
          handleSelect={handleChangeEdgeStart}
          CurrentValue={SelecedEdgeStartIcon}
        />
        <Selection
          options={edgeSymbolEnd}
          open={openEdgeEnd}
          setOpen={handleEdgeEndSelect}
          handleSelect={handleChangeEdgeEnd}
          CurrentValue={SelecedEdgeEndIcon}
        />
      </div>
      <span className="text-small text-text-secondary font-medium">Color</span>
      <label
        className="flex gap-1 items-center border border-text-secondary w-fit rounded-xs px-[2px]
      hover:bg-gray-100 cursor-pointer"
        htmlFor="color-picker"
      >
        <input id="color-picker" type="color" />
        <TbColorPicker />
      </label>
    </div>
  );
};

export default DiagramToolbar;
