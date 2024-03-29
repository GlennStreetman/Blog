import Left_Column from "../components/left_Column";
import Right_Column from "../components/right_Column";
import { getSortedPostsData } from "../lib/posts";
import { getSortedProjectData } from "../lib/projects";
import { buildStingers } from '../lib/buildProjects';
import { useRouter } from 'next/router';
import { useEffect } from 'react'
import { parseQueryString } from "../hooks/useCheckRedirect";

export async function getStaticProps() {

    const allPostsData = await getSortedPostsData();
    const allProjectData = await getSortedProjectData();
    const allStingers = await buildStingers()
    return {
        props: {
            allPostsData,
            allProjectData,
            allStingers,
        },
    };
}

export default function Home({ allPostsData, allProjectData, allStingers }) {

    const router = useRouter()

    useEffect(() => {
        //handle Cloudfront error redirect.
        const [path, queryString] = router.asPath.split('?')
        const queryStringObj = parseQueryString(queryString)
        if (path !== '/') {
            if (queryStringObj?.['r'] !== 'true') {
                router.push(`${path}?r=true`)
            } else {
                router.push('/')
            }
        }
    }, [])

    return (
        <>
            <div className="grid grid-cols-12 gap-6 mb-auto text-xs sm:text-base">
                <div className={`col-span-0 lg:col-span-1`}></div>

                <div className="w-screen sm:w-auto col-span-12 lg:col-span-5 p-2">
                    <Left_Column allProjectData={allProjectData} allStingers={allStingers} />
                </div>
                <div className="w-screen sm:w-auto col-span-12 lg:col-span-5 p-2">
                    <Right_Column allPostsData={allPostsData} />
                </div>
                <div className={`col-span-0 lg:col-span-1`}></div>
            </div>
        </>
    );
}
