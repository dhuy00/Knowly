import React, { useState } from "react";
import { FiFileText, FiEdit2, FiUpload, FiSave, FiX } from "react-icons/fi";
import TextEditor from "../../components/notes/TextEditor";

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...uploaded]);
  };

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
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
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
          <TextEditor
            content={tempDescription}
            onChange={setTempDescription}
          />

          {/* Upload file */}
          <label className="flex items-center gap-2 text-xs cursor-pointer text-gray-600 hover:text-gray-800">
            <FiUpload size={14} />
            Upload file
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>

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
              className="flex items-center gap-1 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700"
            >
              <FiSave size={14} />
              Save
            </button>

            <button
              onClick={handleCancel}
              className="flex items-center gap-1 text-xs border px-3 py-1.5 rounded-md hover:bg-gray-100"
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