import React from "react";
import Head from "next/head";
import Header, { siteTitle } from "../components/Header";
import Link from "next/link";
import SourceTrail from "../components/sourceTrail";
import HoverSurface from "../components/hoverSurface";

interface props {
    allProjectData: any;
}

function Left_Column(p: props) {
    return (
        <>
            <Header home />
            <Head>
                <title>{siteTitle}</title>
                <meta name="description" content="Glenn Streetmans Web Blog, Projects, and notes." />
            </Head>
            <div className="space-y-2">
                <h2 className="text-accent font-heading text-2xl tracking-wider">Projects</h2>
                <div className="flex flex-col space-y-2">
                    {p.allProjectData.map((el) => (
                        <section key={el.id}>
                            <HoverSurface>
                                <Link href={`/projects/${el.id}`} passHref>
                                    <a>
                                        <div className="text-secondary tracking-wide font-heading">{el.project}</div>
                                        <div className="text-primary">{el.description}</div>
                                        <div className="flex gap-2 my-auto">
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
                        </section>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Left_Column;
