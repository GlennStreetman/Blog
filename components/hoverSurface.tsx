import React from "react";

function HoverSurface(p) {
    return <div className="shadow rounded-md border-2 p-2 outline-4 hover:bg-weak hover:cursor-pointer">{p.children}</div>;
}

export default HoverSurface;