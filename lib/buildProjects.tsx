import fs from "fs";

interface project {
    id: string;
    description: string;
    dependancies?: string;
    repo?: string;
    sourceFile?: string;
    languages?: string;
    project?: string;
    date?: string;
    live?: string;
    priority: number
}

interface allProjects {
    [key: string]: project;
}

const buildProjects = function () {
    return new Promise(async (res, rej) => {
        const files = fs.readdirSync("./projects/");

        const allFilesMetaData: allProjects = {};
        try {
            const readFiles = files.map((filePath) => {
                return new Promise(async (res, rej) => {
                    const { Meta } = await import(`/projects/${filePath}`);
                    allFilesMetaData[filePath.replace(".mdx", "")] = Meta;
                    res(true);
                });
            });
            Promise.all(readFiles).then(() => {
                res(allFilesMetaData);
            });
        } catch (error) {
            console.log("---Build Posts failed--: ", error);
            rej(false);
        }
    });
};

export default buildProjects;


const buildStingers =  function () {
    return new Promise(async (res, rej) => {
        const files = fs.readdirSync("./projectStingers/");

        const allFilesMetaData: allProjects = {};
        try {
            const readFiles = files.map((filePath) => {
                return new Promise(async (res, rej) => {
                    const { Meta } = await import(`/projects/${filePath}`);
                    allFilesMetaData[filePath.replace(".mdx", "")] = Meta;
                    res(true);
                });
            });
            Promise.all(readFiles).then(() => {
                res(allFilesMetaData);
            });
        } catch (error) {
            console.log("---Build Posts failed--: ", error);
            rej(false);
        }
    });
};

export {buildStingers}