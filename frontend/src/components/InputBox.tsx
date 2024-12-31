import React from "react";

interface InputBoxProps {
  label: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputBox: React.FC<InputBoxProps> = ({
  label,
  placeholder,
  onChange,
}) => {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        placeholder={placeholder}
        onChange={onChange}
        className="w-full border rounded border-slate-200 px-2 py-1"
        type={label === "Password" ? "password" : "text"}
      />
    </div>
  );
};
export default InputBox;
