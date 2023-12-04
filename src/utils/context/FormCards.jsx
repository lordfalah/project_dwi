"use client";

import { createContext, useState } from "react";

// Buat context baru
export const CardsContext = createContext();

// Buat provider untuk menyediakan state dan fungsi-fungsi yang akan digunakan
export const FormCardsProvider = ({ children }) => {
  const [data, setData] = useState({
    dokterId: "",
    pasienId: "",
    obatId: "",
    createdAt: "",
  });

  return (
    <CardsContext.Provider value={{ data, setData }}>
      {children}
    </CardsContext.Provider>
  );
};
