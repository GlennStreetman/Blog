import "../styles/global.css";
import { useEffect } from "react";

import UserPrefs from "../components/userPrefs";

export default function App({ Component, pageProps }) {
    useEffect(() => {
        if (localStorage.siteDarkMode === "true" || (!("siteDarkMode" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.add("userDark");
            document.documentElement.classList.remove("light");
            document.documentElement.classList.remove("userLight");
        } else {
            document.documentElement.classList.add("light");
            document.documentElement.classList.add("userLight");
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.remove("userDark");
        }
    }, []);

    return (
        <>
            <UserPrefs /> <Component {...pageProps}> </Component>
        </>
    );
}
