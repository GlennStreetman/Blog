import { VscGithub } from "react-icons/vsc";
import React from "react";

function Bottom() {
    return (
        <>
            <div className="h-14" />
            <div className="absolute bottom-2 left-2 flex gap-2 p-2 bg-primary mx-4 my-2 grow">
                <a className="text-primary " href="https://github.com/GlennStreetman" target="_blank">
                    <VscGithub className="h-7 w-7 text-primary hover:text-accent" />
                </a>
                <a className="text-xs sm:text-base text-primary hover:text-accent" href="mailto:glenn@gstreet.dev">
                    glenn@gstreet.dev
                </a>
            </div>
        </>
    );
}

export default Bottom;
