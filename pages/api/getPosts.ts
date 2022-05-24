import type { NextApiRequest, NextApiResponse } from "next";
import Client from "pg";
import format from "pg-format";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let db = new Client.Client({
        sslmode: "disable",
        user: process.env.pguser,
        host: process.env.pghost,
        database: process.env.pgdatabase,
        password: process.env.pgpassword,
        port: process.env.pgporInternal,
    });
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
                db.end();
                res.status(500).json({ message: "problem getting comments" });
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
                db.end();
                res.status(200).json({ message: "success", posts });
            }
        });
    } catch (err) {
        db.end();
        console.log("Problem getting message", err);
        res.status(500).json({ message: "failed to retrieve comments" });
    }
}
