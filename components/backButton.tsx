import React from "react";
import { ArrowCircleLeftIcon } from "@heroicons/react/solid";
import Link from "next/link";

interface props {
    link: string;
}

function BackButton(p: props) {
    return (
        <>
            <Link href={p.link}>
                <button>
                    <div className="flex font-bold uppercase text-xs text-primary rounded-md p-2 hover:text-accent active:bg-strong">
                        <ArrowCircleLeftIcon className="h-7 w-7 " />
                        <div className="my-auto">Back</div>
                    </div>
                </button>
            </Link>
        </>
    );
}

export default BackButton;
