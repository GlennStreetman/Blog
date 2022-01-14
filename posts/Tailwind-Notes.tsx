import prism from "prismjs";
import { useEffect } from "react";

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
        <div className="article">
            <h1>Tailwinds.css v3.08 notes</h1>
            <h2>
                <b>The smallest utility class prefix is too large for mobile screens.</b>
            </h2>
            <p>
                The Tailwinds utility class prefix <b>sm:</b> only effects screen sizes of 640px and LARGER. As a result mobile should be specified first, with
                no prefix, then override with the <b>sm:</b> prefix folowed by your utility class.
            </p>
            <h2>{tailwindsDarkLink} doesn't provide automatic themeing out of the box</h2>
            <p>
                The {tailwindsDarkLink} doesnt provide a dark theme out of the box. By default you need to add dark: utility class prefixs to elements.
                Component libraries like {materialUILink} takes care of a lot of this for you by default because it comes pre configured with a default theme.
                Use {cssVariablesLink} and extend the default {tailwindsThemeLink} in order to streamline darkmode setup.
            </p>
            <h2>Arbitrary Value Notation</h2>
            <p>
                When you find yourself really needing something like top: 117px to get a background image in just the right spot, use Tailwind’s square bracket
                notation to generate a class on the fly with any arbitrary value.
            </p>
            {/* <CodeBlock ></CodeBlock> */}
        </div>
    );
}

const tailwindsDarkLink = (
    <a href="https://tailwindcss.com/docs/dark-mode" target="_blank">
        Tailwind's Dark Mode
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
