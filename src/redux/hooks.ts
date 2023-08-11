import type { AppDispatch, RootState } from "@/redux/store";
import type { TypedUseSelectorHook} from "react-redux";
import { useDispatch, useSelector } from "react-redux";

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
