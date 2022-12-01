import "../styles/global.css";
import "../styles/codeBlockFormat.css";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import Topper from "../components/topper";
import Bottom from "../components/bottom";
import UserPrefs from "../components/userPrefs";
import ScreenWidth from "../components/ScreenWidth";


export default function App({ Component, pageProps: { session, ...pageProps } }) {
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
            <SessionProvider session={session} basePath="/login/api/auth">
                <UserPrefs />
                <Topper />
                <div className="font-body pt-7">
                    <ScreenWidth>
                        <Component {...pageProps}> </Component>
                    </ScreenWidth>
                </div>
                <div className="h-4" />
            </SessionProvider>
            <Bottom />
        </>
    );
}
