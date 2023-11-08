"use client";

import { OpenNav } from "@/utils/hooks/useOpenNav";
import { useContext } from "react";

const BurgerMenu = () => {
  const { isOpen, setIsOpen } = useContext(OpenNav);

  const genericHamburgerLine = `h-[3px] w-6 my-0.5 rounded-full bg-white transition ease transform duration-300`;

  return (
    <button
      className="flex flex-col justify-center items-center group"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        className={`${genericHamburgerLine} ${
          isOpen
            ? "rotate-45 translate-y-1 origin-[55%] opacity-50 group-hover:opacity-100"
            : "opacity-50 group-hover:opacity-100 "
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          isOpen
            ? "-rotate-45 -translate-y-2.5 opacity-50 group-hover:opacity-100"
            : "opacity-50 group-hover:opacity-100"
        }`}
      />
    </button>
  );
};

export default BurgerMenu;
