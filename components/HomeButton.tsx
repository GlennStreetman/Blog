import React from "react";

import { GoHome } from "react-icons/go";
import { useRouter } from "next/router";
import Tippy from "@tippyjs/react";

function HomeButton(p) {
    const router = useRouter();

    return (
        <div>
            <Tippy content="Home" interactive={true} interactiveBorder={1} delay={1} arrow={true}>
                <button className="flex font-bold uppercase text-primary hover:text-accent rounded-md active:bg-strong gap-1 " onClick={() => router.push("/")}>
                    <GoHome className="h-7 w-7 text-primary hover:text-accent bg-primary" />
                    {p.text ? <div className="m-auto">{p.text}</div> : <></>}
                </button>
            </Tippy>
        </div>
    )
}

export default HomeButton;
