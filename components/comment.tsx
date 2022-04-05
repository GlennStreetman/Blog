import { useState, useEffect } from "react";
import ButtonStandard from "./buttonStandard";
import ReplyBox from "./replyBox";
import ShowComments from "./showComments";

interface comment {
    userid: string;
    message: string;
}

export interface comments {
    [key: string]: comment;
}

interface userPost {
    post: string;
}

function comment(p: userPost) {
    const [openComment, setOpenComment] = useState(false);
    const [comments, setComments] = useState<comments>({});

    useEffect(() => {
        //get all comments related to this post.
        const fetchData = async () => {
            const data = await fetch(`/api/getPosts?post=${p.post}`);
            const commentData = await data.json();
            setComments(commentData);
        };

        fetchData();
    }, []);

    const replyButton = openComment ? (
        <ReplyBox post={p.post} />
    ) : (
        <ButtonStandard
            onClick={() => {
                setOpenComment(!openComment);
            }}
        >
            Post Reply
        </ButtonStandard>
    );

    return (
        <>
            <div>
                <ShowComments comments={comments} />{" "}
            </div>
            <div>{replyButton}</div>
        </>
    );
}

export default comment;
