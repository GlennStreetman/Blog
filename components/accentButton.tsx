import React from "react";

import SourceTrail from "../components/sourceTrail";

interface props {
    text: string;
    callback: Function;
    icon?: string; //svg icon?
}

function AcentButton(p: props) {
    // @ts-ignore
    const icon = <SourceTrail tech={[p.icon]} post="filter" />;

    return (
        <button
            className=" px-2 py-1 border-line border-1 border-black font-medium rounded-md text-secondary  hover:bg-weak text-sm tracking-wider"
            onClick={() => {
                p.callback();
            }}
        >
            <div className="flex gap-2">
                <div className="m-auto">{p.text}</div>
                {icon}
            </div>
        </button>
    );
}

export default AcentButton;
