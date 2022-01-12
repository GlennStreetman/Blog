import React from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import { useState } from "react";

interface props {
    secondary?: Function;
}

function DarkModeButton(p: props) {
    const [darkMode, setDarkMode] = useState(Object.values(document.documentElement.classList).includes("dark"));

    return (
        <button
            onClick={() => {
                if (darkMode) {
                    document.documentElement.classList.add("light");
                    document.documentElement.classList.add("userLight");
                    document.documentElement.classList.remove("dark");
                    document.documentElement.classList.remove("userDark");
                    localStorage.setItem("siteDarkMode", "false");
                    setDarkMode(false);
                } else {
                    document.documentElement.classList.add("dark");
                    document.documentElement.classList.add("userDark");
                    document.documentElement.classList.remove("light");
                    document.documentElement.classList.remove("userLight");
                    localStorage.setItem("siteDarkMode", "true");
                    setDarkMode(true);
                }
                if (p.secondary) p.secondary();
            }}
        >
            {darkMode ? <SunIcon className="h-7 w-7 text-white hover:text-accent" /> : <MoonIcon className="h-7 w-7 hover:text-accent" />}
        </button>
    );
}

export default DarkModeButton;
