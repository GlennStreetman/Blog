import React from "react";
import { getAllProjectIds } from "../../lib/projects";
import styles from "./projects.module.css";
import BackButton from "../../components/backButton";
import Topper from "../../components/topper";
import { projectRegister, projectComp } from "../../registers/projectRegister";
import Head from "next/head";

export async function getStaticProps({ params }) {
    console.log("paramas left", params.id, projectRegister, projectRegister[params.id]);
    return {
        props: {
            ...projectRegister[params.id],
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
    const name = "Glenn Streetman";
    console.log("projectdata id", projectData, projectRegister);
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
                        <div className="col-span-2">
                            <div className="h-full aspect-w-3 aspect-h-3 sm:aspect-w-2 sm:aspect-h-4 md:aspect-w-3 md:aspect-h-3 lg:aspect-h-2 lg:aspect-w-3">
                                <img className="object-cover shadow-lg rounded-lg" src="/images/profile.jpg" alt={name} />
                            </div>
                        </div>

                        <div className="col-span-10 my-auto">
                            <h1 className="text-accent text-2xl">{projectData.project}</h1>
                            <h2 className="text-secondary">{/* <Date dateString={projectData.date} /> */}</h2>
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
                        </div>
                    </div>
                    <div>
                        <article className={styles.article}>
                            <div>{projectComp[projectData.id]()}</div>
                        </article>
                        <BackButton />
                    </div>
                </div>
                <div className={`col-span-0 md:col-span-2`} />
            </div>
        </div>
    );
}

export default projects;
