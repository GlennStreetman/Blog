import React from "react";
import { ArrowCircleLeftIcon } from "@heroicons/react/solid";
import Link from "next/link";

interface props {
    link: string;
}

function BackButton(p: props) {
    return (
        <>
            <Link href="/">
                <button>
                    <div className="flex font-bold uppercase text-xs hover:bg-cyan-700 rounded-md p-2">
                        <ArrowCircleLeftIcon className="h-7 w-7 " />
                        <p className="m-auto">Back</p>
                    </div>
                </button>
            </Link>
        </>
    );
}

export default BackButton;
