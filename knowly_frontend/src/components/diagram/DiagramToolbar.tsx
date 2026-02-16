import React, { useState } from "react";
import type { AddNodeFunction } from "../../hooks/useNode";
import { IoLogoWebComponent } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineTableChart } from "react-icons/md";
import { RiStackLine } from "react-icons/ri";
import Divider from "../common/Divider";
import EdgeType from "../../assets/icons/OrthogonalEdge";
import { IoIosArrowDown } from "react-icons/io";
import OrthogonalEdge from "../../assets/icons/OrthogonalEdge";
import Selection from "./Selection";

interface DiagramToolbarProp {
  addNode: AddNodeFunction;
}

type EdgeType = {
  id: number;
  name: string;
  component: React.ComponentType<{ size?: number }>;
};

const DiagramToolbar: React.FC<DiagramToolbarProp> = ({ addNode }) => {
  const handleAddNode = (type: string) => {
    addNode(type);
  };
  const defaultEdgeTypeId = 1;

  const [openEdgeTypes, setOpenEdgeTypes] = useState<boolean>(false);
  const [currentEdgeType, setCurrentEdgeType] =
    useState<number>(defaultEdgeTypeId);

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

  const selectedEdge = edgeTypes.find((item) => item.id === currentEdgeType);
  const SelectedEdgeTypeIcon = selectedEdge?.component || OrthogonalEdge;

  const handleEdgeTypeSelect = () => {
    setOpenEdgeTypes(!openEdgeTypes);
  };

  const handleChangeEdgeType = (edgeType: number) => {
    setCurrentEdgeType(edgeType);
    setOpenEdgeTypes(false);
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

      <div className="flex items-center gap-2 py-1 px-2 hover:bg-stone-100 rounded-sm cursor-pointer">
        <MdOutlineTableChart className="text-lg text-gray-600" />
        <span className="text-common font-medium text-black">Table</span>
      </div>

      <div className="flex items-center gap-2 py-1 px-2 hover:bg-stone-100 rounded-sm cursor-pointer">
        <RiStackLine className="text-lg text-gray-600" />
        <span className="text-common font-medium text-black">Node</span>
      </div>
      <Divider />
      <span className="text-small text-text-secondary font-medium">
        Configuaration
      </span>
      <Selection
        options={edgeTypes}
        open={openEdgeTypes}
        setOpen={setOpenEdgeTypes}
        handleSelect={handleChangeEdgeType}
        CurrentValue={SelectedEdgeTypeIcon}
      />
    </div>
  );
};

export default DiagramToolbar;
