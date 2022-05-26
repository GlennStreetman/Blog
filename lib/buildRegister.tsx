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
    const files = fs.readdirSync("./posts/");
    const regex = /\r?\n/g; //new line
    const allFilesMetaData: allPosts = {};

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

        return allFilesMetaData;
    } catch (error) {
        console.log("---REGISTER BUILD FAILED---: ", error);
    }
};

export default buildPosts;
