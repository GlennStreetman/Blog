import Head from "next/head";
import ActiveLogo from "./activeLogo";
import Link from "next/link";

const name = "Glenn Streetman";
export const siteTitle = "Glenn Streetmans Dev Blog";

export default function Header({ home }) {
    return (
        <div className="max-w-full p-2">
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
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6 sm:col-span-5 md:col-span-4 lg:col-span-4 xl:col-span-5">
                        <ActiveLogo />
                    </div>
                    <div className="col-span-6 sm:col-span-7 md:col-span-8 lg:col-span-8 xl:col-span-7 my-auto">
                        <div className="flex flex-col align-middle  tracking-wide gap-1">
                            <h1 className="text-primary">
                                <b>{name}:</b> Full Stack Web Developer with a background in Financial Systems Implementations
                            </h1>
                            <h1 className="text-primary">
                                <b>Location:</b> San Diego, California
                            </h1>
                            <h1 className="text-primary">
                                <b>Reading: </b>
                                <a
                                    className="text-xs sm:text-base text-primary hover:text-accent"
                                    href="https://github.com/opsdisk/the_cyber_plumbers_handbook"
                                >
                                    Cyber Plumbers Handbook
                                </a>
                            </h1>
                            <h1 className="text-primary">
                                <b>Building: </b>
                                <a className="text-xs sm:text-base text-primary hover:text-accent" href="autohaus.gstreet.dev">
                                    AutoHaus
                                </a>
                            </h1>
                            <h1 className="text-primary">
                                <b>Status:</b> Looking for Group
                            </h1>
                            <h1 className="text-primary">
                                <b>Contact:</b>{" "}
                                <a className="text-xs sm:text-base text-primary hover:text-accent" href="mailto:glenn@gstreet.dev">
                                    glenn@gstreet.dev
                                </a>
                            </h1>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}
