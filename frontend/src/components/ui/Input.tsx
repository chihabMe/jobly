import React from "react";

const Input = ({
    type,
    value,
    onChange,
    name,
    valid,
    placeholder,
    min,
}: {
    name: string;
    type?: string;
    value: string;
    valid?: boolean;
    placeholder?:string;
    min?:string;
    onChange: (e: any) => void;
}) => {
    return <input   min={min} placeholder={placeholder} className={` outline-none font-medium text-title dark:text-title-dark outline-gray-500 outline-1  ${valid && "outline-green-300"}  focus:outline-primary pl-2 rounded-md h-10   `} id={name} type={type} name={name} value={value} onChange={onChange} />;
};

export default Input;
