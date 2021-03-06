import { useState, useEffect } from "react";

interface user {
    email?: string;
    image?: string;
    name?: string;
}

interface sessionInt {
    expires?: string;
    user?: user;
}

function mapUser(user) {
    const userMap = Object.entries(user).map(([key, val]) => {
        return <div key={key + "key"}>{`${key}: ${val}`}</div>;
    });
    return userMap;
}

function LoginStatus() {
    const [thisSession, setThisSession] = useState<sessionInt>({});

    useEffect(() => {
        async function getSessionObject() {
            try {
                const authURL = `https://${process.env.NEXT_PUBLIC_baseDomain}/api/auth/session`; //redirect using next.config to auth server
                console.log("login api", authURL);
                const sessionDataRaw = await fetch(authURL, { mode: "cors", credentials: "include" });
                const sessionData = await sessionDataRaw.json();
                setThisSession(sessionData);
            } catch (error) {
                console.log("Error connecting to login server", error);
            }
        }
        getSessionObject();
    }, []);

    return <div>{thisSession?.user ? mapUser(thisSession.user) : "No user"}</div>;
}

export default LoginStatus;
