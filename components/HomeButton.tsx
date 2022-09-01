import React from "react";

import { GoHome } from "react-icons/go";
import { useRouter } from "next/router";

function HomeButton(p) {
    const router = useRouter();

    const element = (
        <button className="flex font-bold uppercase text-primary hover:text-accent rounded-md active:bg-strong gap-1 " onClick={() => router.push("/")}>
            <GoHome className="h-7 w-7 text-primary hover:text-accent bg-primary" />
            {p.text ? <div className="m-auto">{p.text}</div> : <></>}
        </button>
    );

    return element;
}

export default HomeButton;
