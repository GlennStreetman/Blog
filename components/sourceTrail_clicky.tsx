import React from "react";
import findIcon from "./techIcons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import { BsFillBookmarkXFill } from "react-icons/bs";

export type techType =
    | "language-javascript"
    | "language-CSS"
    | "language-HTML"
    | "language-JSON"
    | "language-Postgres"
    | "language-typescript"
    | "language-Redux"
    | "language-Express"
    | "language-Jest"
    | "language-MongoDB"
    | "language-GraphQL"
    | "language-MaterialUI"
    | "language-React"
    | "language-Tailwind"
    | "language-Next"
    | "language-NPM"
    | "language-testingLibrary"
    | "language-docker"
    | "language-AWS"
    | "language-Bash";

interface props {
    tech: techType[];
    thisKey: string;
    callback: Function;
}

function SourceTrailClick(p: props) {
    const iconTrail = p.tech.map((el, indx) => {
        return (
            <div className="flex justify-items-center" key={p.thisKey + indx}>
                <Tippy content={el.replace("language-", "")} interactive={true} interactiveBorder={1} delay={1} arrow={true}>
                    <button
                        onClick={() => {
                            p.callback(el);
                        }}
                    >
                        {findIcon[el]}
                    </button>
                </Tippy>
            </div>
        );
    });

    let techData = p.tech.reduce((reducer, el) => {
        let trimmed = el.replace(/language-/g, "");
        trimmed = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
        reducer = reducer + trimmed + ", ";
        return reducer;
    }, "");

    techData = techData.slice(0, techData.length - 2);

    return (
        <div className="flex bg-inherit gap-3">
            {iconTrail}
            <div className="flex justify-items-center" key="removeFilterKey">
                <Tippy content={"Remove FIlter"} interactive={true} interactiveBorder={1} delay={1} arrow={true}>
                    <button
                        onClick={() => {
                            p.callback("");
                        }}
                    >
                        <BsFillBookmarkXFill className="  text-xl text-[#e43534] " />
                    </button>
                </Tippy>
            </div>
        </div>
    );
}

export default SourceTrailClick;
