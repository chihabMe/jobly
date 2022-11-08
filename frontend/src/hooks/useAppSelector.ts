import { useSelect } from "@material-tailwind/react";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from "src/store";

const useAppSelector :TypedUseSelectorHook<RootState>=useSelector;
export default useAppSelector