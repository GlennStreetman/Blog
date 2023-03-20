import "../styles/global.css";
import "../styles/codeBlockFormat.css";
import { useState, useEffect, createContext, useContext } from "react";
import Topper from "../components/topper";
import Bottom from "../components/bottom";
import UserPrefs from "../components/userPrefs";
import ScreenWidth from "../components/ScreenWidth";
import { useRouter } from 'next/router'

export const LoginInfo = createContext(null)

export function useLoginInfoContext() {
    return useContext(LoginInfo)
}

export default function App({ Component, pageProps: { session, ...pageProps } }) {
    const router = useRouter()

    const [token, setToken] = useState<string | undefined>()
    const [id, setID] = useState<string | undefined>()

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

    interface jwt {
        access_token: string;
        expires_in: string;
        id_token: string;
        token_type: string;
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {

            setToken(localStorage.getItem("access_token"))
            setID(localStorage.getItem("id_token"))


            const asPath = router?.asPath.replaceAll('/#', '')
            // @ts-ignore
            const tokens: jwt = asPath?.split("&")?.reduce((acc, el) => {
                const [key, val] = el.split("=")
                acc[key] = val
                return acc
            }, {})

            if (tokens?.access_token) {
                console.log('setting tokens', tokens.access_token)
                localStorage.setItem("access_token", tokens.access_token);
                setToken(tokens.access_token)
                localStorage.setItem("id_token", tokens.id_token);
                setID(tokens.id_token)
                router.push("/")
            }


        }
    }, [])

    return (
        <>
            <LoginInfo.Provider value={{ id: id, token: token }} >
                <UserPrefs />
                <Topper />
                <div className="font-body pt-7">
                    <ScreenWidth>

                        <Component {...pageProps}> </Component>

                    </ScreenWidth>
                </div>
                <div className="h-4" />
                <Bottom />
            </LoginInfo.Provider>
        </>
    );
}
