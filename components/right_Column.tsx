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
            <section className={utilStyles.headingMd}></section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2>Blog</h2>
                <ul className={utilStyles.list}>
                    {p.allPostsData.map(({ id, date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/posts/${id}`}>
                                <a>{title}</a>
                            </Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}
