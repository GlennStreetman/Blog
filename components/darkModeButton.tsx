import React from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import { useState } from "react";

function DarkModeButton() {
    const [darkMode, setDarkMode] = useState(Object.values(document.documentElement.classList).includes("dark"));

    return (
        <button
            onClick={() => {
                if (darkMode) {
                    document.documentElement.classList.add("light");
                    document.documentElement.classList.remove("dark");
                    localStorage.setItem("siteDarkMode", "false");
                    setDarkMode(false);
                } else {
                    document.documentElement.classList.add("dark");
                    document.documentElement.classList.remove("light");
                    localStorage.setItem("siteDarkMode", "true");
                    setDarkMode(true);
                }
            }}
        >
            {darkMode ? <SunIcon className="h-7 w-7 text-white " /> : <MoonIcon className="h-7 w-7 " />}
        </button>
    );
}

export default DarkModeButton;
