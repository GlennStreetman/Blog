import type { NextApiRequest, NextApiResponse } from "next";
import Client from "pg";
import format from "pg-format";

let db = new Client.Client({
    sslmode: "disable",
    user: process.env.pguser,
    host: process.env.pghost,
    database: process.env.pgdatabase,
    password: process.env.pgpassword,
    port: process.env.pgporInternal,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const post = format(req.query.post);

    try {
        const postCommentQuery = `
        SELECT id, userid, usermessage 
        FROM userposts
        WHERE post = '${post}'
        ORDER BY id
        `;

        await db.connect();
        await db.query(postCommentQuery, (err, rows) => {
            if (err) {
                console.log("problem getting comments for post", err);
                res.status(200).json({});
            } else {
                const posts = {};
                for (const row in rows.rows) {
                    const post = rows.rows[row];
                    const userID = post["userid"].slice(0, post["userid"].search("@")) ? post["userid"].slice(0, post["userid"].search("@")) : post["userid"];
                    posts[post["id"]] = {
                        userid: userID,
                        message: post["usermessage"],
                    };
                }
                console.log("--posts--", posts);
                res.status(200).json(posts);
            }
        });
        // res.status(200).json("post complete");
    } catch (err) {
        console.log("Problem posting message", err);
        res.status(200).json({ message: "failed to retrieve comments" });
    }
}
