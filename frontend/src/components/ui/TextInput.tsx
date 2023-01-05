import { Textarea } from "@material-tailwind/react";
import { useField } from "formik";
import React, { FormEvent } from "react";

interface Props {
  placeholder: string;
  name: string;
  label: string;
}
const TextInput = ({ placeholder, name, label }: Props) => {
  const [field, meta] = useField({ name, placeholder });
  return (
    <div className="">
      <Textarea
        size="lg"
        {...field}
        error={meta.touched && meta.error != undefined}
        label={label}
        className={` bg-bg dark:bg-bg-dark   text-title dark:text-title-dark `}
      />
      {meta.error && meta.touched && (
        <span className="text-red-400 text-sm font-medium">{meta.error}</span>
      )}
    </div>
  );
};

export default TextInput;
