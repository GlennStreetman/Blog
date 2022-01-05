import React from "react";
import tailColors from "../registers/tailwindsColors";
import { useState, useEffect } from "react";

import Gutter from "../components/gutter";
import dynamic from "next/dynamic";
const DarkModeButton = dynamic(() => import("../components/darkModeButton"), { ssr: false });

function colors() {
    const [editColor, setEditColor] = useState("textPrimary");

    const [primaryBackground, setPrimaryBackground] = useState("");
    const [secondaryBackground, setSecondaryBackground] = useState("");
    const [primaryText, setPrimaryText] = useState("");
    const [secondaryText, setSecondaryText] = useState("");
    const [accentText, setAccentText] = useState("");
    const [strongHighlight, setStrongHighlight] = useState("");
    const [weakHighlight, setWeakHighlight] = useState("");

    useEffect(() => {
        if (localStorage.siteDarkMode === "true" || (!("siteDarkMode" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
            setPrimaryBackground("#2d3748");
            setSecondaryBackground("#283141");
            setPrimaryText("#f7fafc");
            setSecondaryText("#e2e8f0");
            setAccentText("#81e6d9");
            setStrongHighlight("#22d3ee");
            setWeakHighlight("#a5f3fc");
        } else {
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
            setPrimaryBackground("#ffffff");
            setSecondaryBackground("#edf2f7");
            setPrimaryText("#2d3748");
            setSecondaryText("#4a5568");
            setAccentText("#2b6cb0");
            setStrongHighlight("#a5f3fc");
            setWeakHighlight("#e0f2fe");
        }
    }, []);

    const selectText = (
        <div className="flex flex-col outline rounded-md gap-2">
            <div className="text-primary text-center">Text</div>
            <div className="flex gap-1 p-2">
                <div>
                    <div className="rounded-full border-2 h-14 w-14 bg-textPrimary"></div>
                    <div className="text-primary text-xs">Primary</div>
                </div>
                <div>
                    <div className="rounded-full border-2 h-14 w-14 bg-textSecondary  left-20"></div>
                    <div className="text-secondary text-xs">Secondary</div>
                </div>
                <div>
                    <div className="rounded-full border-2 h-14 w-14 bg-textAccent  left-20"></div>
                    <div className="text-accent text-xs">Accent</div>
                </div>
            </div>
        </div>
    );

    const selectHighlight = (
        <div className="flex flex-col outline rounded-md gap-2">
            <div className="text-primary text-center">Highlight</div>
            <div className="flex gap-1 p-2">
                <div>
                    <div className="rounded-full border-2 h-14 w-14 bg-strong relative"></div>
                    <div className="text-primary text-xs">Strong</div>
                </div>
                <div>
                    <div className="rounded-full border-2 h-14 w-14 bg-weak  left-20"></div>
                    <div className="text-primary text-xs">Weak</div>
                </div>
            </div>
        </div>
    );

    const selectBackground = (
        <div className="flex flex-col outline rounded-md gap-2">
            <div className="text-primary text-center">Background</div>
            <div className="flex gap-1 p-2">
                <div>
                    <div className="rounded-full border-2 h-14 w-14 bg-secondary relative hover:bg-weak"></div>
                    <div className="text-primary text-xs">Primary</div>
                </div>
                <div>
                    <div className="rounded-full border-2 h-14 w-14 bg-primary  left-20 hover:bg-weak"></div>
                    <div className="text-primary text-xs">Secondary</div>
                </div>
            </div>
        </div>
    );

    const selectionGrid = (
        <>
            <div className="text-primary col-start-2 col-end-2 m-auto">
                <DarkModeButton />
            </div>
            <div className="col-start-3 col-end-11 flex">
                {" "}
                {selectText}
                {selectBackground}
                {selectHighlight}
            </div>
        </>
    );

    const colorGrid = Object.entries(tailColors).map(([key1, val]) => {
        const row = Object.entries(val).map(([key2, val]) => {
            console.log(val);
            return (
                <div className="flex flex-col align-middle justify-center p-2">
                    <div style={{ backgroundColor: `${val}` }} className="grow rounded-md h-10 w-10"></div>
                    <div className="flex text-secondary align-content: center text-xs text-center items-center ">{key2}</div>
                    <div className="flex text-accent align-content: center text-xs text-center items-center">{val}</div>
                </div>
            );
        });

        return (
            <>
                <div className="col-start-2 col-end-2 text-primary m-auto ">{key1}</div>
                <div className="col-start-3 col-end-11 flex grow ">{row}</div>
            </>
        );
    });

    return (
        <div className={`min-h-screen bg-primary content-center grid `}>
            {selectionGrid}
            {colorGrid}
        </div>
    );
}

export default colors;
