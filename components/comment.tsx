import { useState, useEffect } from "react";
import ButtonStandard from "./buttonStandard";
import ReplyBox from "./replyBox";
import ShowComments from "./showComments";
import { useSession } from "next-auth/react";
import { BiLogInCircle } from "react-icons/bi";

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
    const { data: session, status } = useSession();
    const [openComment, setOpenComment] = useState<boolean>(false);
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
        <ReplyBox post={p.post} cancel={setOpenComment} />
    ) : (
        <ButtonStandard
            onClick={() => {
                setOpenComment(!openComment);
            }}
        >
            {/* {status === "authenticated" ? ( */}
            <div className="text-accent my-2">Post Reply</div>

            {/* )} */}
        </ButtonStandard>
    );

    const loginLink = (
        <div className="text-accent my-2">
            <a className="text-accent" href={process.env.NEXTAUTH_REDIRECT}>
                Login to Post Comment
                {/* <BiLogInCircle className="h-7 w-7 text-primary hover:text-accent" /> */}
            </a>
        </div>
    );

    console.log("status", status);

    return (
        <>
            <div>
                <ShowComments comments={comments} />{" "}
            </div>
            <div>{status === "authenticated" ? replyButton : loginLink}</div>
        </>
    );
}

export default comment;
