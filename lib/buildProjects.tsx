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
}

interface allProjects {
    [key: string]: project;
}

const buildProjects = function () {
    const files = fs.readdirSync("./projects/");
    const regex = /\r?\n/g; //new line
    const allFilesMetaData: allProjects = {};

    try {
        files.forEach((filePath) => {
            //for each file
            const file = fs.readFileSync(`./projects/${filePath}`).toString();
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
        console.log("---REGISTER BUILD PROJECTS FAILED---: ", error);
    }
};

export default buildProjects;
