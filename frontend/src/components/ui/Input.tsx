import { useField } from "formik";
import React, { useEffect } from "react";
interface Props {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
}
const Input = ({ type, name, label, placeholder }: Props) => {
  const [field, meta, actions] = useField({ type, name, placeholder });
  return (
    <div className="w-full flex flex-col gap-2 ">
      <label
        className={`font-medium ${
          meta.touched && meta.error && "text-red-400"
        } text-title dark:text-title-dark font-medium text-lg`}
        htmlFor=""
      >
        {label}
      </label>
      <div
        className={`rounded-sm  ${
          meta.touched && meta.error && "outline-2 outline outline-red-300"
        } 
        ${meta.touched && "outline outline-2 outline-primary"}
        `}
      >
        <input
          placeholder={placeholder}
          type={type}
          className={`w-full h-11 px-2 outline-none`}
          {...field}
        />
      </div>
      {meta.error && meta.touched && (
        <span className="text-red-400 font-medium">{meta.error}</span>
      )}
    </div>
  );
};

export default Input;
