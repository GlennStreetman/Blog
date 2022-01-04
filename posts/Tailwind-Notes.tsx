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

    const tailwindsDarkLink = (
        <a href="https://tailwindcss.com/docs/dark-mode" target="_blank">
            Tailwinds Dark Mode
        </a>
    );

    const tailwindsThemeLink = (
        <a href="https://tailwindcss.com/docs/theme" target="_blank">
            Tailwinds Theme
        </a>
    );
    const materialUILink = (
        <a href="https://mui.com/" target="_blank">
            Materail UI
        </a>
    );
    const emotion = (
        <a href="https://emotion.sh/docs/introduction" target="_blank">
            Emotion
        </a>
    );

    const cssVariablesLink = (
        <a href="https://www.freecodecamp.org/news/everything-you-need-to-know-about-css-variables-c74d922ea855/" target="_blank">
            CSS Variables
        </a>
    );

    const source1 = (
        <a href="https://epicreact.dev/css-variables/" target="_blank">
            Kent C. Dodds: CSS-variables
        </a>
    );
    const source2 = (
        <a href="https://jeffjadulco.com/blog/dark-mode-react-tailwind#june-2021-update" target="_blank">
            Jeff Jadulco: How to Dark Mode in React and Tailwind CSS
        </a>
    );

    return (
        <div>
            <h1>Tailwinds.csc 3.08 </h1>
            <h2>
                <b>The smallest utility class prefix is too large for mobile screens.</b>
            </h2>
            <p>
                The Tailwinds utility class prefix <b>sm:</b> only effects screen sizes of 640px and LARGER. As a result mobile should be specified first, with
                no prefix, then override with the <b>sm:</b> prefix folowed by your utility class.
            </p>
            <h2>{tailwindsDarkLink} doesnt provide automatic themeing out of the box</h2>
            <p>
                The {tailwindsDarkLink} doesnt provide a dark theme out of the box. You need to add a dark: utility class prefix to any number of elements which
                drives me a bit nuts having used theme providers in component libraries like {materialUILink} that does a pretty good job of taking care of some
                of this for you. Use {cssVariablesLink} and extend the default {tailwindsThemeLink} in order to streamline darkmode setup
            </p>
        </div>
    );
}
