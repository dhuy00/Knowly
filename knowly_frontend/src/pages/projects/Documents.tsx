import React from "react";
import { FiPaperclip } from "react-icons/fi";
import { MdUpload } from "react-icons/md";
import { FiFileText } from "react-icons/fi";

const Documents = ({documents}) => {
  return (
    <div className="bg-white/70 rounded-md p-5 border border-gray-200">
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold flex items-center gap-2 text-sm">
          <FiPaperclip />
          Documents
        </h2>

        <button
          className="text-xs text-white bg-text-primary-hover hover:bg-text-primary-active
              cursor-pointer flex gap-1 justify-center items-center px-3 py-1.5 rounded-sm"
        >
          <MdUpload />
          <span className="no-underline">Upload</span>
        </button>
      </div>

      <div className="space-y-3">
        {documents.map((doc, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-md">
                <FiFileText size={16} />
              </div>

              <div>
                <p className="text-xs font-medium">{doc.name}</p>
                <p className="text-[10px] text-gray-500">{doc.size}</p>
              </div>
            </div>

            <button
              className="text-xs text-gray-500 font-semibold hover:underline
                  hover:text-text-primary-hover cursor-pointer"
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;
