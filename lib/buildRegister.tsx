import fs from "fs";

export interface post {
    id: string;
    title: string;
    date: string;
    type: string;
    dependancies?: string;
    repo?: string;
    sourceFile?: string;
    project?: string;
    languages?: string;
}

export interface allPosts {
    [key: string]: post;
}

const buildPosts = function () {
    return new Promise(async (res, rej) => {
        const files = fs.readdirSync("./posts/");
        const allFilesMetaData: allPosts = {};
        try {
            const readFiles = files.map((filePath) => {
                return new Promise(async (res, rej) => {
                    const { Meta } = await import(`/posts/${filePath}`);
                    allFilesMetaData[filePath.replace(".mdx", "")] = Meta;
                    res(true);
                });
            });
            Promise.all(readFiles).then(() => {
                res(allFilesMetaData);
            });
        } catch (error) {
            console.log("---REGISTER BUILD FAILED---: ", error);
            rej("---REGISTER BUILD FAILED---");
        }
    });
};

export default buildPosts;
