import Header from "../../components/Header";
import { getAllPostIds } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { postsRegister, postsComp } from "../../registers/postRegister";

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
    console.log("postData", postData);
    return (
        <>
            {/* @ts-ignore */}
            <Header />
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div>{postsComp[postData.id]()}</div>
            </article>
        </>
    );
}
