import { createContext } from "react";

export interface ContextType {
  leftWidth: number | undefined;
  setLeftWidth: (value: number) => void;
}

export const splitPaneContext = createContext<ContextType | undefined>(
  undefined
);
