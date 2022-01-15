import React from "react";

interface props {
    onClick?: Function;
    children: any;
}

function buttonStandard(p: props) {
    return (
        <button
            className=" flex font-bold uppercase  text-primary hover:text-accent rounded-md active:bg-strong gap-1"
            onClick={(e) => {
                p.onClick(e);
            }}
        >
            {p.children}
        </button>
    );
}

export default buttonStandard;
