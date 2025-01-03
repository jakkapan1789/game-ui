import { useContext } from "react";
import { LoadingContext } from "./contexts";
export const useLoading = () => useContext(LoadingContext);
