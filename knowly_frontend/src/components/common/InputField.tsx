import React from "react";

interface InputFieldProps {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  className?: string;
  rows?: number; 
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
  className = "",
  rows = 4,
}) => {
  const style = `border border-border-secondary rounded-md px-2 py-1.5 outline-none 
                transition-all focus:ring-1 focus:ring-gray-500 text-common`
  return (
    <div className="flex flex-col gap-2 mt-4">
      <label className="font-medium text-common">{label}</label>

      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={` ${style} ${className}`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`${style} ${className}`}
        />
      )}
    </div>
  );
};

export default InputField;
