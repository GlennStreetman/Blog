import React from "react";
import findIcon from "./techIcons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

type techType =
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
    | "language-NPM";

interface props {
    tech: techType[];
    post: string;
}

function SourceTrail(p: props) {
    const iconTrail = p.tech.map((el, indx) => {
        return <div key={p.post + indx}>{findIcon[el]}</div>;
    });

    let techData = p.tech.reduce((reducer, el) => {
        let trimmed = el.replace(/language-/g, "");
        trimmed = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
        reducer = reducer + trimmed + ", ";
        return reducer;
    }, "");

    techData = techData.slice(0, techData.length - 2);

    return (
        <Tippy content={techData} interactive={true} interactiveBorder={20} delay={100} arrow={true}>
            <div className="inline-flex bg-inherit gap-1">{iconTrail}</div>
        </Tippy>
    );
}

export default SourceTrail;
