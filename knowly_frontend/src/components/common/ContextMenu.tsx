import React from "react";
import { createPortal } from "react-dom";

interface Position {
  x: number;
  y: number;
}

interface ContextMenuProps {
  position: Position;
}

const handleOnClick = () => {
  console.log("Handle onclick");
}

const ContextMenu = ({ position, handle }) => {
  return createPortal(
    <div
      className="bg-white rounded-xs border border-stone-400 fixed z-100 hover:bg-stone-100 cursor-pointer"
      style={{ top: position.y, left: position.x }}
    >
        <span className="px-2" onClick={handleOnClick}>New row</span>
    </div>,
    document.body,
  );
};

export default ContextMenu;
