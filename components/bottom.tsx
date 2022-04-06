import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import React from "react";

function Bottom() {
    return (
        <>
            <div className="h-10" />
            <div className="bottom-0 fixed w-screen h-10 bg-primary">
                <div className="flex col-span-12 md:col-span-10 space-x-3 p-2">
                    <div className="text-primary ">
                        <a href="https://github.com/GlennStreetman" target="_blank">
                            <FontAwesomeIcon className="h-7 w-7 text-primary hover:text-accent" icon={faGithub} />
                        </a>
                    </div>
                    <div className="text-xs sm:text-base ">
                        <a href="mailto:glennstreetman@gmail.com" className="text-accent">
                            glenn@gstreet.dev
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Bottom;
