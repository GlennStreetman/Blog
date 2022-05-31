import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";

import styles from "./posts.module.css";

import { getAllPostIds } from "../../lib/posts";
import postsRegister from "../../lib/buildRegister";
import { getSortedProjectData } from "../../lib/projects";

import HomeButton from "../../components/HomeButton";
import Comments from "../../components/comment";
import ActiveLogo from "../../components/activeLogo";
import Date from "../../components/date";
import SourceTrail from "../../components/sourceTrail";
import HoverSurface from "../../components/hoverSurface";

export async function getStaticProps({ params }) {
    const register = await postsRegister();
    const allProjectData = await getSortedProjectData();
    const filteredProjects = allProjectData.reduce((prev, curr) => {
        if (curr.id === register[params.id].project) {
            prev.push(curr);
        }
        return prev;
    }, []);
    return {
        props: {
            ...register[params.id],
            filteredProjects,
        },
    };
}

export async function getStaticPaths() {
    const paths = await getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export default function PostBody(postData) {
    const DynamicBody = dynamic(() => import(`../../posts/${postData.id}.mdx`));
    return (
        <div className="min-h-screen bg-primary ">
            <Head>
                <title>{postData.title}</title>
            </Head>
            <div className="grid grid-cols-12 gap-6 mb-auto text-xs sm:text-base">
                <div className={`col-span-0 md:col-span-2`} />
                <div className={`flex flex-col w-screen sm:w-auto col-span-12 md:col-span-8 p-2 gap-2`}>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-5 sm:col-span-4 md:col-span-3 lg:col-span-3">
                            <ActiveLogo />
                        </div>
                        <div className="col-span-7 sm:col-span-8 md:col-span-9 lg:col-span-9 my-auto">
                            <h1 className="text-accent text-2xl">{postData.title}</h1>
                            <h2 className="text-secondary">
                                <Date dateString={postData.date} />
                            </h2>
                            <h3 className="text-primary">{postData.dependancies}</h3>
                            {postData.repo ? (
                                <h3 className="text-primary">
                                    <a
                                        className="text-secondary font-bold text-lg italic hover:text-accent  hover:font-bold  hover:text-lg  hover:italic"
                                        href={postData.repo}
                                    >
                                        Code Example
                                    </a>
                                </h3>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div>
                        <article className={styles.article}>
                            <div className="article">
                                <DynamicBody />
                            </div>
                            {postData?.filteredProjects?.length > 0 ? <h2 className="mt-2">Related Project: </h2> : <></>}
                            {postData.filteredProjects.map((el) => (
                                <section className="mt-2" key={el.id}>
                                    <HoverSurface>
                                        <Link href={`/projects/${el.id}`} passHref>
                                            <a>
                                                <h2>{el.project}</h2>
                                                <div className="flex gap-2 my-auto">
                                                    <p className="text-primary font-normal">{el.description}</p>
                                                </div>
                                                <div>
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
                        </article>
                        <div className="mt-2">
                            <Comments post={postData.id} />
                        </div>
                        <div className="flex mt-2">
                            <HomeButton text="Home" />
                        </div>
                    </div>
                </div>
                <div className={`col-span-0 md:col-span-2`} />
            </div>
        </div>
    );
}
