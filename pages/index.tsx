import Left_Column from "../components/left_Column";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
}

export default function Home({ allPostsData }) {
    return (
        <>
            <div className=" h-16" />
            <div className="grid grid-cols-12 gap-12">
                <div className="col-span-0 md:col-span-1" /> {/* gutter */}
                <div className=" col-span-12 md:col-span-5">
                    <Left_Column />
                </div>
                <div className="col-span-11 md:col-span-5">
                    {" "}
                    {/* Right */}
                    <section className={utilStyles.headingMd}></section>
                    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                        <h2>Blog</h2>
                        <ul className={utilStyles.list}>
                            {allPostsData.map(({ id, date, title }) => (
                                <li className={utilStyles.listItem} key={id}>
                                    <Link href={`/posts/${id}`}>
                                        <a>{title}</a>
                                    </Link>
                                    <br />
                                    <small className={utilStyles.lightText}>
                                        s
                                        <Date dateString={date} />
                                    </small>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
                <div className="col-span-0 md:col-span-1 "></div> {/* gutter */}
            </div>
        </>
    );
}
