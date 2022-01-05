import React from "react";

interface props {
    text: string;
    callback: Function;
    icon: any; //svg icon?
}

function IconButton(p: props) {
    return (
        <button
            onClick={() => {
                p.callback();
            }}
        >
            <div className="flex font-bold uppercase text-xs hover:bg-strong rounded-md p-2 text-secondary">
                {p.icon}
                <div className="m-auto">{p.text}</div>
            </div>
        </button>
    );
}

export default IconButton;
