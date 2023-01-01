import { useField } from "formik";
import React, { useEffect } from "react";
import { Input as MatInput } from "@material-tailwind/react";
interface Props {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  Icon?: React.ReactNode;
}
const Input = ({ type, name, Icon, label, placeholder }: Props) => {
  const [field, meta, actions] = useField({ type, name, placeholder });
  return (
    <div className="w-full flex flex-col gap-2 ">
      {/* <label
        className={`font-medium ${
          meta.touched && meta.error && "text-red-400"
        } text-title dark:text-title-dark font-medium text-lg`}
        htmlFor=""
      >
        {label}
      </label> */}
      <div className="">
        <MatInput
          // color={meta.error && meta.touched ? "red" : "blue"}
          icon={Icon}
          error={meta.touched && meta.error}
          success={meta.touched && !meta.error}
          size="lg"
          label={label}
          type={type}
          className={`    text-title dark:text-title-dark `}
          {...field}
        />
      </div>
      {meta.error && meta.touched && (
        <span className="text-red-400 text-sm font-medium">{meta.error}</span>
      )}
    </div>
  );
};

export default Input;
