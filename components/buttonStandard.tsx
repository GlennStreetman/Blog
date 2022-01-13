import React from "react";

interface props {
    onClick?: Function;
    children: any;
}

function buttonStandard(p: props) {
    return (
        <button
            onClick={(e) => {
                p.onClick(e);
            }}
            className=" uppercase font-bold  text-xs hover:text-accent active:bg-strong "
        >
            {p.children}
        </button>
    );
}

export default buttonStandard;
