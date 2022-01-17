import tailwinds from "../posts/Tailwind-Notes";
import nextJS from "../posts/Next-Notes";

interface post {
    id: string;
    title: string;
    date: string;
    type: string;
}

interface allPosts {
    [key: string]: post;
}

export const postsRegister: allPosts = {
    [tailwinds.head.id]: tailwinds.head,
    [nextJS.head.id]: nextJS.head,
};

export const postsComp = {
    [tailwinds.head.id]: tailwinds.body,
    [nextJS.head.id]: nextJS.body,
};
