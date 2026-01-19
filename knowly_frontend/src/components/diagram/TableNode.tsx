import React, { useEffect, useRef, useState } from "react";
import { NodeResizer } from "@xyflow/react";
import type { NodeData } from "../../types/diagram";
import type { NodeRow } from "../../types/diagram";

interface TableNodeProps {
  id: string;
  data: NodeData;
  selected: boolean;
}

const TableNode: React.FC<TableNodeProps> = ({ id, data, selected }) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedRow, setSelectedRow] = useState<number>(-1);

  useEffect(() => {
    console.log("Selected changed")
  }, [selected])

  const rows = data.rows ?? [
    "id",
    "name",
    "address",
    "password",
    "phone_number",
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, rowId: string) => {
    data.updateNodeRow(id, event.target.value, rowId);
    data.updateLabel(id, event.target.value);
  };

  const handleFocus = (index: number) => {
    setSelectedRow(index)
    setIsEditing(true);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="w-full h-full bg-white rounded-sm">
      <NodeResizer isVisible={selected} minWidth={150} minHeight={120} />

      {/* Header */}
      <div className="bg-[#3fc5cc] px-3 py-1 text-center rounded-t-sm">
        {data.label ?? "Users"}
      </div>

      {/* Table body */}
      <div className="flex flex-col">
        {rows.map((row: NodeRow, index: number) => (
          <div
            key={row.rowId}
            className={`px-2 py-1 border-x border-[#3fc5cc] ${
              index !== rows.length - 1 ? "" : "border-b"
            }`}
            onDoubleClick={() => handleFocus(index)}
          >
            {selectedRow === index ? (
              <input
                ref={inputRef}
                value={row.value}
                className="focus:outline-none w-full"
                onChange={(e) => handleChange(e, row.rowId)}
                readOnly={!isEditing}
                onBlur={() => setIsEditing(false)}
              />
            ) : (
              <span>{row.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableNode;
