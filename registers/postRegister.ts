import TailwindNotes from "../posts/TailwindNotes";
import buildScript from "../posts/buildScript";
import materialConversion from "../posts/materialConversion";
import nextAuth from "../posts/nextAuth";

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
export const postsRegister: allPosts = {
    TailwindNotes: {
        id: "TailwindNotes",
        title: "Next.js Custom Dark Mode Theme using CSS Variables & Tailwind CSS",
        date: "2022-01-01",
        type: "notes",
        dependancies: "Tailwinds v3.08, Next v12.0.7, React v17.0.2",
        repo: "https://github.com/GlennStreetman/nextJS-Tailwinds-CSSVariable-Darkmode-Example",
        languages: "language-Next,language-CSS,language-Tailwind",
        project: "resumeBlogGenerator",
        sourceFile: "TailwindNotes.tsx",
    },
    buildScript: {
        id: "buildScript",
        title: "Dynamicly importing javascript modules using a custom build script & Next.js",
        date: "2022-01-18",
        type: "notes",
        dependancies: "Tailwinds v3.08, Next v12.0.7, React v17.0.2",
        repo: "https://github.com/GlennStreetman/Blog",
        languages: "language-NPM,language-Next",
        project: "resumeBlogGenerator",
        sourceFile: "buildScript.tsx",
    },
    materialConversion: {
        id: "materialConversion",
        title: "Considerations when migrating a project to Material UI",
        date: "2022-01-25",
        type: "notes",
        languages: "language-MaterialUI",
        project: "FinnDash",
        sourceFile: "materialConversion.tsx",
    },
    nextAuth: {
        id: "nextAuth",
        title: "Domain wide login using NextAuth",
        date: "2022-03-17",
        type: "notes",
        dependancies: "Nextjsv12.0.9, NextAuthv4.2.1",
        languages: "language-Next",
        project: "resumeBlogGenerator",
        sourceFile: "nextAuth.tsx",
    },
};
export const postsComp = {
    TailwindNotes: TailwindNotes,
    buildScript: buildScript,
    materialConversion: materialConversion,
    nextAuth: nextAuth,
};
