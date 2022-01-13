import Head from "next/head";
import Image from "next/image";
import utilStyles from "../styles/utils.module.css";

const name = "Glenn Streetman";
export const siteTitle = "Glenn Streetmans Dev Blog";

export default function Header({ home }) {
    return (
        <div className="max-w-full">
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="Glenn Streetman's Dev Blog" />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <header>
                {home ? (
                    <table>
                        <thead></thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Image priority src="/images/profile.jpg" className={utilStyles.borderCircle} height={144} width={144} alt={name} />
                                </td>
                                <td>
                                    <div className="flex align-middle text-justify">
                                        <h1 className="text-primary">
                                            <b>{name}</b>: A Full Stack Web Developer, with a background in FInancial Systems Implementations, located in San
                                            Diego, CA.
                                        </h1>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <></>
                )}
            </header>
        </div>
    );
}
