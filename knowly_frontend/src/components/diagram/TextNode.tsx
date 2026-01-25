import React, { useEffect, useRef, useState } from "react";
import { NodeResizer, Handle, Position } from "@xyflow/react";
import type { NodeData } from "../../types/diagram";

interface CustomNodeProps {
  id: string;
  data: NodeData;
  selected: boolean
}

const TextNode: React.FC<CustomNodeProps> = ({ id, data, selected }) => {
  const [value, setValue] = useState(data.label);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    data.updateLabel(id, event.target.value);
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  return (
    <div className="focus:outline-none px-2 py-1 w-[180px] bg-[#3fc5cc]" onDoubleClick={handleFocus}>
      <NodeResizer isVisible={selected} minHeight={30} minWidth={100}/>
      <Handle type="target" position={Position.Top}/>
      <Handle type="source" position={Position.Bottom}/>
      {isEditing ? (
        <input
          ref={inputRef}
          value={value}
          className="focus:outline-none w-full"
          onChange={(e) => handleChange(e)}
          readOnly={!isEditing}
          onBlur={() => setIsEditing(false)}
        />
      ) : (
        <span> {data.label} </span>
      )}
    </div>
  );
};

export default TextNode;
