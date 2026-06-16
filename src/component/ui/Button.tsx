import React from "react";

interface ButtonProps {
  text: string;
  frontIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size: "sm" | "md" | "lg";
  wide?: boolean;
  theme: "light" | "dark";
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
}

const defaultStyle = "flex items-center justify-center rounded-md gap-2";

const customStyling = {
  size: {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-md",
    lg: "px-6 py-3 text-lg",
  },
  wide: "w-full",
  theme: {
    light: "bg-gray-200 text-black",
    dark: "bg-purple-600 text-white",
  },
} as const;

const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className={`
        ${defaultStyle}
        ${customStyling.size[props.size]}
        ${customStyling.theme[props.theme]}
        ${props.wide ? customStyling.wide : ""}
      `}
    >
      {props.frontIcon}
      <span>{props.text}</span>
      {props.rightIcon}
    </button>   
  );
};

export default Button;
