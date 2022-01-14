import { tailNotes, tailNotesMeta } from "../posts/Tailwind-Notes";
import { NextNotes, nextNotesMeta } from "../posts/Next-Notes";

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
    [tailNotesMeta.id]: tailNotesMeta,
    [nextNotesMeta.id]: nextNotesMeta,
};

export const postsComp = {
    [tailNotesMeta.id]: tailNotes,
    [nextNotesMeta.id]: NextNotes,
};
