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
  const [isEditingContent, setisEditingContent] = useState(false);
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputHeaderRef = useRef<HTMLInputElement | null>(null);
  const [selectedRow, setSelectedRow] = useState<number>(-1);
  // Use local node data instead of real data from prop to prevent rerender
  const [localNodeData, setLocalNodeData] = useState(data.rows);
  const [localLabelData, setLocalLabelData] = useState(data.label);

  // useEffect(() => {
  //   console.log("Selected changed")
  // }, [selected])  const rows = data.rows;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowId: string,
  ) => {
    // data.updateNodeRow(id, event.target.value, rowId);
    setLocalNodeData((rows) =>
      rows.map((row) =>
        row.rowId === rowId ? { ...row, value: event.target.value } : row,
      ),
    );
  };

  const handleChangeHeader = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalLabelData(event.target.value);
  };

  const handleFocus = (index: number) => {
    setSelectedRow(index);
    setisEditingContent(true);
  };

  const handleFocusHeader = () => {
    setIsEditingHeader(true);
  };

  useEffect(() => {
    if (isEditingContent && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }

    if (isEditingHeader && inputHeaderRef.current) {
      inputHeaderRef.current.focus();
      inputHeaderRef.current.select();
    }
  }, [isEditingContent, isEditingHeader]);

  const handleOnBlur = () => {
    setisEditingContent(false);
    data.updateNodeRow(id, localNodeData);
  };

  const handleOnBlurHeader = () => {
    setIsEditingHeader(false);
    data.updateLabel(id, localLabelData);
  };

  const handleMouseDown = (
    e: React.MouseEvent<HTMLInputElement>,
    inputRef: React.RefObject<HTMLInputElement | null>,
  ) => {
    const input = inputRef.current;
    if (!input || e.detail > 1) return;

    requestAnimationFrame(() => {
      const pos = input.selectionStart ?? input.value.length;
      input.setSelectionRange(pos, pos);
    });
  };

  return (
    <div className="w-full h-full bg-white rounded-sm">
      <NodeResizer isVisible={selected} minWidth={150} minHeight={120} />

      {/* Header */}
      <div
        className="bg-[#3fc5cc] px-3 py-1 text-center rounded-t-sm"
        onDoubleClick={() => handleFocusHeader()}
      >
        {isEditingHeader ? (
          <input
            ref={inputHeaderRef}
            value={localLabelData}
            className="focus:outline-none w-full text-center"
            onChange={(e) => handleChangeHeader(e)}
            readOnly={!isEditingHeader}
            onBlur={handleOnBlurHeader}
            onClick={(e) => handleMouseDown(e, inputHeaderRef)}
          />
        ) : (
          <div>{localLabelData || "\u00A0"}</div>
        )}
      </div>

      {/* Table body */}
      <div className="flex flex-col">
        {localNodeData.map((row: NodeRow, index: number) => (
          <div
            key={row.rowId}
            className={`px-2 py-1 border-x border-[#3fc5cc] ${
              index !== localNodeData.length - 1 ? "" : "border-b"
            }`}
            onDoubleClick={() => handleFocus(index)}
          >
            {selectedRow === index ? (
              <input
                ref={inputRef}
                value={row.value}
                className="focus:outline-none w-full"
                onChange={(e) => handleChange(e, row.rowId)}
                readOnly={!isEditingContent}
                onBlur={handleOnBlur}
                onClick={(e) => handleMouseDown(e, inputRef)}
              />
            ) : (
              <span>{row.value || "\u00A0"}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableNode;
