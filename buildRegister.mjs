import fs from "fs";

export const buildScript = function () {
    // console.log("rebuilding register");
    const files = fs.readdirSync("./posts/");
    const regex = /\r?\n/g; //new line
    const allFilesMetaData = {};

    try {
        files.forEach((filePath) => {
            //for each file
            const file = fs.readFileSync(`./posts/${filePath}`).toString();
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
        const typeScript = `interface post {
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

interface allPosts {
    [key: string]: post;
}`;
        let head = `export const postsRegister: allPosts = ${JSON.stringify(allFilesMetaData)}`;
        let body = "";

        Object.keys(allFilesMetaData).forEach((key) => {
            imports = imports + `import ${key} from '../posts/${key}'; \n`;
            body = body + `${key}:  ${key}, \n`;
        });

        body = `export const postsComp = { \n ${body} }`;

        const writeText = imports + "\n" + typeScript + "\n" + head + "\n" + body; //combine it all together.
        fs.writeFileSync("./registers/postRegister.ts", writeText); //write the file.
        // console.log("Build Complete");
    } catch (error) {
        console.log("---REGISTER BUILD FAILED---: ", error);
    }
};
