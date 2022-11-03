import React, { ReactNode } from "react";
import {Button as DefaultButton} from "@material-tailwind/react"

const Button: React.FC<{
    className?: string;
    text?: string;
    children?: ReactNode;
    onClick?: () => void;
}> = ({ className, text, onClick, children }) => {
    return (
        <DefaultButton
            onClick={onClick}
            type='submit'
            className={`${className}  lowercase text-white bg-primary    hover:shadow-sm  hover:opacity-90   transition-all duration-100 `}
        >
            {children}
            <span>{text}</span>
        </DefaultButton>
    );
};

export default Button;
