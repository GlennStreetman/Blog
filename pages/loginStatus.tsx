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

function loginStatus() {
    const [thisSession, setThisSession] = useState<sessionInt>({});

    useEffect(() => {
        async function getSessionObject() {
            const authURL = `http://localhost:3000/api/auth/session`;
            console.log("login api", authURL);
            const sessionDataRaw = await fetch(authURL);
            const sessionData = await sessionDataRaw.json();
            // const sessionDataRaw = await fetch("/api/remoteLogin");
            // const sessionData = await sessionDataRaw.json();
            setThisSession(sessionData);
        }
        getSessionObject();
    }, []);

    return <div>{thisSession?.user ? mapUser(thisSession.user) : "No user"}</div>;
}

export default loginStatus;
