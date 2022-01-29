import React from "react";
import Link from "next/link";
import Date from "./date";
import SourceTrail from "../components/sourceTrail";

interface props {
    allPostsData: any;
}

export default function Right_Column(p: props) {
    return (
        <div className="space-y-2">
            <h2 className="text-accent font-heading">Blog</h2>
            <div className="flex flex-col space-y-2">
                {p.allPostsData.map((el) => (
                    <section key={el.id}>
                        <Link href={`/posts/${el.id}`} passHref>
                            <div className="shadow rounded-md border-2 p-2 outline-4 hover:bg-weak">
                                <div className="text-secondary font-heading">{el.title}</div>
                                <div className="flex gap-2 my-auto">
                                    <small className="text-primary">
                                        <Date dateString={el.date} />
                                    </small>
                                    <SourceTrail
                                        tech={
                                            el?.languages
                                                ? el.languages.split(",").map(function (item) {
                                                      return item.trim();
                                                  })
                                                : []
                                        }
                                        post={`post-${el.id}`}
                                    />
                                </div>
                            </div>
                        </Link>
                    </section>
                ))}
            </div>
        </div>
    );
}
