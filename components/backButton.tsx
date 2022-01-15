import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { ArrowCircleLeftIcon } from "@heroicons/react/solid";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

interface props {
    hide?: boolean;
}

function BackButton(p: props) {
    const router = useRouter();
    return (
        <>
            <span onClick={() => router.back()}>
                <button>
                    <div className="flex font-bold uppercase  text-primary hover:text-accent rounded-md p-2 active:bg-strong ">
                        <FontAwesomeIcon icon={faArrowAltCircleLeft} className="  " />
                        {/* <ArrowCircleLeftIcon className="h-7 w-7 " /> */}
                        {p.hide !== true ? <div className="my-auto">Back</div> : <></>}
                    </div>
                </button>
            </span>
        </>
    );
}

export default BackButton;
