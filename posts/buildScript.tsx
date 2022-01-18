/*
    @start
    id: buildScript
    title: Custom Build Script
    date: 2022-18-01
    type: notes
    dependancies: Tailwinds v3.08, Next v12.0.7, React v17.0.2
    repo: false
    @end
*/

import CodeBlock from "../components/codeBlock";

export const head = {
    id: "buildScript",
    title: "Custom Build Script",
    date: "2022-18-01",
    type: "notes",
    dependancies: "Tailwinds v3.08, Next v12.0.7, React v17.0.2",
    repo: "false",
};

export function body() {
    return (
        <div className="article">
            <h2>a</h2>
            <p>a</p>
        </div>
    );
}

const metaDataLink = (
    <a href="https://nextjs.org/learn/basics/assets-metadata-css/metadata" target="_blank">
        metadata
    </a>
);

const dynamicImportLink = (
    <a href="https://nextjs.org/docs/advanced-features/dynamic-import" target="_blank">
        dynamic import
    </a>
);

const post = {
    head: head,
    body: body,
};

export default post;
