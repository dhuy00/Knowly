import React from "react";
import { FiFileText } from "react-icons/fi";

const Description = ({description}) => {
  return (
    <div className="bg-white/70 backdrop-blur rounded-md p-5 border border-gray-200">
      <h2 className="font-semibold mb-2 flex items-center gap-2 text-sm">
        <FiFileText />
        Description
      </h2>

      <p className="text-gray-600 text-[13px] leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default Description;
