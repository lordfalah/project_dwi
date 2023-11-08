import User from "@/assets/icon/User";
import React from "react";

const HoverDevCards = () => {
    return (
        <div className="p-4">
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                <Card title="Account" subtitle="Manage profile" href="#" />
            </div>
        </div>
    );
};

const Card = ({ title, subtitle, href }) => {
    return (
        <a
            href={href}
            className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />

            <User className="absolute z-10  right-0 text-xl group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300 w-28 h-28 top-1/2 -translate-y-1/2" />

            <User className="mb-2 text-2xl text-violet-600 group-hover:text-white transition-colors relative z-10 duration-300 w-5 h-5" />
            <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
                {title}
            </h3>
            <p className="text-slate-400 group-hover:text-violet-200 relative z-10 duration-300">
                {subtitle}
            </p>
        </a>
    );
};

export default Card;
