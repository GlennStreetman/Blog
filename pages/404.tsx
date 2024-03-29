import Left_Column from "../components/left_Column";
import Right_Column from "../components/right_Column";
import { getSortedPostsData } from "../lib/posts";
import { getSortedProjectData } from "../lib/projects";
import { buildStingers } from '../lib/buildProjects';
import { useRouter } from 'next/router';
import { useEffect } from 'react'

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

function parseQueryString(qs) {
    //transform query string params into key/value obj.
    console.log('generating query string')
    if (qs) {
        console.log('qs', qs)
        const qsTrim = qs.replace('/?', '')
        const qsObj = qsTrim.split('&').reduce((prev, curr) => {
            if (curr.includes(('='))) {
                const currKeyPair = curr.split('=')
                prev[currKeyPair[0]] = currKeyPair[1]
            }
            return prev
        }, {})
        return qsObj
    } else { return false }
}

//if pathname !== '/' AND query string obj[r]=true not present, redirect WITH querystring ?r=true
// redirect to pathname /w ?r=true appended
// all pages should strip query string r=true on successfull load except index.html
// else
//load page 
//if q=true present, strip query string.

export default function Home({ allPostsData, allProjectData, allStingers }) {

    const router = useRouter()
    console.log('queryString:', router.asPath)

    useEffect(() => {
        //if query string r present
        const [path, queryString] = router.asPath.split('?')
        const queryStringObj = parseQueryString(queryString)
        console.log('path', path, "query string", queryStringObj)
        if (path !== '/') {
            console.log('r: ', queryStringObj?.['r'])
            if (queryStringObj?.['r'] !== 'true') {
                console.log('redirecting: ', `${path}?r=true`)
                router.push(`${path}?r=true`)
            } else {
                console.log('error on redirect, returning to /')
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
