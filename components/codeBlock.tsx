import React from "react";
import prism from "prismjs";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import findIcon from "./techIcons";

interface props {
    language: string;
    children: any;
    file?: string;
}

function copytext(text: string) {
    console.log(text);
    navigator.clipboard.writeText(text);
}

const copyIcon = <FontAwesomeIcon className="text-xl text-secondary active:text-accent" icon={faCopy} />;

function CodeBlock(p: props) {
    useEffect(() => {
        if (typeof window !== "undefined") {
            prism.highlightAll();
        }
    }, []);

    return (
        <div className="relative rounded-md p-1 bg-[#1d1f21] mb-5 ">
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
