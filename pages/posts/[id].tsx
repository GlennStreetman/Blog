import { getAllPostIds } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import { postsRegister, postsComp } from "../../registers/postRegister";
import Bottom from "../../components/bottom";
import Topper from "../../components/topper";
import Image from "next/image";
import BackButton from "../../components/backButton";
import styles from "./posts.module.css";

export async function getStaticProps({ params }) {
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
            <Head>
                <title>{postData.title}</title>
            </Head>
            <Topper />
            <div className="grid grid-cols-12 gap-6 mb-auto text-xs sm:text-base">
                <div className={`col-span-0 md:col-span-2`} />
                <div className={`flex flex-col w-screen sm:w-auto col-span-12 md:col-span-8 p-2 gap-2`}>
                    <div className="flex my-auto content justify-middle">
                        <div>
                            <Image priority src="/images/profile.jpg" className="rounded-full" height={54} width={54} alt={name} />
                        </div>
                        <div>
                            <h1 className="text-accent">{postData.title}</h1>
                            <h2 className="text-secondary">
                                <Date dateString={postData.date} />
                            </h2>
                        </div>
                    </div>
                    <div>
                        <article className={styles.article}>
                            <div>{postsComp[postData.id]()}</div>
                        </article>
                        <BackButton link="/" />
                    </div>
                </div>
                <div className={`col-span-0 md:col-span-2`} />
            </div>
            <div className="grid grid-cols-12 gap-6 mb-auto text-xs sm:text-base">
                <div className={`col-span-0 md:col-span-2`} />
                <div className={`col-span-0 md:col-span-10`}>
                    <Bottom />
                </div>
                <div className={`col-span-0 md:col-span-2`} />
            </div>
        </div>
    );
}
