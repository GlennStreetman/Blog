import Head from "next/head";
import LogoPicker from "./LogoPicker";

const name = "Glenn Streetman";
export const siteTitle = "Glenn Streetmans Dev Blog";

export default function Header({ home }) {

    const h1Styling = 'text-primary text-sm lg:text-base'
    const h1Bold = 'font-semibold tracking-wider'

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
                    <div className="flex place-content-center col-span-12 sm:col-span-5 md:col-span-4 lg:col-span-12 xl:col-span-12 2xl:col-span-5">
                        <div className='place-content-center h-[150px] sm:h-[200px] md:h-full lg:h-[200px] xl:h-250 2xl:w-full w-[150px] sm:w-[200px] md:w-full lg:w-[200px] xl:w-250 2xl:h-full' >
                            <LogoPicker />
                        </div>
                    </div>
                    <div className="col-span-12 sm:col-span-7 md:col-span-8 lg:col-span-12 xl:col-span-12 2xl:col-span-7 my-auto">
                        <div className="flex flex-col align-middle  tracking-wide gap-1">
                            <h1 className={h1Styling}>
                                <b className={h1Bold}>{name}:</b> Full Stack Web Developer with a background in Financial Systems Implementations
                            </h1>
                            <h1 className={h1Styling}>
                                <b className={h1Bold}>Location:</b> San Diego, California
                            </h1>
                            <h1 className={h1Styling}>
                                <b className={h1Bold}>Reading: </b>
                                <a
                                    className="text-xs sm:text-base text-primary hover:text-accent"
                                    href="https://github.com/opsdisk/the_cyber_plumbers_handbook"
                                >
                                    Cyber Plumbers Handbook
                                </a>
                            </h1>
                            <h1 className={h1Styling}>
                                <b className={h1Bold}>Working On: </b>
                                <a className="text-xs sm:text-base text-primary hover:text-accent" href="https://clearviction.org">
                                    Clearviction Scrum Team
                                </a>
                            </h1>
                            <h1 className={h1Styling}>
                                <b className={h1Bold}>Status:</b> Looking for Work
                            </h1>
                            <h1 className={h1Styling}>
                                <b className={h1Bold}> Contact:</b>{" "}
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
