import React from "react";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Date from "./date";
import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
}

export default function Right_Column(p: any) {
    return (
        <>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2>Blog</h2>
                <div className="flex flex-col space-y-2">
                    {p.allPostsData.map(({ id, date, title }) => (
                        <div className="shadow rounded-md border-2 p-2 outline-4 hover:bg-sky-100" key={id}>
                            <Link href={`/posts/${id}`}>
                                <a>{title}</a>
                            </Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} />
                            </small>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
