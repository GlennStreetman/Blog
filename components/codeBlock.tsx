import React from "react";
import prism from "prismjs";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJsSquare, faCss3, faHtml5 } from "@fortawesome/free-brands-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

interface props {
    language: string;
    children: any;
    file?: string;
}

function copytext(text: string) {
    console.log(text);
    navigator.clipboard.writeText(text);
}

const findIcon = {
    "language-javascript": <FontAwesomeIcon className="  left-2 text-xl text-[#f7df1e] " icon={faJsSquare} />,
    "language-CSS": <FontAwesomeIcon className="  left-2 text-xl text-[#2965f1] " icon={faCss3} />,
    "language-HTML": <FontAwesomeIcon className="  text-xl text-[#f06529] " icon={faHtml5} />,
};

const copyIcon = <FontAwesomeIcon className="text-xl text-secondary  active:text-accent" icon={faCopy} />;

function CodeBlock(p: props) {
    useEffect(() => {
        if (typeof window !== "undefined") {
            prism.highlightAll();
        }
    }, []);

    return (
        <div className="relative rounded-md p-1 bg-[#1d1f21]">
            <div className="absolute top-2 left-2 flex gap-1">
                {findIcon[p.language]}
                <Tippy content="Copy" interactive={true} interactiveBorder={20} delay={100} arrow={true}>
                    <div
                        onClick={() => {
                            copytext(p.children);
                        }}
                    >
                        {copyIcon}
                    </div>
                </Tippy>
            </div>
            <div className="absolute top-4 right-6 flex gap-1">{p.file ? <div className="text-[#5EEAD4] ml-2">{p.file}</div> : <></>}</div>
            <pre className={p.language}>
                <div className="p-2">
                    <code className="Codeblock">{p.children}</code>
                </div>
            </pre>
        </div>
    );
}

export default CodeBlock;
