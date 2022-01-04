import dynamic from "next/dynamic";
import React from "react";
import Gutter from "./gutter";
const DarkModeButton = dynamic(() => import("./darkModeButton"), { ssr: false });

function Topper() {
    return (
        <div className="grid grid-cols-12 gap-12 mb-auto text-xs sm:text-base">
            <Gutter />
            <div className="flex justify-end w-screen sm:w-auto col-span-12 md:col-span-10">
                <DarkModeButton />
            </div>
            <Gutter />
        </div>
    );
}

export default Topper;
