import CodeBlock from "../components/codeBlock";

export const head = {
    id: "Next-Notes",
    title: "Notes on Getting Started: Next JS.",
    date: "2021-12-30",
    type: "notes",
};

function body() {
    return (
        <>
            <h1>
                Pages: Next.js breaks a react SPA into pages. Pages are React Components exported from a file in the pages directory. The file name becomes a
                route.
            </h1>
            <p>
                CSS: Built in support for CSS, SCSS, and styled-jsx. CSS libraries like Tailwinds is also supported. CSS Modules: Files ending in
                *.module.css/.scss/.sass are css modules. They can be imported into individual components and become scoped to the component, using unique css
                class names. Global CSS: In pages/_app.js import your CSS files. Components: Link: Returns a next JS navigable link. The link allows client side
                navigation. Each page will preload content for all pages referenced by links on current page. This helps optimize performance. Image: Automates
                image optimization. Works with any data source, including remote images. Next.js optimizes images on demand. Script: Optimizes loading of
                scripts. Pre-Rendering: To Check that pre-rendering is working correctly disable javascript in the browser then reload the page. - **Static
                Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request. -
                **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**. Importantly, Next.js lets you **choose**
                which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using
                Server-side Rendering for others. You can also use Client-side Rendering along with Static Generation or Server-side Rendering. That means some
                parts of a page can be rendered entirely by client side JavaScript. To learn more, take a look at the Data Fetching documentation. Statis
                Generation with Data: Use getStaticProps()
                <CodeBlock language="language-javascript">
                    {`useEffect(() => {
    if (typeof window !== 'undefined') {
        Prism.highlightAll();
    }
}, []);`}
                </CodeBlock>
                This tells next.js that a static page has some data dependancies. Runs at build time in production. On every request in dev. Can only be
                exported from a page. To use Server-side Rendering, you need to export getServerSideProps instead of getStaticProps from your page. export async
                function getServerSideProps(context) Dynamic Routes: Pages that begin with [ and end with ] are dynamic routes. Use file system operations to
                return a list of files avaiable from dynamic route files. The file name list must be an array of objects
                {/* <SyntaxHighlighter language="javascript" style={dark}>{`{params: { id: string}}[]`}</SyntaxHighlighter> */}
                Dynamic routes can be extended to catch all paths by adding three dots (...) inside the brackets. To create a custom 404 page, create
                pages/404.js. This file is statically generated at build time. Server Side Routes: API Routes let you create an API endpoint inside a Next.js
                app. You can do so by creating a function inside the pages/api directory that has the following format: export default function handler(req,
                res){" "}
                {
                    // ...
                }
                Typescript: create a tsconfig.json install typescript npm install --save-dev typescript @types/react @types/node start Next.js app, and you are
                off to the races.
            </p>
        </>
    );
}

const post = {
    head: head,
    body: body,
};

export default post;
