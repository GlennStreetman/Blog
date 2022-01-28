import buildScript from "../posts/buildScript";
import materialConversion from "../posts/materialConversion";
import TailwindNotes from "../posts/TailwindNotes";

interface post {
    id: string;
    title: string;
    date: string;
    type: string;
    dependancies?: string;
    repo?: string;
    sourceFile?: string;
    languages?: string;
    project?: string;
}

interface allPosts {
    [key: string]: post;
}
export const postsRegister: allPosts = {
    buildScript: {
        id: "buildScript",
        title: "Dynamicly importing javascript modules using a custom build script & Next.js",
        date: "2022-01-18",
        type: "notes",
        dependancies: "Tailwinds v3.08, Next v12.0.7, React v17.0.2",
        repo: "https://github.com/GlennStreetman/Blog",
        languages: "language-NPM,language-Next",
        project: "Blog",
        sourceFile: "buildScript.tsx",
    },
    materialConversion: {
        id: "materialConversion",
        title: "Considerations when migrating a project to Material UI",
        date: "2022-01-25",
        type: "notes",
        languages: "language-MaterialUI",
        project: "Finndash",
        sourceFile: "materialConversion.tsx",
    },
    TailwindNotes: {
        id: "TailwindNotes",
        title: "Next.js Custom Dark Mode Theme using CSS Variables & Tailwind CSS",
        date: "2022-01-01",
        type: "notes",
        dependancies: "Tailwinds v3.08, Next v12.0.7, React v17.0.2",
        repo: "https://github.com/GlennStreetman/nextJS-Tailwinds-CSSVariable-Darkmode-Example",
        languages: "language-Next,language-CSS,language-Tailwind",
        project: "Blog",
        sourceFile: "TailwindNotes.tsx",
    },
};
export const postsComp = {
    buildScript: buildScript,
    materialConversion: materialConversion,
    TailwindNotes: TailwindNotes,
};
