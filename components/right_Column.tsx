import React from "react";
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
            <h2 className="text-accent font-heading">Blog</h2>
            <div className="flex flex-col space-y-2">
                {p.allPostsData.map(({ id, date, title }) => (
                    <section key={id}>
                        <Link href={`/posts/${id}`} passHref>
                            <div className="shadow rounded-md border-2 p-2 outline-4 hover:bg-weak">
                                <div className="text-secondary font-heading">{title}</div>
                                <small className="text-primary">
                                    <Date dateString={date} />
                                </small>
                            </div>
                        </Link>
                    </section>
                ))}
            </div>
        </>
    );
}
