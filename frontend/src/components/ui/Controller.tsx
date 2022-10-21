import React, { ReactNode } from "react";

const Controller = ({
    text,
    htmlFor,
    children,
    error,
}: {
    text: string;
    htmlFor: string;
    children: ReactNode;
    error?: string[];
}) => {
    return (
        <div className="flex flex-col gap-1 w-full    ">
            <label
                className="capitalize font-medium text-base text-title"
                htmlFor={htmlFor}
            >
                {text} :
            </label>
            {children}
            {error?.map((item) => {
                return <span className="text-red-300  text-sm">- {item}</span>;
            })}
        </div>
    );
};

export default Controller;
