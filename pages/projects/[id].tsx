import React from "react";
import { getAllProjectIds } from "../../lib/projects";
import styles from "./projects.module.css";
import BackButton from "../../components/backButton";
import Topper from "../../components/topper";
import { projectRegister, projectComp } from "../../registers/projectRegister";
import Head from "next/head";
import { getSortedPostsData } from "../../lib/posts";
import Link from "next/link";
import SourceTrail from "../../components/sourceTrail";
import Date from "../../components/date";
import ActiveLogo from "../../components/activeLogo";
import Comments from "../../components/comment";

export async function getStaticProps({ params }) {
    const allPostsData = getSortedPostsData();
    const filteredPosts = allPostsData.reduce((prev, curr) => {
        if (curr.project === params.id) {
            prev.push(curr);
        }
        return prev;
    }, []);
    return {
        props: {
            ...projectRegister[params.id],
            filteredPosts,
        },
    };
}

export async function getStaticPaths() {
    const paths = getAllProjectIds();
    return {
        paths,
        fallback: false,
    };
}

function projects(projectData) {
    return (
        <div className="min-h-screen bg-primary ">
            <Head>
                <title>{projectData.project}</title>
            </Head>
            <Topper />
            <div className="grid grid-cols-12 gap-6 mb-auto text-xs sm:text-base">
                <div className={`col-span-0 md:col-span-2`} />
                <div className={`flex flex-col w-screen sm:w-auto col-span-12 md:col-span-8 p-2 gap-2`}>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-5 sm:col-span-4 md:col-span-3 lg:col-span-3">
                            <ActiveLogo />
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
                                        {projectData.live}
                                    </a>
                                </h3>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div>
                        <article className={styles.article}>
                            <div>{projectComp[projectData.id]()}</div>
                            {projectData?.filteredPosts?.length > 0 ? <h2>Related Posts: </h2> : <></>}
                            {projectData.filteredPosts.map((el) => (
                                <section key={el.id}>
                                    <Link href={`/posts/${el.id}`} passHref>
                                        <div className="shadow rounded-md border-2 p-2 mt-2 outline-4 hover:bg-weak">
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
                        </article>
                        <Comments post={projectData.project} />
                        <BackButton />
                    </div>
                </div>
                <div className={`col-span-0 md:col-span-2`} />
            </div>
        </div>
    );
}

export default projects;
