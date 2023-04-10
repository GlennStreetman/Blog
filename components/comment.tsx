import { useState, useEffect } from "react";
import ButtonStandard from "./buttonStandard";
import ReplyBox from "./replyBox";
import ShowComments from "./showComments";
import { useLoginInfoContext } from '../pages/_app'

export interface dynamoString {
    S: string
}

export interface comment {
    user: dynamoString;
    message: dynamoString;
    postid: dynamoString;
    postdate: dynamoString;
}

interface userPost {
    post: string;
}


function Comment(p: userPost) {

    const loginInfo = useLoginInfoContext()

    const [openComment, setOpenComment] = useState<boolean>(false);
    const [comments, setComments] = useState<comment[]>([]);

    useEffect(() => {
        //get all comments related to this post.

        const fetchData = async () => {

            try {
                const post = { postId: p.post }
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/getposts`, { //
                    method: "POST", // *GET, POST, PUT, DELETE, etc.
                    mode: "cors", // no-cors, *cors, same-origin
                    headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify(post), // body data type must match "Content-Type" header
                });
                const commentData = await response.json();
                console.log('commentData', commentData)
                setComments(commentData);
            } catch (err) { console.log(err) }

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
            {loginInfo.login === true ?
                <div className="text-accent my-2">Post Reply</div> : <></>
            }
        </ButtonStandard>
    );

    const loginLink = (
        <div className="text-accent my-2">
            <a className="text-accent" href={process.env.loginurl}>
                Login to Post Comment
                {/* <BiLogInCircle className="h-7 w-7 text-primary hover:text-accent" /> */}
            </a>
        </div>
    );

    return (
        <>
            <div>{Object.keys(comments).length > 0 ? <ShowComments comments={comments} /> : <></>}</div>
            <div>{loginInfo.login === true ? replyButton : loginLink}</div>
        </>
    );
}

export default Comment;
