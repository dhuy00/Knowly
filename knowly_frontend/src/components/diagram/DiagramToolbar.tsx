// NEED REFACTOR
import React, { useEffect, useState } from "react";
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
import eventBus from "../../utils/eventBus";
import {
  UPDATE_SELECTED_NODE,
  UPDATE_NODE_COLOR,
  UPDATE_TEXT_NODE_COLOR,
  UPDATE_EDGE_END,
  UPDATE_EDGE_START,
  UPDATE_SELECTED_EDGE,
} from "../../constant/event";

interface DiagramToolbarProp {
  addNode: AddNodeFunction;
}

const DEFAULT_EDGE_TYPE = 1;
const DEFAULT_EDGE_START = 1;
const DEFAULT_EDGE_END = 1;

const DiagramToolbar: React.FC<DiagramToolbarProp> = ({ addNode }) => {
  //Declaration
  const handleAddNode = (type: string) => {
    addNode(type);
  };

  const [openDropdown, setOpenDropdown] = useState<
    "edgeType" | "edgeStart" | "edgeEnd" | null
  >(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedTextColor, setSelectedTextColor] = useState<string>("");
  const [selectedEdgeId, setSelectedEdgeId] = useState<string>("");

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

  const handleChangeColor = (e) => {
    const color = e.target.value;
    setSelectedColor(color);
  };

  const handleChangeTextColor = (e) => {
    const color = e.target.value;
    setSelectedTextColor(color);
  };

  //Event handler
  useEffect(() => {
    const updateSelectedNode = eventBus.on(UPDATE_SELECTED_NODE, (nodes) => {
      if (nodes.length > 0) {
        const Bgcolor = nodes[0].data.color;
        const textColor = nodes[0].data.textColor;
        setSelectedColor(Bgcolor);
        setSelectedTextColor(textColor);
      }
    });

    const updateSelectedEdge = eventBus.on(UPDATE_SELECTED_EDGE, (edgeId) => {
      if (edgeId) {
        setSelectedEdgeId(edgeId);
      }
    });

    return () => {
      updateSelectedNode();
      updateSelectedEdge();
    };
  }, []);

  const handleChange = (key: "type" | "start" | "end", value: number) => {
    setEdgeConfig((prev) => ({ ...prev, [key]: value }));

    if (!selectedEdgeId) return

    if (key === "start") {
      const edge = EDGE_START.find((item) => item.id == value);
      const data = {
        edge: edge,
        edgeId: selectedEdgeId
      }
      eventBus.emit(UPDATE_EDGE_START, data);
    } else if (key === "end") {
      const edge = EDGE_START.find((item) => item.id == value);
      const data = {
        edge: edge,
        edgeId: selectedEdgeId
      }
      eventBus.emit(UPDATE_EDGE_END, data);
    }

    setOpenDropdown(null);
  };

  const handleFinishSelectingColor = () => {
    eventBus.emit(UPDATE_NODE_COLOR, selectedColor); // emit once
  };

  const handleFinishSelectingTextColor = () => {
    eventBus.emit(UPDATE_TEXT_NODE_COLOR, selectedTextColor); // emit once
  };

  //HTML
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
        <input
          id="color-picker"
          type="color"
          value={selectedColor}
          onChange={handleChangeColor}
          onBlur={handleFinishSelectingColor}
        />
        <TbColorPicker />
      </label>
      <span className="text-small text-text-secondary font-medium">
        Text Color
      </span>
      <label
        className="flex gap-1 items-center border border-text-secondary w-fit rounded-xs px-0.5
      hover:bg-gray-100 cursor-pointer"
        htmlFor="color-picker-text"
      >
        <input
          id="color-picker-text"
          type="color"
          value={selectedTextColor}
          onChange={handleChangeTextColor}
          onBlur={handleFinishSelectingTextColor}
        />
        <TbColorPicker />
      </label>
    </div>
  );
};

export default DiagramToolbar;
