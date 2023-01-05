import React, { ReactNode } from "react";
import { Button as DefaultButton } from "@material-tailwind/react";

const Button: React.FC<{
  className?: string;
  text?: string;
  disabled?: boolean;
  children?: ReactNode;
  onClick?: () => void;
}> = ({ className, disabled, text, onClick, children }) => {
  return (
    <DefaultButton
      onClick={onClick}
      disabled={disabled}
      type="submit"
      className={`${className} rounded-md   lowercase text-white bg-primary    hover:shadow-sm  hover:opacity-90   transition-all duration-100 `}
    >
      {children}
      <span>{text}</span>
    </DefaultButton>
  );
};

export default Button;
