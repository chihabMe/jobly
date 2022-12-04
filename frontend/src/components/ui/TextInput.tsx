import React, { FormEvent } from "react";

const TextInput = ({
  placeholder,
  name,
  onChange,
  value,
}: {
  placeholder: string;
  name: string;
  onChange: (e: FormEvent) => void;
  value: string;
}) => {
  return (
    <textarea
      className=" resize-none outline-none outline-1 outline-gray-500 focus:outline-primary  rounded-md h-52 block p-2.5                "
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      value={value}
    />
  );
};

export default TextInput;
