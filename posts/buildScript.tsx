/*
    @start
    id: buildScript
    title: Dynamicly importing javascript modules using a custom build script & Next.js
    date: 2022-01-18
    type: notes
    dependancies: Tailwinds v3.08, Next v12.0.7, React v17.0.2
    repo: https://github.com/GlennStreetman/Blog
    languages: language-NPM,language-Next
    project: Blog
    @end
*/

import CodeBlock from "../components/codeBlock";

const body = function () {
    return (
        <div className="article">
            <h2>The setup: </h2>
            <p>
                The {nextJSTutorial} guides you through building a simple blog using Next.js. The tutorial uses {greyMatter}, a library that parses{" "}
                {metaDataLink} stored at the top of .md markdown files. The metadata is used to sort and categorize the blog posts. The parsed files can then be
                used as the body content for blog posts. This is a neat trick because once a blog post is saved it automaticaly becomes available for viewing
                through the front end of the web app. Markdown files do have limits though, they aren't JS modules so you cant embed react components inside of
                them. My preference is to write JS modules, instead of markdown files, so that I can include working component examples, highlighted code block,
                and add javascript as necessary.
            </p>
            <h2>The problem:</h2>
            <p>
                Using Javascript modules for my blug but keeping the dynamic import feature of greymatter markdown files. {dnamicImportLink} state the
                following:
            </p>

            <blockquote cite="https://nextjs.org/docs/advanced-features/dynamic-import">
                Note: In import('path/to/component'), the path{" "}
                <b className="text-secondary">must be explicitly written. It can't be a template string nor a variable.</b> Furthermore the import() has to be
                inside the dynamic() call for Next.js to be able to match webpack bundles / module ids to the specific dynamic() call and preload them before
                rendering. dynamic() can't be used inside of React rendering as it needs to be marked in the top level of the module for preloading to work,
                similar to React.lazy.
            </blockquote>

            <p>
                This turns out to be a bit of a problem. Without some additional work I cant dynamicaly import modules. To make matters worse I didn't see a
                clear way to use Grey Matter to parse comments in Javascript. The simplist way i could find to import my blog posts was to maintain a register
                file that exported all of my components and metadata. This is only a few minutes work at the backend of each blog post but giving up dynamic
                imports wasnt something i wanted to do. What if i wanted to create thousands of blog posts and start a blogging empire? In 2022? Seems unlikely
                but lets solve the problem anyways.
            </p>

            <h2>The Solution:</h2>
            <p>
                To solve this problem i decided to write my own Javascript metadata markup at the top of each blog post. I would then write a simple parser that
                would read each blog post in the ./blog directory and use the metadata to write a register.ts javascript module at build time. I would still be
                able to use metadata and the work of maintaining a blog post registration file would be automated. I would also eliminate the greymatter
                dependancy.
            </p>
            <h2>The markup</h2>
            <p>
                At the top of each blog post file i added some simple markup. The parse that shown in the next step will look for this comment block. Shown
                below is the metadata for this post.
            </p>
            <CodeBlock language="language-javascript" file="./posts/examplePost.js">{`/*
    @start
    id: TailwindNotes
    title: Next.js Custom Dark Mode Theme using CSS Variables & Tailwind CSS
    date: 2022-01-01
    type: notes
    dependancies: Tailwinds v3.08, Next v12.0.7, React v17.0.2
    repo: https://github.com/GlennStreetman/nextJS-Tailwinds-CSSVariable-Darkmode-Example
    @end
*/

import CodeBlock from "../components/codeBlock";

const body = function () {...blog stuff}
export default body;
`}</CodeBlock>
            <h2>The parsing script:</h2>
            <p>
                The parser would need to:
                <ul>
                    <li>1. Iterate through each file in the ./posts directory</li>
                    <li>2. Parse the metadata</li>
                    <li>3. Then after all files are parsed, write the register file.</li>
                </ul>
                It's definitly a bit ugly but hopefully i wont need to look at it again for a bit. Note that the script should be saved as a .mjs file. /n is
                telling the parser to insert a new line. The rest of the magic is just simple file system operations and javascript string methods.
            </p>
            <CodeBlock language="language-javascript" file="./buildRegister.mjs">{`import fs from "fs";

export const buildScript = function () {
    console.log("rebuilding register");
    const files = fs.readdirSync("./posts/");
    const regex = /\r?\\n/g; //new line
    const allFilesMetaData = {};

    try {
        files.forEach((filePath) => {
            //for each file
            const file = fs.readFileSync(\`./posts/\${filePath}\`).toString();
            let run = false;
            const writeList = [];
            file.split(regex).every((el) => {
                //for each line
                if (el.includes("@start")) {
                    //start script
                    run = true;
                    return true;
                } else if (el.includes("@end")) {
                    //end script
                    run = false;
                    return false;
                } else if (run === true) {
                    //parse metadata
                    writeList.push(el);
                    return true;
                }
                return true;
            });

            const metaData = writeList.reduce((reducer, el) => {
                //conver meta data in to key/value object
                let [key, ...value] = el.split(":"); // split the string, at first instance of ':' into a key [value] pair.
                key = key.trim();
                value = value.join(":").trim();
                reducer[key] = value;
                return reducer;
            }, {});
            metaData["sourceFile"] = filePath; //add source file to meta data.
            const fileName = filePath.slice(0, filePath.indexOf(".")); //remove file extension
            allFilesMetaData[fileName] = metaData;
        });

        let imports = "";
        const typeScript = \`interface post {
    id: string;
    title: string;
    date: string;
    type: string;
    dependancies: string;
    repo: string;
    sourceFile: string;
}

interface allPosts {
    [key: string]: post;
}\`;
        let head = \`export const postsRegister: allPosts = \${JSON.stringify(allFilesMetaData)}\`;
        let body = "";

        Object.keys(allFilesMetaData).forEach((key) => {
            imports = imports + \`import \${key} from '../posts/\${key}'; \\n\`;
            body = body + \`\${key}:  \${key}, \\n\`;
        });

        body = \`export const postsComp = { \\n \${body} }\`;

        const writeText = imports + "\\n" + typeScript + "\\n" + head + "\\n" + body; //combine it all together.
        fs.writeFileSync("./registers/postRegister.ts", writeText); //write the file.
        console.log("Build Complete");
    } catch (error) {
        console.log("---REGISTER BUILD FAILED---: ", error);
    }
};`}</CodeBlock>

            <h2>Creating a script runner</h2>
            <p>
                Now we need a way to run the script. We could run the script each time we start our server but that doesn't yield the best development
                experience. Let's use {chokidar}, a file system watching package, to run the script each time there is a change to the /posts directory
            </p>

            <CodeBlock language="language-NPM" file="Console">{`>  npm install chokidar`}</CodeBlock>

            <CodeBlock language="language-javascript" file="./watchPosts.mjs">{`import { buildScript } from "./buildRegister.mjs";
import chokidar from "chokidar";

buildScript();
console.log("setting up watcher");

const watcher = chokidar.watch("./posts", {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
});

watcher
    .on("new", () => {
        console.log("new post added");
        buildScript();
    })
    .on("change", () => {
        console.log("post updated");
        buildScript();
    });
`}</CodeBlock>

            <h2>Register your script to package.json</h2>
            <p>
                'npm run watcher' will keep the "watcher" running in the background. Anytime it detects a file change, Next.js will automaticaly reflect the
                change. If you prefer you can always use the library like {concurrently} to run both "watcher" & "dev" at the same time.
            </p>
            <CodeBlock language="language-JSON" file="./package.json">{`    "scripts": {
        "watcher": "node watchPosts.mjs",
        "dev": "next dev ",
        "build": "next build",
        "start": "next start"
        ...
    },`}</CodeBlock>
            <p>
                Shown below is an example of the buildRegister.mjs output for my first two blog posts. The postRegister export contains all of the post meta
                data and postComp contains references to each posts body module.
            </p>

            <CodeBlock language="language-javascript" file="./registers/postRegister.ts">{`import buildScript from "../posts/buildScript";
import TailwindNotes from "../posts/TailwindNotes";

export const postsRegister = {
    buildScript: {
        id: "buildScript",
        title: "Custom Build Script",
        date: "2022-18-01",
        type: "notes",
        dependancies: "Tailwinds v3.08, Next v12.0.7, React v17.0.2",
        repo: "false",
        sourceFile: "buildScript.tsx",
    },
    TailwindNotes: {
        id: "TailwindNotes",
        title: "Next.js Custom Dark Mode Theme using CSS Variables & Tailwind CSS",
        date: "2022-01-01",
        type: "notes",
        dependancies: "Tailwinds v3.08, Next v12.0.7, React v17.0.2",
        repo: "https",
        sourceFile: "TailwindNotes.tsx",
    },
};
export const postsComp = {
    buildScript: buildScript,
    TailwindNotes: TailwindNotes,
};`}</CodeBlock>
            <p> Create a few functions to get and sort get post id's & sort post data.</p>

            <CodeBlock language="language-javascript" file="./components/posts.js">{`import { postsRegister } from "../registers/postRegister";

export function getSortedPostsData() {
    return Object.values(postsRegister).sort(({ date: a }, { date: b }) => {
        if (a < b) {
            return 1;
        } else if (a > b) {
            return -1;
        } else {
            return 0;
        }
    });
}

export function getAllPostIds() {
    return Object.values(postsRegister).map((register) => {
        return {
            params: {
                id: register.id,
            },
        };
    });
}`}</CodeBlock>

            <p>Include the sorted post data to my home page getStaticProps().</p>
            <CodeBlock language="language-javascript" file="./pages/_app.js">{`
import { useEffect } from "react";
import UserPrefs from "../components/userPrefs";

export default function App({ Component, pageProps }) {

    return (
        <>
            <UserPrefs />{" "}
            <div className="font-body pt-7 bg-primary">
                <Component {...pageProps}> </Component>
            </div>
        </>
    );
}`}</CodeBlock>
            <p>And finaly add static paths to the dynamic posts page.</p>
            <CodeBlock language="language-javascript" file="./pages/[id].js">{`import { postsRegister, postsComp } from "../../registers/postRegister";

    export async function getStaticProps({ params }) {
        return {
            props: {
                ...postsRegister[params.id],
            },
        };
    }
    
    export async function getStaticPaths() {
        const paths = getAllPostIds();
        return {
            paths,
            fallback: false,
        };
    }
    
    export default function PostBody(postData) {
        const name = "Glenn Streetman";
    
        return (
            <div className="min-h-screen bg-primary ">
                <Head>
                    <title>{postData.title}</title>
                </Head> ....
            
            `}</CodeBlock>
        </div>
    );
};

const metaDataLink = (
    <a href="https://nextjs.org/learn/basics/assets-metadata-css/metadata" target="_blank">
        metadata
    </a>
);

const dnamicImportLink = (
    <a href="https://nextjs.org/docs/advanced-features/dynamic-import" target="_blank">
        The Next.js docs
    </a>
);

const greyMatter = (
    <a href="https://www.npmjs.com/package/gray-matter" target="_blank">
        Grey Matter
    </a>
);

const nextJSTutorial = (
    <a href="https://nextjs.org/learn/basics/create-nextjs-app?utm_source=next-site&utm_medium=nav-cta&utm_campaign=next-website" target="_blank">
        Next.js tutorial
    </a>
);

const chokidar = (
    <a href="https://www.npmjs.com/package/concurrently" target="_blank">
        Chokidar
    </a>
);

const concurrently = (
    <a href="https://www.npmjs.com/package/concurrently" target="_blank">
        Concurrently
    </a>
);

export default body;
