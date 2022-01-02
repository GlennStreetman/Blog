import Left_Column from "../components/left_Column";
import Right_Column from "../components/right_Column";
import { getSortedPostsData } from "../lib/posts";
import Bottom from "../components/bottom";
import Gutter from "../components/gutter";
import { useState, useEffect } from "react";
import Topper from "../components/topper";

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
}

export default function Home({ allPostsData }) {
    const [darkMode, setDarkMode] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        setDarkMode(document.documentElement.classList.contains("dark"));
    }, []);

    useEffect(() => {
        if (darkMode) {
            window.document.documentElement.classList.add("dark");
            localStorage.setItem("siteDarkMode", "true");
        } else {
            window.document.documentElement.classList.remove("dark");
            localStorage.setItem("siteDarkMode", "false");
        }
    }, [darkMode]);

    return (
        <div className="min-h-screen bg-white dark:bg-slate-700 ">
            <Topper darkMode={darkMode} setDarkMode={setDarkMode} />
            <div className="grid grid-cols-12 gap-6 mb-auto text-xs sm:text-base">
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
