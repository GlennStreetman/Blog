import React from "react";
import prism from "prismjs";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJsSquare } from "@fortawesome/free-brands-svg-icons";

interface props {
    language: string;
    children: any;
}

const findIcon = {
    "language-javascript": <FontAwesomeIcon className=" absolute top-4 left-2 text-xl text-[#f7df1e] " icon={faJsSquare} />,
};

function CodeBlock(p: props) {
    useEffect(() => {
        if (typeof window !== "undefined") {
            prism.highlightAll();
        }
    }, []);

    return (
        <div className=" relative rounded-md p-1">
            {findIcon[p.language]}
            <pre className={p.language}>
                <div className="p-2">
                    <code>{p.children}</code>
                </div>
            </pre>
        </div>
    );
}

export default CodeBlock;
