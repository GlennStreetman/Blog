import React from "react";
import findIcon from "./techIcons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

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
    post: string;
}

function SourceTrail(p: props) {
    const iconTrail = p.tech.map((el, indx) => {
        let trimmed = el.replace(/language-/g, "")
        trimmed = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
        const icon = findIcon[el]
        return (
            <Tippy content={trimmed} interactive={true} interactiveBorder={1} delay={1} arrow={true}>
                <div key={p.post + indx}>   
                    {icon}
                </div>
            </Tippy>
        )
    });

    let techData = p.tech.reduce((reducer, el) => {
        let trimmed = el.replace(/language-/g, "");
        trimmed = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
        reducer = reducer + trimmed + ", ";
        return reducer;
    }, "");

    techData = techData.slice(0, techData.length - 2);

    return (       
            <div className="inline-flex bg-inherit gap-1">{iconTrail}</div>
    );
}

export default SourceTrail;
