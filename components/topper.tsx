import React from "react";
import "tippy.js/dist/tippy.css"; // optional
import HomeButton from "./HomeButton";
import { useRouter } from "next/router";
import Loginbutton from "./loginButton";
import DarkModeButton from "./darkModeButton";
import ThemeButton from "./themeButton";

function Topper() {
    const router = useRouter();

    return (
        <div className="top-0 right-3 xl:right-12 fixed flex justify-end w-auto col-span-12 md:col-span-10 gap-2 p-2 z-50">
            {router.pathname !== "/" ? <HomeButton /> : <></>}
            {router.pathname === "/" ? <ThemeButton /> : <></>}
            <DarkModeButton />
            <Loginbutton />
        </div>
    );
}

export default Topper;
