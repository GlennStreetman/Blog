import React from "react";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import UserPrefs from "../components/userPrefs";
import ColorPallet from "../components/colorPallet";

import { AdjustmentsIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import BackButton from "../components/backButton";

const DarkModeButton = dynamic(() => import("../components/darkModeButton"), { ssr: false });

function styleGuide() {
    return (
        <>
            <div className={`min-h-screen bg-primary`}>
                <div className="grid grid-cols-12 gap-6 mb-auto text-xs sm:text-base">
                    <div className={`col-span-0 md:col-span-3`} />
                    <div className="sm:w-auto col-span-12 md:col-span-6 p-2">
                        <div className="flex flex-col shadow rounded-md border-2 relative p-3 gap-2">
                            <ColorPallet />
                            <div className="flex absolute top-0 right-0">
                                <Tippy content="Modify Theme" interactive={true} interactiveBorder={20} delay={100} arrow={true}>
                                    <div>
                                        <Link href="/colors">
                                            <AdjustmentsIcon className="h-7 w-7 text-primary hover:text-accent " />
                                        </Link>
                                    </div>
                                </Tippy>
                                <DarkModeButton />
                            </div>
                            <div className="flex gap-4 p-2 bg-secondary shadow rounded-md border-2  outline-4 hover:bg-weak">
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
                        <div className="flex justify-center">
                            <BackButton link="/"></BackButton>
                        </div>
                    </div>
                    <div className={`col-span-0 md:col-span-3`} />
                </div>
            </div>
        </>
    );
}

export default styleGuide;
