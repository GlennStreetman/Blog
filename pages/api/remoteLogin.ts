import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("internal login api reached");
    try {
        const authURL = `${process.env.NEXTAUTH_URL}/api/auth/session`;
        console.log("login api", authURL);
        const sessionDataRaw = await fetch(authURL);
        const sessionData = await sessionDataRaw.json();
        console.log("sessiondata", sessionData);
        res.status(200).json(sessionData);
    } catch (err) {
        console.log("error checking login", err);
        res.status(200).json({ message: "failed login check" });
    }
}
