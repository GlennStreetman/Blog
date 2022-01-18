import tailwinds from "../posts/TailwindNotes";

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
};

export const postsComp = {
    [tailwinds.head.id]: tailwinds.body,
};
