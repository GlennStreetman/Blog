import Header from "../../components/Header";
import { getAllPostIds } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { postsRegister, postsComp } from "../../registers/postRegister";
import Bottom from "../../components/bottom";
import Gutter from "../../components/gutter";
import Topper from "../../components/topper";
import Link from "next/link";
import Image from "next/image";
import BackButton from "../../components/backButton";

export async function getStaticProps({ params }) {
    // const postData = await getPostData(params.id)
    return {
        props: {
            ...postsRegister[params.id],
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
    const name = "Glenn Streetman";

    return (
        <div className="min-h-screen bg-primary ">
            <Topper />
            <div className="grid grid-cols-12 gap-6 mb-auto text-xs sm:text-base">
                <Gutter />
                <Gutter />
                <div className={`flex flex-col w-screen sm:w-auto col-span-12 md:col-span-8 p-2 gap-2`}>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <Link href="/">
                                            <a>
                                                <Image
                                                    priority
                                                    src="/images/profile.jpg"
                                                    className={utilStyles.borderCircle}
                                                    height={54}
                                                    width={54}
                                                    alt={name}
                                                />
                                            </a>
                                        </Link>
                                    </td>
                                    <td>
                                        <Head>
                                            <title>{postData.title}</title>
                                        </Head>
                                        <h1>{postData.title}</h1>
                                        <div>
                                            <Date dateString={postData.date} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <article>
                            <div>{postsComp[postData.id]()}</div>
                        </article>
                        <BackButton link="/" />
                        <Bottom />
                    </div>
                </div>
                <Gutter />
                <Gutter />
            </div>
        </div>
    );
}
