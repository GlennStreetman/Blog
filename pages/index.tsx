import Left_Column from "../components/left_Column";
import Right_Column from "../components/right_Column";
import { getSortedPostsData } from "../lib/posts";
import { getSortedProjectData } from "../lib/projects";
import Gutter from "../components/gutter";
import {buildStingers} from '../lib/buildProjects'

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
    return (
        <>
            <div className="grid grid-cols-12 gap-6 mb-auto text-xs sm:text-base">
                <Gutter />

                <div className="w-screen sm:w-auto col-span-12 md:col-span-5 p-2">
                    <Left_Column allProjectData={allProjectData} allStingers={allStingers} />
                </div>
                <div className="w-screen sm:w-auto col-span-12 md:col-span-5 p-2">
                    <Right_Column allPostsData={allPostsData} />
                </div>
                <Gutter />
            </div>
        </>
    );
}
