"use client";

import { usePathname } from "next/navigation";
import { nav_link } from "./SideNav";

const BreadCrumb = () => {
  const pathname = usePathname();
  const { name } = nav_link.route_dash.find((route) => route.path === pathname);
  return (
    <nav>
      <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
        <li className="text-sm leading-normal">
          <a className="text-white opacity-50">Pages</a>
        </li>

        <li
          className="text-sm pl-2 capitalize leading-normal text-white before:float-left before:pr-2 before:text-white before:content-['/']"
          aria-current="page"
        >
          {name ? name : null}
        </li>
      </ol>
      <h6 className="mb-0 font-bold text-white capitalize">
        {name ? name : null}
      </h6>
    </nav>
  );
};

export default BreadCrumb;
