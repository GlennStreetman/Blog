import dynamic from "next/dynamic";
import React from "react";
import Gutter from "./gutter";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const DarkModeButton = dynamic(() => import("./darkModeButton"), { ssr: false });

function Topper() {
    return (
        <div className="grid grid-cols-12 gap-12 mb-auto text-xs sm:text-base">
            <Gutter />
            <div className="flex justify-end w-screen sm:w-auto col-span-12 md:col-span-10 gap-2 p-2">
                <Tippy content="View/Modify Theme" interactive={true} interactiveBorder={20} delay={100} arrow={true}>
                    <div>
                        <Link href="/styleGuide">
                            <FontAwesomeIcon icon={faPencilAlt} className="h-6 w-6 text-primary hover:text-accent " />
                        </Link>
                    </div>
                </Tippy>
                <DarkModeButton />
            </div>
            <Gutter />
        </div>
    );
}

export default Topper;
