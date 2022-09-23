import React from "react";

const Button: React.FC<{
  className?: string;
  text: string;
  onClick?: () => void;
}> = ({ className, text, onClick }) => {
  return <button onClick={onClick} className={`${className}  px-2 py-2 rounded-md cursor-pointer hover:shadow-sm `}>{text}</button>;
};

export default Button;
