"use client";

import { usePathname } from "next/navigation";
import Monitor from "@/assets/icon/Monitor";
import Table from "@/assets/icon/Table";
import Link from "next/link";
import React, { useContext, useEffect, useRef } from "react";
import { OpenNav } from "@/utils/hooks/useOpenNav";
import Image from "next/image";

export const nav_link = {
  route_dash: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Monitor className="w-5 h-5 stroke-blue-500/90" />,
      route_child: {
        name: "Form",
        path: "/dashboard/form",
      },
    },
    {
      name: "Table Dokter",
      path: "/dashboard/datadokter",
      icon: <Table className="w-5 h-5 stroke-orange-400/90" />,
    },
    {
      name: "Table Pasien",
      path: "/dashboard/datapasien",
      icon: <Table className="w-5 h-5 stroke-orange-400/90" />,
    },
    {
      name: "Table Obat",
      path: "/dashboard/dataobat",
      icon: <Table className="w-5 h-5 stroke-orange-400/90" />,
    },
  ],
};

const SideNav = () => {
  const pathname = usePathname();
  const { isOpen, setIsOpen } = useContext(OpenNav);

  let menuRef = useRef(null);
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) setIsOpen(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuRef]);

  return (
    <aside
      ref={menuRef}
      className={`fixed inset-y-4 pb-4 overflow-y-auto antialiased transition-transform duration-200 -translate-x-full bg-white border-0 shadow-xl dark:shadow-none dark:bg-slate-850 max-w-[280px] rounded-2xl xl:translate-x-0 w-full z-50 ${
        isOpen ? "translate-x-0 ml-6" : "-translate-x-full xl:ml-6"
      }`}
      aria-expanded="false"
    >
      <div className="">
        <div>
          <div className="h-19 p-6">
            <div className="flex items-center ">
              <Image
                src={"/image/logo/klinik-gigi.png"}
                width={200}
                height={200}
                priority
                className="w-20 aspect-square"
                alt="logo"
                style={{
                  objectFit: "cover",
                  backgroundBlendMode: "color-burn",
                }}
              />
              <span className="ml-1 font-semibold transition-all duration-200 ease-nav-brand">
                Klinik Bwin
              </span>
            </div>
          </div>
          <hr className="h-px mt-0 mb-5 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
        </div>
        <div className="">
          <ul className="flex flex-col pl-0 mb-0">
            {nav_link.route_dash.map(({ path, name, icon }, idx) => (
              <li key={`${idx}~${name}`} className="w-full">
                <Link
                  href={path}
                  className={`py-3.5 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 text-slate-700 transition-colors  ${
                    pathname === path
                      ? "bg-blue-500/20 font-semibold"
                      : "hover:bg-blue-500/10"
                  }`}
                >
                  <div className="mr-2 flex items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                    {icon}
                  </div>
                  <span>{name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default SideNav;
