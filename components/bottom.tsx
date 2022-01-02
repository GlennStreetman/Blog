import React from "react";

function Bottom() {
    return (
        <>
            <div className="h-10" />
            <div className="grid grid-cols-12 bottom-0 fixed  w-screen h-10">
                <div className="col-span-0 md:col-span-1" /> {/* gutter */}
                <div className="flex col-span-12 md:col-span-10 space-x-3 p-2">
                    <div>
                        <a href="https://github.com/GlennStreetman" target="_blank">
                            <img src="/github.svg" alt="github" />
                        </a>
                    </div>
                    <div className="text-xs sm:text-base">
                        <a href="mailto:glennstreetman@gmail.com">glennstreetman@gmail.com</a>
                    </div>
                    <div className="text-xs sm:text-base">858 761 8738</div>
                </div>
                <div className=" col-span-12 md:col-span-10"></div>
                <div className="col-span-0 md:col-span-1" /> {/* gutter */}
            </div>
        </>
    );
}

export default Bottom;
