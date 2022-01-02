import Left_Column from "../components/left_Column";
import Right_Column from "../components/right_Column";
import { getSortedPostsData } from "../lib/posts";
import Bottom from "../components/bottom";
import Gutter from "../components/gutter";

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
        <div>
            <div className="h-10" />
            <div className="grid grid-cols-12 gap-12 mb-auto text-xs sm:text-base">
                <Gutter />
                <div className="w-screen sm:w-auto col-span-12 md:col-span-5 p-2">
                    <Left_Column />
                </div>
                <div className="w-screen sm:w-auto col-span-12 md:col-span-5 p-2">
                    <Right_Column allPostsData={allPostsData} />
                </div>
                <Gutter />
                <Bottom />
            </div>
        </div>
    );
}
