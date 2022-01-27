import finndash from "../projects/finndash";

interface project {
    id: string;
    description: string;
    date: string;
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
    finndash: {
        id: "finnDash",
        project: "finnDash",
        description:
            "A single page web application for designing dashboards, building & sharing dataset with GraphQL, and Excel Templating using Finnhub.io API data. The front end uses React with Redux and is styled with MaterialUi. The back end is deployed using Docker-Compose. HTTP requests are handled by Express. Account data is saved in Postgres. Caching is handled by MongoDB. Datasets can be shared using GraphQL. Testing is performed using Jest & Testing Library. Hosted on AWS EC2.",
        date: "2022-01-18",
        repo: "https://github.com/GlennStreetman/finnHub-Dashboard",
        languages:
            "language-typescript,language-React,language-Redux,language-Express,language-Postgres,language-MongoDB,language-GraphQL,language-MaterialUI,language-Jest,language-testingLibrary,language-docker",
    },
};
export const projectComp = {
    finndash: finndash,
};
