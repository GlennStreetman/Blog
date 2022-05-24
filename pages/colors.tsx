import React from "react";
import tailColors from "../registers/tailwindsColors";
import { useState, useEffect } from "react";
import Button from "../components/buttonStandard";
import HomeButton from "../components/HomeButton";
import Link from "next/link";
import { GiCancel } from "react-icons/gi";
import { AiOutlineEye } from "react-icons/ai";

import dynamic from "next/dynamic";
const DarkModeButton = dynamic(() => import("../components/darkModeButton"), { ssr: false });

function colors() {
    const [editCategory, setEditCategory] = useState("primaryText");
    const [editColor, setEditColor] = useState("");
    const [reset, setReset] = useState(1); //set to rerender page

    useEffect(() => {
        if (localStorage.siteDarkMode === "true" || (!("siteDarkMode" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.add("userDark");
            document.documentElement.classList.remove("light");
            document.documentElement.classList.remove("userLight");
            setEditColor(localStorage.textPrimaryD !== undefined ? localStorage.textPrimaryD : "#F8FAFC");
            setEditCategory("primaryText");
        } else {
            document.documentElement.classList.add("light");
            document.documentElement.classList.add("userLight");
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.remove("userDark");
            setEditColor(localStorage.textPrimaryL !== undefined ? localStorage.textPrimaryL : "#334155");
            setEditCategory("primaryText");
        }
    }, [reset]);

    function lookupColor(key) {
        if (typeof window !== "undefined") {
            const colorMapDark = {
                primaryBackground: localStorage.backgroundPrimaryD ? localStorage.backgroundPrimaryD : "#334155",
                secondaryBackground: localStorage.backgroundSecondaryD ? localStorage.backgroundSecondaryD : "#475569",
                primaryText: localStorage.textPrimaryD ? localStorage.textPrimaryD : "#F8FAFC",
                secondaryText: localStorage.textSecondaryD ? localStorage.textSecondaryD : "#FEF3C7",
                accentText: localStorage.textAccentD ? localStorage.textAccentD : "#5EEAD4",
                strongHighlight: localStorage.highlightStrongD ? localStorage.highlightStrongD : "#155E75",
                weakHighlight: localStorage.highlightWeakD ? localStorage.highlightweakD : "#0E7490",
            };

            const colorMapLight = {
                primaryBackground: localStorage.backgroundPrimaryL ? localStorage.backgroundPrimaryL : "#F8FAFC",
                secondaryBackground: localStorage.backgroundSecondaryL ? localStorage.backgroundSecondaryL : "#E2E8F0",
                primaryText: localStorage.textPrimaryL ? localStorage.textPrimaryL : "#334155",
                secondaryText: localStorage.textSecondaryL ? localStorage.textSecondaryL : "#0369A1",
                accentText: localStorage.textAccentL ? localStorage.textAccentL : "#6D28D9",
                strongHighlight: localStorage.highlightStrongL ? localStorage.highlightStrongL : "#A5F3FC",
                weakHighlight: localStorage.highlightWeakL ? localStorage.highlightweakL : "#CFFAFE",
            };

            const lookupColor = localStorage.siteDarkMode === "true" ? colorMapDark[key] : colorMapLight[key];
            return lookupColor;
        } else {
            return "pass";
        }
    }

    function resetColors() {
        //remove all black
        delete localStorage.backgroundPrimaryD;
        delete localStorage.backgroundSecondaryD;
        delete localStorage.textPrimaryD;
        delete localStorage.textSecondaryD;
        delete localStorage.textAccentD;
        delete localStorage.highlightStrongD;
        delete localStorage.highlightWeakD;
        //remove all light
        delete localStorage.backgroundPrimaryL;
        delete localStorage.backgroundSecondaryL;
        delete localStorage.textPrimaryL;
        delete localStorage.textSecondaryL;
        delete localStorage.textAccentL;
        delete localStorage.highlightStrongL;
        delete localStorage.highlightWeakL;
    }

    function setCustomColor(color) {
        setEditColor(color);
        if (localStorage.siteDarkMode === "true") {
            const darkSetter = {
                primaryBackground: () => {
                    localStorage.backgroundPrimaryD = color;
                },
                secondaryBackground: () => {
                    localStorage.backgroundSecondaryD = color;
                },
                primaryText: () => {
                    localStorage.textPrimaryD = color;
                },
                secondaryText: () => {
                    localStorage.textSecondaryD = color;
                },
                accentText: () => {
                    localStorage.textAccentD = color;
                },
                strongHighlight: () => {
                    localStorage.highlightStrongD = color;
                },
                weakHighlight: () => {
                    localStorage.highlightWeakD = color;
                },
            };

            darkSetter[editCategory]();
        } else {
            const lightSetter = {
                primaryBackground: () => {
                    localStorage.backgroundPrimaryL = color;
                },
                secondaryBackground: () => {
                    localStorage.backgroundSecondaryL = color;
                },
                primaryText: () => {
                    localStorage.textPrimaryL = color;
                },
                secondaryText: () => {
                    localStorage.textSecondaryL = color;
                },
                accentText: () => {
                    localStorage.textAccentL = color;
                },
                strongHighlight: () => {
                    localStorage.highlightStrongL = color;
                },
                weakHighlight: () => {
                    localStorage.highlightWeakL = color;
                },
            };
            lightSetter[editCategory]();
        }
    }

    function secFocus(key) {
        setEditCategory(key);
        setEditColor(lookupColor(key));
    }

    const selectText = (
        <div className="flex flex-col outline rounded-md gap-2 bg-secondary">
            <div className="text-primary text-center">Text</div>
            <div className="flex gap-1 p-2">
                <div>
                    <div
                        onClick={() => {
                            secFocus("primaryText");
                        }}
                        className={`rounded-full h-14 w-14 bg-textPrimary hover:bg-weak
                        ${editCategory === "primaryText" ? "border-red-700 border-4" : ""} `}
                    />
                    <div className="text-primary text-xs text-center">Primary</div>
                </div>
                <div>
                    <div
                        onClick={() => {
                            secFocus("secondaryText");
                        }}
                        className={`rounded-full border-2 h-14 w-14 bg-textSecondary hover:bg-weak left-20
                        ${editCategory === "secondaryText" ? "border-red-700 border-4" : ""}
                        `}
                    ></div>
                    <div className="text-secondary text-xs text-center">Secondary</div>
                </div>
                <div>
                    <div
                        onClick={() => {
                            secFocus("accentText");
                        }}
                        className={`rounded-full border-2 h-14 w-14 bg-textAccent hover:bg-weak left-20
                        ${editCategory === "accentText" ? "border-red-700 border-4" : ""}
                        `}
                    ></div>
                    <div className="text-accent text-xs text-center">Accent</div>
                </div>
            </div>
        </div>
    );

    const selectBackground = (
        <div className="flex flex-col outline rounded-md gap-2 bg-secondary">
            <div className="text-primary text-center">Background</div>
            <div className="flex gap-1 p-2">
                <div>
                    <div
                        onClick={() => {
                            secFocus("primaryBackground");
                        }}
                        className={`rounded-full border-2 h-14 w-14 bg-primary relative hover:bg-weak
                        ${editCategory === "primaryBackground" ? "border-red-700 border-4" : ""}
                        `}
                    ></div>
                    <div className="text-primary text-xs text-center">Primary</div>
                </div>
                <div>
                    <div
                        onClick={() => {
                            secFocus("secondaryBackground");
                        }}
                        className={`rounded-full border-2 h-14 w-14 bg-secondary  left-20 hover:bg-weak
                        ${editCategory === "secondaryBackground" ? "border-red-700 border-4" : ""} 
                        `}
                    ></div>
                    <div className="text-primary text-xs text-center">Secondary</div>
                </div>
            </div>
        </div>
    );

    const selectHighlight = (
        <div className="flex flex-col outline rounded-md gap-2 bg-secondary">
            <div className="text-primary text-center">Highlight</div>
            <div className="flex gap-1 p-2">
                <div>
                    <div
                        onClick={() => {
                            secFocus("strongHighlight");
                        }}
                        className={`rounded-full border-2 h-14 w-14 bg-strong relative hover:bg-weak bottom-0
                    ${editCategory === "strongHighlight" ? "border-red-700 border-4" : ""} 
                    `}
                    ></div>
                    <div className="text-primary text-xs text-center">Strong</div>
                </div>
                <div>
                    <div
                        onClick={() => {
                            secFocus("weakHighlight");
                        }}
                        className={`rounded-full border-2 h-14 w-14 bg-weak  left-20 hover:bg-strong
                    ${editCategory === "weakHighlight" ? "border-red-700 border-4" : ""}
                    `}
                    ></div>
                    <div className="text-primary text-xs text-center">Weak</div>
                </div>
            </div>
        </div>
    );

    const selectionGrid = (
        <>
            <div className="text-primary flex gap-4 m-4">
                <DarkModeButton
                    secondary={() => {
                        secFocus(editCategory);
                    }}
                />
                {selectText}
                {selectBackground}
                {selectHighlight}
                <div className="flex flex-col justify-center ">
                    <Link href="/styleGuide">
                        <div>
                            <Button onClick={() => {}}>
                                <div className="my-auto">
                                    <AiOutlineEye />
                                </div>
                                <div className="my-auto">Review</div>
                            </Button>
                        </div>
                    </Link>

                    <Button
                        onClick={() => {
                            resetColors();
                            setReset(Date.now());
                        }}
                    >
                        <div className="my-auto">
                            <GiCancel />
                        </div>
                        <div className="my-auto">RESET</div>
                    </Button>
                </div>
            </div>
        </>
    );

    const colorGrid = Object.entries(tailColors).map(([key1, val]) => {
        const row = Object.entries(val).map(([key2, val]) => {
            return (
                <div
                    key={key2}
                    className={`flex flex-col p-2 hover:bg-strong rounded-md ${val === editColor ? "border-red-700 border-4" : ""}`}
                    onClick={() => {
                        setCustomColor(val);
                    }}
                >
                    <div style={{ backgroundColor: `${val}` }} className="rounded-md h-10 w-10 m-auto"></div>
                    <div className="flex text-secondary align-content: center text-xs text-center items-center m-auto">{key2}</div>
                    <div className="flex text-accent align-content: center text-xs text-center items-center">{val}</div>
                </div>
            );
        });

        return (
            <div key={key1} className="grid grid-cols-12">
                <div className="col-span-1 text-primary m-auto">{key1}</div>
                <div className="col-span-11">
                    <div className="flex">{row}</div>
                </div>
            </div>
        );
    });

    return (
        <>
            <div className={`min-h-screen bg-primary content-center grid grid-cols-12 `}>
                <div className="col-span-1" />
                <div className="col-span-10 m-auto">{selectionGrid}</div>
                <div className="col-span-1" />
                <div className="col-span-1" />
                <div className="col-span-10 m-auto">{colorGrid}</div>
                <div className="col-span-1" />
                <div className="col-span-1" />
                <div className="col-span-10 m-auto mt-2">
                    <HomeButton text="Return home" />
                </div>
                <div className="col-span-1" />
            </div>
        </>
    );
}

export default colors;
