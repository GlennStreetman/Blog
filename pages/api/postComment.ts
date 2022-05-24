import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Client from "pg";
import format from "pg-format";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // dotenv.config();
    const session = await getSession({ req });
    const comment = format(req.body.comment);
    const post = format(req.body.post);

    let db = new Client.Client({
        sslmode: "disable",
        user: process.env.pguser,
        host: process.env.pghost,
        database: process.env.pgdatabase,
        password: process.env.pgpassword,
        port: process.env.pgporInternal,
    });

    try {
        const postCommentQuery = `
        INSERT INTO userposts (userid, post, usermessage)
        VALUES ('${session.user.email}', '${post}', '${comment}')`;

        console.log("postCommentQuery", postCommentQuery);
        await db.connect();
        await db.query(postCommentQuery, (err, rows) => {
            if (err) {
                console.log("problem with INSERT", err);
            } else {
                console.log("comment posted");
            }
        });
        res.status(200).json("post complete");
    } catch (err) {
        console.log("Problem posting message", err);
        res.status(200).json({ message: "failed to post comment" });
    }
}
