import React from "react";
import { useState, useEffect } from "react";
import Topper from "../components/topper";
import Gutter from "../components/gutter";
import { SwitchHorizontalIcon } from "@heroicons/react/solid";
import IconButton from "../components/iconButton";

function styleGuide() {
    const [bgPrimary, setBgPrimary] = useState(true);

    useEffect(() => {
        if (localStorage.siteDarkMode === "true" || (!("siteDarkMode" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
        } else {
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const summaryBG = bgPrimary ? "bg-primary" : "bg-secondary";
    const bodyBG = bgPrimary ? "bg-secondary" : "bg-primary";

    return (
        <>
            <div className={`min-h-screen ${summaryBG}`}>
                <Topper />
                <div className="grid grid-cols-12 gap-6 mb-auto text-xs sm:text-base">
                    <Gutter />
                    <Gutter />
                    <Gutter />
                    <div className="sm:w-auto col-span-12 md:col-span-6 p-2">
                        <div className="flex shadow rounded-md border-2 relative">
                            <div className="absolute top-0 right-0">
                                <IconButton
                                    text="Flip"
                                    icon={<SwitchHorizontalIcon className="h-7 w-7 " />}
                                    callback={() => {
                                        return setBgPrimary(!bgPrimary);
                                    }}
                                />
                            </div>
                            <div className={`flex gap-4 p-2 ${bodyBG} shadow rounded-md border-2  outline-4 hover:bg-sky-100`}>
                                <div className="flex flex-col roun">
                                    <div className="text-primary">
                                        <b>BG:</b>Secondary
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
                            <div className={`${summaryBG} p-2 grow`}>
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
