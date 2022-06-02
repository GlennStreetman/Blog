import React from "react";
import Link from "next/link";
import Date from "./date";
import SourceTrail from "../components/sourceTrail";
import HoverSurface from "../components/hoverSurface";

interface props {
    allPostsData: any;
}

export default function Right_Column(p: props) {
    return (
        <div className="space-y-2">
            <h2 className="text-accent font-heading text-2xl">Blog</h2>
            <div className="flex flex-col space-y-2">
                {p.allPostsData.map((el) => (
                    <section key={el.id}>
                        <HoverSurface>
                            <Link href={`/posts/${el.id}`} passHref>
                                <a>
                                    <div className="text-secondary tracking-wide font-heading">{el.title}</div>
                                    {el.oneliner ? <div className="text-primary font-extralight text-sm tracking-wide ">{el.oneliner}</div> : <></>}
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
                                </a>
                            </Link>
                        </HoverSurface>
                        {/* </div> */}
                    </section>
                ))}
            </div>
        </div>
    );
}
