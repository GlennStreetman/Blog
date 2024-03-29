import React from "react";
import ColorPallet from "../components/colorPallet";
import "tippy.js/dist/tippy.css"; // optional
import DarkModeButton from "../components/darkModeButton";
import Thembutton from "../components/themeButton";
import useCheckRedirect from '../hooks/useCheckRedirect'

function StyleGuide() {

    useCheckRedirect()

    return (
        <>
            <div className={`min-h-screen bg-primary`}>
                <div className="grid grid-cols-12 gap-6 mb-auto text-xs sm:text-base">
                    <div className={`col-span-0 md:col-span-3`} />
                    <div className="sm:w-auto col-span-12 md:col-span-6 p-2">
                        <div className="flex flex-col shadow rounded-md border-2 relative p-3 gap-2">
                            <ColorPallet />
                            <div className="flex absolute top-0 right-0 p-3 gap-2">
                                <div className="flex gap-2">
                                    <Thembutton />
                                    <DarkModeButton />
                                </div>
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
                        <div className="flex justify-center mt-2">
                            <Thembutton text="Back to Colors" />
                        </div>
                    </div>
                    <div className={`col-span-0 md:col-span-3`} />
                </div>
            </div>
        </>
    );
}

export default StyleGuide;
