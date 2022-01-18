import buildScript from "../posts/buildScript";
import TailwindNotes from "../posts/TailwindNotes";

interface post {
    id: string;
    title: string;
    date: string;
    type: string;
    dependancies: string;
    repo: string;
    sourceFile: string;
}

interface allPosts {
    [key: string]: post;
}
export const postsRegister: allPosts = {
    buildScript: {
        id: "buildScript",
        title: "Custom Build Script",
        date: "2022-18-01",
        type: "notes",
        dependancies: "Tailwinds v3.08, Next v12.0.7, React v17.0.2",
        repo: "false",
        sourceFile: "buildScript.tsx",
    },
    TailwindNotes: {
        id: "TailwindNotes",
        title: "Next.js Custom Dark Mode Theme using CSS Variables & Tailwind CSS",
        date: "2022-01-01",
        type: "notes",
        dependancies: "Tailwinds v3.08, Next v12.0.7, React v17.0.2",
        repo: "https",
        sourceFile: "TailwindNotes.tsx",
    },
};
export const postsComp = {
    buildScript: buildScript.body,
    TailwindNotes: TailwindNotes.body,
};
