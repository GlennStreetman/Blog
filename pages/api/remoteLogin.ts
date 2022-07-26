import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log("FETCHING ");
        const sessionDataRaw = await fetch(`https://${process.env.NEXT_PUBLIC_baseDomain}/api/auth/session`);
        const sessionData = await sessionDataRaw.json();
        console.log("sessiondata", sessionData);
        res.status(200).json(sessionData);
    } catch (err) {
        console.log("error checking login", err);
        res.status(200).json({ message: "failed login check" });
    }
}
