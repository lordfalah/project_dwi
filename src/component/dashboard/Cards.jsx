"use client";

import User from "@/assets/icon/User";
import HoverDevCards from "./HoverDevCards";
import Card from "./HoverDevCards";

const Cards = () => {
    return (
        <div className="w-full px-6 py-6 mx-auto">
            {/* row 1 */}
            <div className="flex gap-x-4">
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    );
};

export default Cards;
