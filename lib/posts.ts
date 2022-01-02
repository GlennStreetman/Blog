import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { postsRegister, postsComp } from "../registers/postRegister";

interface postFormat {
    id: string;
    content: string;
    title: string;
    type: string;
    date: string;
}

interface matterRet {
    content: string;
    data: any;
}

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
    return Object.values(postsRegister).sort(({ date: a }, { date: b }) => {
        if (a < b) {
            return 1;
        } else if (a > b) {
            return -1;
        } else {
            return 0;
        }
    });
}

export function getAllPostIds() {
    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'example1'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'example2'
    //     }
    //   }
    // ]
    return Object.values(postsRegister).map((register) => {
        return {
            params: {
                id: register.id,
            },
        };
    });
}
