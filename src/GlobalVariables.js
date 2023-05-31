import { createContext } from "react";
import { SearchFilter } from "./models/SearchFilter";

export const globalSearchFilter = createContext(new SearchFilter("", 10, 0, "", "name"));
export const displayProducts=createContext([]);