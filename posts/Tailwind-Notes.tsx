import prism from "prismjs";
import { useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";

export const tailNotesMeta = {
    id: "Tailwind-Notes",
    title: "Struggles with Tailwinds.",
    date: "2022-01-01",
    type: "notes",
};

export function tailNotes() {
    useEffect(() => {
        if (typeof window !== "undefined") {
            prism.highlightAll();
        }
    }, []);

    return (
        <>
            <h2>
                <b>The smallest utility class prefix is too large for mobile screens.</b>
            </h2>
            <p>
                The Tailwinds utility class prefix <b>sm:</b> only effects screen sizes of 640px and LARGER. As a result mobile should be specified first, with
                no prefix, then override with the <b>sm:</b> prefix folowed by your utility class.
            </p>
        </>
    );
}
