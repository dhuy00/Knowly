// NEED REFACTOR
import React, { useState } from "react";
import type { AddNodeFunction } from "../../hooks/useNode";
import { IoLogoWebComponent } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import Divider from "../common/Divider";
import OrthogonalEdge from "../../assets/icons/OrthogonalEdge";
import Selection from "./Selection";
import EndArrow from "../../assets/icons/endEdge/Arrow";
import StartArrow from "../../assets/icons/startEdge/Arrow";
import { TbColorPicker } from "react-icons/tb";
import { EDGE_TYPES } from "../../constant/edgeTypes";
import { NODE_TYPES } from "../../constant/nodeTypes";
import { EDGE_START } from "../../constant/edgeStart";
import { EDGE_END } from "../../constant/edgeEnd";
import { EDGE_CONFIG } from "../../constant/diagram";

interface DiagramToolbarProp {
  addNode: AddNodeFunction;
}

const DEFAULT_EDGE_TYPE = 1;
const DEFAULT_EDGE_START = 1;
const DEFAULT_EDGE_END = 1;

const DiagramToolbar: React.FC<DiagramToolbarProp> = ({ addNode }) => {
  const handleAddNode = (type: string) => {
    addNode(type);
  };

  const [openDropdown, setOpenDropdown] = useState<
    "edgeType" | "edgeStart" | "edgeEnd" | null
  >(null);

  const [edgeConfig, setEdgeConfig] = useState({
    type: DEFAULT_EDGE_TYPE,
    start: DEFAULT_EDGE_START,
    end: DEFAULT_EDGE_END,
  });

  const selectedEdge = EDGE_TYPES.find((item) => item.id === edgeConfig.type);
  const selectedEdgeStart = EDGE_START.find(
    (item) => item.id === edgeConfig.start,
  );
  const selectedEdgeEnd = EDGE_END.find((item) => item.id === edgeConfig.end);

  const SelectedEdgeTypeIcon = selectedEdge?.component || OrthogonalEdge;
  const SelecedEdgeStartIcon = selectedEdgeStart?.component || StartArrow;
  const SelecedEdgeEndIcon = selectedEdgeEnd?.component || EndArrow;

  const toggleDropdown = (type: "edgeType" | "edgeStart" | "edgeEnd") => {
    setOpenDropdown((prev) => (prev === type ? null : type));
  };

  const handleChange = (key: "type" | "start" | "end", value: number) => {
    setEdgeConfig((prev) => ({ ...prev, [key]: value }));
    setOpenDropdown(null);
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

      {NODE_TYPES.map((nodeType, index) => {
        const Icon = nodeType.icon;
        return (
          <div
            key={index}
            className="flex items-center gap-2 py-1 px-2 hover:bg-stone-100 rounded-sm cursor-pointer"
            onClick={() => handleAddNode(nodeType.name.toLowerCase())}
          >
            <Icon className="text-lg text-gray-600" />
            <span className="text-common font-medium text-black">
              {nodeType.name}
            </span>
          </div>
        );
      })}
      <Divider />
      <span className="text-small text-text-secondary font-medium">
        Configuaration
      </span>
      <div className="flex gap-1">
        <Selection
          type={EDGE_CONFIG.EDGE_TYPE}
          options={EDGE_TYPES}
          open={openDropdown === "edgeType"}
          setOpen={() => toggleDropdown("edgeType")}
          handleSelect={handleChange}
          CurrentValue={SelectedEdgeTypeIcon}
        />
        <Selection
          type={EDGE_CONFIG.EDGE_START}
          options={EDGE_START}
          open={openDropdown === "edgeStart"}
          setOpen={() => toggleDropdown("edgeStart")}
          handleSelect={handleChange}
          CurrentValue={SelecedEdgeStartIcon}
        />
        <Selection
          type={EDGE_CONFIG.EDGE_END}
          options={EDGE_END}
          open={openDropdown === "edgeEnd"}
          setOpen={() => toggleDropdown("edgeEnd")}
          handleSelect={handleChange}
          CurrentValue={SelecedEdgeEndIcon}
        />
      </div>
      <span className="text-small text-text-secondary font-medium">Color</span>
      <label
        className="flex gap-1 items-center border border-text-secondary w-fit rounded-xs px-0.5
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
