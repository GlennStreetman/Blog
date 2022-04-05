import Head from "next/head";
import ActiveLogo from "./activeLogo";

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
                    <div className="col-span-3 sm:col-span-2 md:col-span-5">
                        {/* <div className="h-full aspect-w-3 aspect-h-3 sm:aspect-w-3 sm:aspect-h-4 md:aspect-w-3 md:aspect-h-3 lg:aspect-h-2 lg:aspect-w-3"> */}
                        <ActiveLogo />
                        {/* <img className="object-cover shadow-lg rounded-lg" src="/images/profile.jpg" alt={name} /> */}
                        {/* </div> */}
                    </div>

                    <div className="col-span-9 sm:col-span-10 md:col-span-7 my-auto">
                        <div className="flex align-middle ">
                            <h1 className="text-primary">
                                <b>{name}</b>: Full Stack Web Developer with a background in Financial Systems Implementations, San Diego, CA
                            </h1>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

{
    /* <Image priority src="/images/profile.jpg" className="rounded-full" height={144} width={144} alt={name} /> */
}
