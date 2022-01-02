import React from "react";
import Gutter from "./gutter";
import DarkModeButton from "./darkModeButton";

interface props {
    darkMode: boolean;
    setDarkMode: Function;
}

function Topper(p: props) {
    return (
        <div className="grid grid-cols-12 gap-12 mb-auto text-xs sm:text-base">
            <Gutter />
            <div className="flex justify-end w-screen sm:w-auto col-span-12 md:col-span-10">
                <DarkModeButton darkMode={p.darkMode} setDarkMode={p.setDarkMode} />
            </div>
            <Gutter />
        </div>
    );
}

export default Topper;
