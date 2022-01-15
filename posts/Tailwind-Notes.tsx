import CodeBlock from "../components/codeBlock";

export const tailNotesMeta = {
    id: "Tailwind-Notes",
    title: "Next.js Custom Dark Mode Theme using CSS Variables & Tailwind CSS",
    date: "2022-01-01",
    type: "notes",
    dependancies: "Tailwinds v3.08, Next v12.0.7, React v17.0.2",
};

export function tailNotes() {
    return (
        <div className="article">
            <h2>{tailwindsDarkLink} feels like its incomplete out of the box.</h2>
            <p>
                Using Tailwinds, by default, you need to add <b>dark:</b> utility class prefixs to {tailwindsUtilityClass} in order to specify html element
                attributes like background and text color. You end up specifying many common html attributes twice for each element. The need to specify{" "}
                <b>dark:</b> mode tags can be greatly reduced by extending the {tailwindsThemeLink} with {cssVariablesLink} and theme extensions. Notice in the
                html shown below, color is specified twice. Once for light mode and once for dark mode. When we complete the steps below you will be able to use
                new utility classes like bg-primary to set background colors for both light and dark mode with a single tailwinds utility class.
            </p>

            <CodeBlock language="language-HTML">{`<div className="bg-white dark:bg-slate-900" /> BECOMES--> <div className="bg-primary" />`}</CodeBlock>

            <p></p>

            <h2>In your global.css file add the following:</h2>
            <p>The code below sets two new classes that contain a series of yet to be defined custom tailwinds utility classes. </p>

            <CodeBlock language="language-CSS" file="./styles/global.css">{`@tailwind base;
@tailwind components;
@tailwind utilities;

.dark {
    --color-bg-primary: #334155;
    --color-bg-secondary: #475569;
    --color-text-primary: #f8fafc;
    --color-text-secondary: #ffedd5;
    --color-text-accent: #5eead4;
    --color-hover-strong: #155e75;
    --color-hover-weak: #0e7490;
}

.light {
    --color-bg-primary: #f8fafc;
    --color-bg-secondary: #e2e8f0;
    --color-text-primary: #334155;
    --color-text-secondary: #0369a1;
    --color-text-accent: #6d28d9;
    --color-hover-strong: #a5f3fc;
    --color-hover-weak: #cffafe;
}`}</CodeBlock>

            <h2>
                Next lets extend the {tailwindsThemeLink}. Add the following to your {tailwindsConfig}
            </h2>
            <CodeBlock language="language-javascript" file="./tailwind.config.js">{`module.exports = {
        theme: {
            extend: {
                backgroundColor: {
                    primary: "var(--color-bg-primary)",
                    secondary: "var(--color-bg-secondary)",
                },
                textColor: {
                    primary: "var(--color-text-primary)",
                    secondary: "var(--color-text-secondary)",
                    accent: "var(--color-text-accent)",
                },
                colors: {
                    strong: "var(--color-hover-strong)",
                    weak: "var(--color-hover-weak)",
                },
            },
    }`}</CodeBlock>
            <h2>Review:</h2>
            <p>
                At this point we have created two classes in our global.css file, light & dark. Each class applies a series of tailwind styles that we created
                when we extended THEME in tailwind.config.js. This doesn't do anything yet. We still need a way to apply the light & dark classes as needed and
                create a way to toggle dark mode state.{" "}
            </p>

            <h2>Create a hook that uses {localStorageLink} to determine dark mode state.</h2>
            <p>
                Add the hook shown below to your _app.ts file. This new hook will run on each new page load and apply your light or dark mode theme. If no dark
                mode state is saved in local storage then the hook will also set a default darkmode state that will be remembered the next time the user
                accessess the site from the same browser. Note that {documentElement} is the root HTML element in the browser. Because the dark or light class
                is applied to the root element, the root elements styles will {cascading} down to every element on the page.
            </p>
            <CodeBlock language="language-javascript" file="./pages/_app.js">{`useEffect(() => {
    if (localStorage.siteDarkMode === "true" || 
    (!("siteDarkMode" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) 
{
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
    } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
    }
}, []);`}</CodeBlock>

            <h2>Now lets create the toggle button</h2>
            <p>
                Add the below button anywhere on your page to toggle dark mode. The button will add and remove the dark & light classes from the root element
                which will cause light and dark mode to toggle on the page. At this point you will not need to add <b>dark:</b> prefixes the background, text,
                and highlight colors that you defined in tailwinds.config theme. Note that the example below uses {fontAwesome} icons. Sub in your own icons if
                you don't want to use Font Awesome.
            </p>
            <CodeBlock language="language-javascript" file="./components/DarkModeButton.ts">{`import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

function DarkModeButton() {
    
    const [darkMode, setDarkMode] = useState(Object.values(document.documentElement.classList).includes("dark"));

    return (
        <button
            onClick={() => {
                if (darkMode) {
                    document.documentElement.classList.add("light");
                    document.documentElement.classList.remove("dark");
                    localStorage.setItem("siteDarkMode", "false");
                    setDarkMode(false);
                } else {
                    document.documentElement.classList.add("dark");
                    document.documentElement.classList.remove("light");
                    localStorage.setItem("siteDarkMode", "true");
                    setDarkMode(true);
                }
            }}
        >
            {darkMode ? (
                <FontAwesomeIcon className="h-7 w-7 text-primary hover:text-accent" icon={faSun} />
            ) : (
                <FontAwesomeIcon className="h-7 w-7 text-primary hover:text-accent" icon={faMoon} />
            )}
        </button>
    );
}

export default DarkModeButton;`}</CodeBlock>
            <p></p>

            <h2>Now lets let users perilously define their own colors!</h2>
            <p>
                You may have noticed that this site has an icon in the upper right that allows users to set their own colors. If you want to add the same
                functionality to your project you will need to modify your tailwind.config file and create a page that injects new override classes into the
                root element.
            </p>

            <CodeBlock language="language-javascript" file="./tailwind.config.js">{`module.exports = {
        theme: {
            backgroundColor: {
                primary: "var(--color-bg-primary-user, var(--color-bg-primary))",
                secondary: "var(--color-bg-secondary-user, var(--color-bg-secondary))",
                textPrimary: "var(--color-text-primary-user, var(--color-text-primary))",
                textSecondary: "var(--color-text-secondary-user, var(--color-text-secondary))",
                textAccent: "var(--color-text-accent-user, var(--color-text-accent))",
            },
            textColor: {
                primary: "var(--color-text-primary-user, var(--color-text-primary))",
                secondary: "var(--color-text-secondary-user, var(--color-text-secondary))",
                accent: "var(--color-text-accent-user, var(--color-text-accent))",
            },
            colors: {
                strong: "var(--color-hover-strong-user, var(--color-hover-strong))",
                weak: "var(--color-hover-weak-user, var(--color-hover-weak))",
            },
        }
    }`}</CodeBlock>

            <h2>Inspiration:</h2>
            {source1}
            <br />
            {source2}
        </div>
    );
}

const localStorageLink = (
    <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="_blank">
        Local Storage
    </a>
);

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

const tailwindsUtilityClass = (
    <a href="https://tailwindcss.com/docs/utility-first" target="_blank">
        Tailwinds Utility Classes
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

const documentElement = (
    <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement" target="_blank">
        Document Element
    </a>
);

const cascading = (
    <a href="https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance" target="_blank">
        cascade
    </a>
);

const fontAwesome = (
    <a href="https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react" target="_blank">
        Font Awesome
    </a>
);

const tailwindsConfig = (
    <a href="https://tailwindcss.com/docs/configuration" target="_blank">
        tailwinds.config file.
    </a>
);
