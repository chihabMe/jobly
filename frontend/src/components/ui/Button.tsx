import React, { ReactNode } from "react";

const Button: React.FC<{
  className?: string;
  text: string;
  children?: ReactNode;
  onClick?: () => void;
}> = ({ className, text, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`${className}  text-white  px-2 py-2 rounded-md cursor-pointer hover:shadow-sm flex gap-2 items-center  `}
    >
      {children}
      <span>
      {text}
      </span>
    </button>
  );
};

export default Button;
