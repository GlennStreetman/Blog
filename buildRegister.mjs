import fs from "fs";

const files = fs.readdirSync("./posts/");
const regex = /\r?\n/g;
const allFilesMetaData = {};

try {
    files.forEach((filePath) => {
        const file = fs.readFileSync(`./posts/${filePath}`).toString();
        let run = false;
        const writeList = [];
        file.split(regex).every((el) => {
            if (el.includes("start")) {
                run = true;
                return true;
            } else if (el.includes("end")) {
                run = false;
                return false;
            } else if (run === true) {
                writeList.push(el);
                return true;
            }
            return true;
        });

        const metaData = writeList.reduce((red, el) => {
            let [key, value] = el.split(":");
            key = key.trim();
            value = value.trim();
            red[key] = value;
            return red;
        }, {});
        metaData["sourceFile"] = filePath;
        const fileName = filePath.slice(0, filePath.indexOf("."));
        allFilesMetaData[fileName] = metaData;
    });

    let imports = "";
    const typeScript = `interface post {
    id: string;
    title: string;
    date: string;
    type: string;
    sourceFile: string;
}

interface allPosts {
    [key: string]: post;
}`;
    let head = `export const postsRegister: allPosts = ${JSON.stringify(allFilesMetaData)}`;
    let body = "";

    Object.keys(allFilesMetaData).forEach((key) => {
        imports = imports + `import ${key} from '../posts/${key}'; \n`;
        body = body + `${key}:  ${key}.body, \n`;
    });

    body = `export const postsComp = { \n ${body} }`;

    const writeText = imports + "\n" + typeScript + "\n" + head + "\n" + body;
    fs.writeFileSync("./registers/postRegister.ts", writeText);

    console.log("Build Complete");
} catch (error) {
    console.log("---REGISTER BUILD FAILED---: ", error);
}
