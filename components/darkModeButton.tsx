import { useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";
import Tippy from "@tippyjs/react";

interface props {
    secondary?: Function;
}

function DarkModeButton(p: props) {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        setDarkMode(Object.values(document.documentElement.classList).includes("dark"));
    }, [darkMode]);

    return (
        <div className="my-auto">
            <Tippy content="Toggle Darkmode" interactive={true} interactiveBorder={1} delay={1} arrow={true}>
            <button
                className=" flex font-bold uppercase  text-primary hover:text-accent rounded-md active:bg-strong gap-1"
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
                    const event = new CustomEvent("darkEvent");
                    window.dispatchEvent(event);
                }}
            >
                {darkMode ? (
                    
                        <BiSun className="h-7 w-7 text-primary hover:text-accent bg-primary" />
                
                ) : (

                        <BiMoon className="h-7 w-7 text-primary hover:text-accent bg-primary" />
                    
                )}
            </button>
            </Tippy>
        </div>
    );
}

export default DarkModeButton;
