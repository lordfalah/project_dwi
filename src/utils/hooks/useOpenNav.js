"use client";

import { createContext, useContext, useState } from "react";

export const OpenNav = createContext();

export function NavigateOpen({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <OpenNav.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </OpenNav.Provider>
  );
}
