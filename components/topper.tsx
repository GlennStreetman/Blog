import dynamic from "next/dynamic";
import React from "react";
import Gutter from "./gutter";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import { AdjustmentsIcon } from "@heroicons/react/solid";
import Link from "next/link";

const DarkModeButton = dynamic(() => import("./darkModeButton"), { ssr: false });

function Topper() {
    return (
        <div className="grid grid-cols-12 gap-12 mb-auto text-xs sm:text-base">
            <Gutter />
            <div className="flex justify-end w-screen sm:w-auto col-span-12 md:col-span-10">
                <Tippy content="View/Modify Theme" interactive={true} interactiveBorder={20} delay={100} arrow={true}>
                    <div>
                        <Link href="/styleGuide">
                            <AdjustmentsIcon className="h-7 w-7 text-primary hover:text-accent " />
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
