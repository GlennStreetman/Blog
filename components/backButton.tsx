import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

function BackButton() {
    const router = useRouter();

    const element = (
        <div className="my-auto">
            <button className=" flex font-bold uppercase  text-primary hover:text-accent rounded-md active:bg-strong gap-1" onClick={() => router.push("/")}>
                <div className="my-auto">
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                </div>
            </button>
        </div>
    );

    return element;
}

export default BackButton;
