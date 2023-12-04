"use client";

import { usePathname } from "next/navigation";
import { nav_link } from "./SideNav";

const BreadCrumb = () => {
  const pathname = usePathname();
  const route = nav_link.route_dash.find(({ path, route_child, name }) => {
    if (path === pathname) {
      return name;
    } else {
      return route_child
        ? route_child.path === pathname
        : path
        ? route_child
        : name;
    }
  });

  const name_route = route?.route_child?.name
    ? route.route_child.path === pathname
      ? route.route_child.name
      : route.name
    : route?.name;

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
          {name_route}
        </li>
      </ol>
      <h6 className="mb-0 font-bold text-white capitalize">{name_route}</h6>
    </nav>
  );
};

export default BreadCrumb;
