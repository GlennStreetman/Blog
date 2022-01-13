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
                <h2 className="text-accent">Blog</h2>
                <div className="flex flex-col space-y-2">
                    {p.allPostsData.map(({ id, date, title }) => (
                        <div className="shadow rounded-md border-2 p-2 outline-4 hover:bg-sky-100" key={id}>
                            <Link href={`/posts/${id}`}>
                                <a className="text-secondary">{title}</a>
                            </Link>
                            <br />
                            <small className="text-primary">
                                <Date dateString={date} />
                            </small>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
