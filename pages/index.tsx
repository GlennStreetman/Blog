import Left_Column from "../components/left_Column";
import Right_Column from "../components/right_Column";
import { getSortedPostsData } from "../lib/posts";
import { getSortedProjectData } from "../lib/projects";
import Bottom from "../components/bottom";
import Gutter from "../components/gutter";
import Topper from "../components/topper";
import UserPrefs from "../components/userPrefs";

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    const allProjectData = getSortedProjectData();
    return {
        props: {
            allPostsData,
            allProjectData,
        },
    };
}

export default function Home({ allPostsData, allProjectData }) {
    console.log("allProjectData", allProjectData);
    return (
        <div className="min-h-screen bg-primary">
            <UserPrefs />
            <Topper />
            <div className="grid grid-cols-12 gap-6 mb-auto text-xs sm:text-base">
                <Gutter />
                <div className="w-screen sm:w-auto col-span-12 md:col-span-5 p-2">
                    <Left_Column allProjectData={allProjectData} />
                </div>
                <div className="w-screen sm:w-auto col-span-12 md:col-span-5 p-2">
                    <Right_Column allPostsData={allPostsData} />
                </div>
                <Gutter />
                <Gutter />
                <div className="w-screen sm:w-auto col-span-12 md:col-span-5 p-2">
                    <Bottom />
                </div>
                <Gutter />
            </div>
        </div>
    );
}
