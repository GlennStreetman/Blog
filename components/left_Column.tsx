import React from "react";
import Head from "next/head";
import Header, { siteTitle } from "../components/Header";
import Projects from "./projects";
import Link from "next/link";
import Date from "./date";
import SourceTrail from "../components/sourceTrail";

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
                <h2 className="text-accent font-heading">Projects</h2>
                <div className="flex flex-col space-y-2">
                    {p.allProjectData.map((el) => (
                        <section key={el.id}>
                            <Link href={`/projects/${el.id}`} passHref>
                                <div className="shadow rounded-md border-2 p-2 outline-4 hover:bg-weak">
                                    <div className="text-secondary font-heading">{el.project}</div>
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
                                </div>
                            </Link>
                        </section>
                    ))}
                </div>
            </div>
            {/* <Projects /> */}
        </>
    );
}

export default Left_Column;
