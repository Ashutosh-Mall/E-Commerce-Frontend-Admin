import React from "react";

interface InputProps {
  placeholder?: string;
  frontIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size: "sm" | "md" | "lg";
  theme: "light" | "dark";
  type?: React.HTMLInputTypeAttribute;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
  required?: boolean;
}

const defaultStyle = "flex items-center gap-2 rounded-md border";

const customStyling = {
  size: {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-md",
    lg: "px-5 py-3 text-lg",
  },
  theme: {
    light: "bg-purple-200 text-black border-purple-500",
    dark: "bg-gray-900 text-white border-gray-700",
  },
} as const;

const Input = (props: InputProps) => {
  return (
    <div
      className={`
        ${defaultStyle}
        ${customStyling.size[props.size]}
        ${customStyling.theme[props.theme]}
        ${props.className ?? ""}
      `}
    >
      {props.frontIcon}

      <input
        type={props.type ?? "text"}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        required={props.required}
        className="outline-none flex-1 bg-transparent placeholder-purple-700"
      />

      {props.rightIcon}
    </div>
  );
};

export default Input;