import React, {
  FormEvent,
  Fragment,
  useCallback,
  useEffect,
  useState,
} from "react";
import Button from "src/components/ui/Button";
import SelectMenu from "src/components/ui/SelectMenu";
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Field from "src/models/Field";

const getIndex = (array: Field[], value: string) => {
  array.forEach((item) => {
    if (item.name == value) return item.number;
  });
  return 0;
};
const JobSearch = ({
  location,
  query,
}: {
  location?: string;
  query?: string;
}) => {
  const [locations, setLocations] = useState([]);
  const router = useRouter();
  const [form, setForm] = useState({
    location: location
      ? { name: location, number: getIndex(locations, location) }
      : { name: "chose", number: 0 },
    query: query || "",
  });
  useEffect(() => {
    fetch("/api/locations")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data);
      });
  }, []);
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const query = {
      location: form.location.name.toLowerCase()=="chose"?"":form.location.name,
      query: form.query,
    };

    router.push(`/search?location=${query.location}&query=${query.query}`);
  };
  const [editing, setEditing] = useState(false);
  const changeLocation = useCallback((value: Field) => {
    setForm((prev) => ({ ...prev, location: value }));
  }, []);

  const onChangeQuery = (e: any) => {
    setForm((prev) => ({ ...prev, query: e.target.value }));
  };

  return (
    <form
      onSubmit={submitHandler}
      className={`w-full  px-4 max-w-screen-lg  mx-auto bg-bg dark:bg-bg-dark    outline-0 ${
        editing && ""
      }  outline outline-primary  bg-bg flex  flex-col  px-4 py-3  md:flex-row gap-4  justify-between items-center  rounded-lg`}
    >
      <div className="my-2  w-full md:w-auto outline-1 outline-primary outline rounded-md">
        <input
          value={form.query}
          onChange={onChangeQuery}
          onFocus={() => {
            setEditing(true);
          }}
          onBlur={() => {
            setEditing(false);
          }}
          type="text"
          className="w-full md:w-80  py-4 bg-transparent outline-none rounded-md px-4 text-title dark:text-title-dark"
          placeholder="job title or company..."
        />
      </div>

      <div className="my-2 z-10  w-full md:w-80 py-4 px-4 outline-1 outline-primary outline rounded-md">
        <SelectMenu
          value={form.location}
          changeValue={changeLocation}
          fields={locations}
          Icon={MapPinIcon}
        />
      </div>
      <Button
        text="search"
        className="rounded-lg flex  gap-2 items-center font-medium  hover:opacity-75 transition-all duration-150  bg-primary px-4  justify-center md:px-7 capitalize py-3 md:py-4 w-full md:w-auto"
      >
        <MagnifyingGlassIcon className="w-4 h-4 mt-1   " />
      </Button>
    </form>
  );
};

export default JobSearch;
