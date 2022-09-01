import React from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";

import Youtube from '../../components/youtubeWIndow'

import styles from "./projects.module.css";

import { getAllProjectIds } from "../../lib/projects";
import { getSortedPostsData } from "../../lib/posts";
import buildProjects from "../../lib/buildProjects";

import HomeButton from "../../components/HomeButton";
import SourceTrail from "../../components/sourceTrail";
import Date from "../../components/date";
import LogoPicker from "../../components/LogoPicker";
import Comments from "../../components/comment";
import HoverSurface from "../../components/hoverSurface";

export async function getStaticProps({ params }) {
    const allProjects = await buildProjects();
    const allPostsData = await getSortedPostsData();
    // @ts-ignore
    const filteredPosts = allPostsData.reduce((prev, curr) => {
        if (curr.project === params.id) {
            prev.push(curr);
        }
        return prev;
    }, []);
    return {
        props: {
            ...allProjects[params.id],
            filteredPosts,
        },
    };
}

export async function getStaticPaths() {
    const paths = await getAllProjectIds();
    return {
        paths,
        fallback: false,
    };
}

function projects(projectData) {
    const DynamicBody = dynamic(() => import(`../../projects/${projectData.id}.mdx`));
    return (
        <div className="min-h-screen bg-primary ">
            <Head>
                <title>{projectData.project}</title>
            </Head>
            <div className="grid grid-cols-12 gap-6 mb-auto text-xs sm:text-base">
                <div className={`col-span-0 md:col-span-2`} />
                <div className={`flex flex-col w-screen sm:w-auto col-span-12 md:col-span-8 p-2 gap-2`}>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-5 sm:col-span-4 md:col-span-3 lg:col-span-3">
                            <LogoPicker />
                        </div>

                        <div className="col-span-7 sm:col-span-8 md:col-span-9 lg:col-span-9 my-auto">
                            <h1 className="text-accent text-2xl">{projectData.project}</h1>
                            <h3 className="text-primary">{projectData.dependancies}</h3>

                            {projectData.repo ? (
                                <h3 className="text-primary">
                                    <a
                                        className="text-secondary font-bold text-lg italic hover:text-accent  hover:font-bold  hover:text-lg  hover:italic"
                                        href={projectData.repo}
                                    >
                                        Github
                                    </a>
                                </h3>
                            ) : (
                                <></>
                            )}

                            {projectData.live ? (
                                <h3 className="text-primary">
                                    <a
                                        className="text-secondary font-bold text-lg italic hover:text-accent  hover:font-bold  hover:text-lg  hover:italic"
                                        href={projectData.live}
                                    >
                                        View Deployed Example
                                    </a>
                                </h3>
                            ) : (
                                <></>
                            )}

                        </div>
                    </div>
                    <div>
                    {projectData.youtube ? (
                        // <div>{projectData.youtube}</div>
                        <Youtube link={projectData.youtube} />
                    ) : (
                        <></>
                    )}
                        <article className={styles.article}>
                            <DynamicBody />
                            {projectData?.filteredPosts?.length > 0 ? <h2>Related Posts: </h2> : <></>}
                            {projectData.filteredPosts.map((el) => (
                                <section className="mt-2" key={el.id}>
                                    <HoverSurface>
                                        <Link href={`/posts/${el.id}`} passHref>
                                            <a>
                                                {/* <div className="shadow rounded-md border-2 p-2 mt-2 outline-4 hover:bg-weak"> */}
                                                <h2>{el.title}</h2>
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
                                                {/* </Link> </div> */}
                                            </a>
                                        </Link>
                                    </HoverSurface>
                                </section>
                            ))}
                        </article>
                        <div className="mt-4">
                            <Comments post={projectData.project} />
                        </div>
                        <div className="flex mt-4">
                            <HomeButton text="Home" />
                        </div>
                        {/* <Comments post={projectData.project} />
                        <HomeButton>Back</HomeButton> */}
                    </div>
                </div>
                <div className={`col-span-0 md:col-span-2`} />
            </div>
        </div>
    );
}

export default projects;
