import { getAllPostIds } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import { postsRegister, postsComp } from "../../registers/postRegister";
import Topper from "../../components/topper";
import BackButton from "../../components/backButton";
import styles from "./posts.module.css";
import Comments from "../../components/comment";
import ActiveLogo from "../../components/activeLogo";
import { getSortedProjectData } from "../../lib/projects";
import SourceTrail from "../../components/sourceTrail";
import Link from "next/link";

export async function getStaticProps({ params }) {
    const allProjectData = getSortedProjectData();
    const filteredProjects = allProjectData.reduce((prev, curr) => {
        console.log("filtering", curr.id, postsRegister[params.id].project);
        if (curr.id === postsRegister[params.id].project) {
            console.log("match");
            prev.push(curr);
        }
        return prev;
    }, []);
    return {
        props: {
            ...postsRegister[params.id],
            filteredProjects,
        },
    };
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export default function PostBody(postData) {
    return (
        <div className="min-h-screen bg-primary ">
            <Head>
                <title>{postData.title}</title>
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
                            <div>{postsComp[postData.id]()}</div>

                            {postData?.filteredProjects?.length > 0 ? <h2>Related Project: </h2> : <></>}
                            {postData.filteredProjects.map((el) => (
                                <section key={el.id}>
                                    <Link href={`/projects/${el.id}`} passHref>
                                        <div className="shadow rounded-md border-2 p-2 mt-2 outline-4 hover:bg-weak">
                                            <div className="text-secondary font-heading">{el.project}</div>
                                            <div className="flex gap-2 my-auto">
                                                <small className="text-primary">
                                                    <Date dateString={el.description} />
                                                </small>
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
                                        </div>
                                    </Link>
                                </section>
                            ))}
                        </article>
                        <Comments post={postData.id} />
                        <BackButton />
                    </div>
                </div>
                <div className={`col-span-0 md:col-span-2`} />
            </div>
        </div>
    );
}
