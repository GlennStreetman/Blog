import React from "react";

function Bottom() {
    return (
        <>
            <div className="h-10" />
            <div className="grid grid-cols-12 gap-12 bottom-0 fixed bg-slate-700 w-full h-10">
                <div className="col-span-0 md:col-span-1" /> {/* gutter */}
                <div className="flex col-span-12 md:col-span-10 whitespace-pre p-2">
                    <a href="https://github.com/GlennStreetman" target="_blank">
                        <img src="/github.svg" alt="github" />
                    </a>
                    {"  | glennstreetman@gmail.com | 858 761 8738"}
                </div>
                <div className=" col-span-12 md:col-span-10"></div>
                <div className="col-span-0 md:col-span-1" /> {/* gutter */}
            </div>
        </>
    );
}

export default Bottom;
