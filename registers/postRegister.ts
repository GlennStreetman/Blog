import { tailNotes, tailNotesMeta } from "../posts/Tailwind-Notes";
import { test2, test2Meta } from "../posts/test2";
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
    [test2Meta.id]: test2Meta,
    [nextNotesMeta.id]: nextNotesMeta,
};

export const postsComp = {
    [tailNotesMeta.id]: tailNotes,
    [test2Meta.id]: test2,
    [nextNotesMeta.id]: NextNotes,
};
