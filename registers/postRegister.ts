import { test, testMeta } from '../posts/test'
import { test2, test2Meta } from '../posts/test2'
import { NextNotes, nextNotesMeta } from '../posts/Next-Notes'

interface post {
    id: string,
    title: string,
    date: string,
    type: string,
}

interface allPosts {
    [key: string]: post
}

export const postsRegister: allPosts = {
    [testMeta.id]: testMeta,
    [test2Meta.id]: test2Meta,
    [nextNotesMeta.id]: nextNotesMeta,

}

export const postsComp = {
    [testMeta.id]: test,
    [test2Meta.id]: test2,
    [nextNotesMeta.id]: NextNotes,
}

