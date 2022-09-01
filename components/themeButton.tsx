import React from "react";
import Tippy from "@tippyjs/react";
import Link from "next/link";
import { IoIosColorPalette } from "react-icons/io";

function ThemeButton(p) {
    return (
        <Tippy content="View/Modify Theme" interactive={true} interactiveBorder={20} delay={100} arrow={true}>
            <Link className=" flex font-bold uppercase  text-primary hover:text-accent rounded-md active:bg-strong gap-1 " href="/colors" passHref>
                <a className="flex flex-row  text-primary">
                    <IoIosColorPalette className="h-7 w-7 text-primary hover:text-accent bg-primary" />
                    {p.text ? <div className="m-auto">{p.text}</div> : ""}
                </a>
            </Link>
        </Tippy>
    );
}

export default ThemeButton;
