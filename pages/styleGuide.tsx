import React from "react";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Gutter from "../components/gutter";
import { SwitchHorizontalIcon } from "@heroicons/react/solid";
import IconButton from "../components/iconButton";
import ColorPallet from "../components/colorPallet";

const DarkModeButton = dynamic(() => import("../components/darkModeButton"), { ssr: false });

function styleGuide() {
    const [bgPrimary, setBgPrimary] = useState(true);

    useEffect(() => {
        console.log(document.documentElement.classList);
        if (localStorage.siteDarkMode === "true" || (!("siteDarkMode" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
        } else {
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
        }
    }, []);

    // const summaryBG = bgPrimary ? "bg-primary" : "bg-secondary";
    // const bodyBG = bgPrimary ? "bg-secondary" : "bg-primary";

    return (
        <>
            <div className={`min-h-screen bg-primary`}>
                {/* <Topper /> */}
                <div className="grid grid-cols-12 gap-6 mb-auto text-xs sm:text-base">
                    <Gutter />
                    <Gutter />
                    <Gutter />
                    <div className="sm:w-auto col-span-12 md:col-span-6 p-2">
                        <div className="flex flex-col shadow rounded-md border-2 relative p-3 gap-2">
                            <ColorPallet />
                            <div className="absolute top-0 right-0">
                                <DarkModeButton />
                            </div>
                            <div className={`flex gap-4 p-2 bg-secondary shadow rounded-md border-2  outline-4 hover:bg-sky-100`}>
                                <div className="flex flex-col roun">
                                    <div className="text-primary">
                                        <b className="text-primary">BG:</b>Secondary
                                    </div>
                                    <div className="text-primary">
                                        <b>T:</b>Primary
                                    </div>
                                    <div className="text-secondary">
                                        <b>T:</b>Secondary
                                    </div>
                                    <div className="text-accent">
                                        <b>T:</b>Accent
                                    </div>
                                </div>
                            </div>
                            <div className=" p-2 grow">
                                <div className="text-primary">
                                    <b>
                                        Primary Text
                                        <br />
                                    </b>
                                    Lorum Ipsum is simply dummy text of the printing and typesetting industry.
                                    <br />
                                </div>
                                <div className="text-secondary">
                                    <b>
                                        Secondary Text
                                        <br />
                                    </b>
                                    Lorum Ipsum is simply dummy text of the printing and typesetting industry.
                                    <br />
                                </div>
                                <div className="text-accent">
                                    <b>
                                        Accent Text
                                        <br />
                                    </b>
                                    Lorum Ipsum is simply dummy text of the printing and typesetting industry.
                                </div>
                            </div>
                        </div>
                    </div>

                    <Gutter />
                    <Gutter />
                    <Gutter />
                </div>
            </div>
        </>
    );
}

export default styleGuide;
