import React from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";

interface props {
    darkMode: boolean;
    setDarkMode: Function;
}

function DarkModeButton(p) {
    return (
        <button
            onClick={() => {
                console.log("click", p.darkMode);
                p.setDarkMode(!p.darkMode);
            }}
        >
            {p.darkMode ? <SunIcon className="h-7 w-7 text-white " /> : <MoonIcon className="h-7 w-7 " />}
        </button>
    );
}

export default DarkModeButton;
