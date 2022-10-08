import React from "react";

const Input = ({
  type,
  value,
  onChange,
  name,
  valid,
}: {
  name: string;
  type?: string;
  value: string;
  valid?:boolean;
  onChange: (e:any) => void;
}) => {
  return <input className={`outline-none ${valid && "outline-green-300"}  focus:outline-primary pl-2 rounded-md h-9  `} id={name} type={type} name={name} value={value} onChange={onChange} />;
};

export default Input;