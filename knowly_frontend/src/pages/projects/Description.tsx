import React, { useState } from "react";
import { FiFileText, FiEdit2, FiSave, FiX } from "react-icons/fi";
import DescriptionEditor from "./DescriptionEditor";

interface DescriptionProps {
  description: string;
}

const Description = ({ description: initialDescription }: DescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(initialDescription);
  const [tempDescription, setTempDescription] = useState(initialDescription);
  const [files, setFiles] = useState<File[]>([]);

  const handleSave = () => {
    setDescription(tempDescription);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempDescription(description);
    setIsEditing(false);
  };

  // const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const uploaded = Array.from(e.target.files || []);
  //   setFiles((prev) => [...prev, ...uploaded]);
  // };

  return (
    <div className="bg-white/70 backdrop-blur rounded-md p-5 border border-gray-200">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold flex items-center gap-2 text-sm">
          <FiFileText />
          Description
        </h2>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1 text-xs text-gray-700 font-medium hover:underline 
            cursor-pointer"
          >
            <FiEdit2 size={14} />
            Edit
          </button>
        )}
      </div>

      {/* VIEW MODE */}
      {!isEditing && (
        <div
          className="text-gray-600 text-[13px] leading-relaxed prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: description || "<p>No description</p>",
          }}
        />
      )}

      {/* EDIT MODE */}
      {isEditing && (
        <div className="space-y-4">
          {/* TipTap Editor */}
          <DescriptionEditor
            content={tempDescription}
            onChange={setTempDescription}
          />

          {/* File list */}
          {files.length > 0 && (
            <div className="text-xs text-gray-500 space-y-1">
              {files.map((file, i) => (
                <div key={i}>{file.name}</div>
              ))}
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1 text-xs bg-text-primary-hover text-white
              px-4 py-1.5 rounded-sm hover:bg-text-primary-active cursor-pointer"
            >
              <FiSave size={14} />
              Save
            </button>

            <button
              onClick={handleCancel}
              className="flex items-center gap-1 text-xs border px-3 py-1.5 rounded-sm 
              hover:bg-gray-100"
            >
              <FiX size={14} />
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Description;
