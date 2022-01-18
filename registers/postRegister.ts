import TailwindNotes from '../posts/TailwindNotes'; 

interface post {
    id: string;
    title: string;
    date: string;
    type: string;
    sourceFile: string;
}

interface allPosts {
    [key: string]: post;
}
export const postsRegister: allPosts = {"TailwindNotes":{"id":"TailwindNotes","title":"Next.js Custom Dark Mode Theme using CSS Variables & Tailwind CSS","date":"2022-01-01","type":"notes","sourceFile":"TailwindNotes.tsx"}}
export const postsComp = { 
 TailwindNotes:  TailwindNotes.body, 
 }