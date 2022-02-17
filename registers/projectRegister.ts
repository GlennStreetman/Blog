import FinnDash from "../projects/FinnDash";
import copyExcelChart from "../projects/copyExcelChart";
import resumeBlogGenerator from "../projects/resumeBlogGenerator";

interface project {
    id: string;
    description: string;
    dependancies?: string;
    repo?: string;
    sourceFile?: string;
    languages?: string;
    project?: string;
}

interface allProjects {
    [key: string]: project;
}

export const projectRegister: allProjects = {
    FinnDash: {
        id: "FinnDash",
        project: "App: FinnDash",
        description:
            "A single page web application for designing dashboards, building & sharing dataset with GraphQL, and Excel Templating using Finnhub.io API data. The front end uses React with Redux and is styled with MaterialUi. The back end is deployed using Docker-Compose. HTTP requests are handled by Express. Account data is saved in Postgres. Caching is handled by MongoDB. Datasets can be shared using GraphQL. Testing is performed using Jest & Testing Library. Hosted on AWS EC2.",
        repo: "https://github.com/GlennStreetman/finnHub-Dashboard",
        languages:
            "language-typescript,language-React,language-Redux,language-Express,language-Postgres,language-MongoDB,language-GraphQL,language-MaterialUI,language-Jest,language-testingLibrary,language-docker",
    },
    copyExcelChart: {
        id: "copyExcelChart",
        project: "NPM Package: Copy-Excel-Chart",
        description:
            "An NPN Package used to copy charts between excel spreadsheets using NodeJS. Uses AdmZip to unpack Excel templates into source XML files. xml2js is then used to find and copy excel charts into destination files.",
        repo: "https://github.com/GlennStreetman/copyExcelChart",
        languages: "language-javascript,language-NPM",
    },
    resumeBlogGenerator: {
        id: "resumeBlogGenerator",
        project: "App: Personal Blog",
        description: "Place holder gibberish",
        repo: "https:github.com/GlennStreetman/Blog",
        languages: "language-javascript,language-Next,language-Tailwind",
    },
    SQLReporting: {
        id: "SQLReporting",
        project: "Past Work: Financial system SQL Reporting",
        description: "Lessons from Building SQL Reports for Financial Systems",
        languages: "language-javascript,language-Next,language-Tailwind",
    },
};
export const projectComp = {
    FinnDash: FinnDash,
    copyExcelChart: copyExcelChart,
    resumeBlogGenerator: resumeBlogGenerator,
};
