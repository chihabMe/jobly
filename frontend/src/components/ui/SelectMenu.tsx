import { Listbox } from "@headlessui/react";
import React, {
  FC,
  Fragment,
  ReactNode,
  SVGProps,
  useEffect,
  useState,
} from "react";
import Field from "src/models/Field";

const SelectMenu = ({
  fields,
  Icon,
  changeValue,
  value,
}: {
  fields: Field[];
  changeValue: (value: Field) => void;
  value: Field;
  Icon?: FC<{ className: string }>;
}) => {
  const [selectedField, setSelectedField] = useState(value);
  useEffect(() => {
    changeValue(selectedField);
  }, [selectedField]);
  return (
    <Listbox
      as="div"
      className="  relative w-full    "
      value={selectedField}
      onChange={setSelectedField}
    >
      <Listbox.Button className="capitalize flex items-center text-title dark:text-title-dark gap-2 hover:text-primary">
        {Icon && <Icon className="w-4 h-4" />} {selectedField.name}
      </Listbox.Button>
      <Listbox.Options
        as="ul"
        className=" bg-bg w-60 absolute shadow-lg   shadow-primary left-1/2 -translate-x-1/2 mt-10 py-2   rounded-md  max-h-52 overflow-y-scroll top-full  "
      >
        {fields?.map((item, index) => (
          <Listbox.Option
            key={item.name + item.number.toString()}
            as={Fragment}
            value={item}
          >
            {({ active, selected }) => (
              <li
                className={` ${
                  (active || selected) && "bg-primary text-title-dark"
                } text-title m-1 px-2 rounded-md py-2 cursor-pointer`}
              >
                {item.number} {item.name}
              </li>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};

export default SelectMenu;
