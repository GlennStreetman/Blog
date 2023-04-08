import { useState, useEffect } from "react";
import ButtonStandard from "./buttonStandard";
import ReplyBox from "./replyBox";
import ShowComments from "./showComments";
import { useLoginInfoContext } from '../pages/_app'

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


function Comment(p: userPost) {

    const loginInfo = useLoginInfoContext()

    const [openComment, setOpenComment] = useState<boolean>(false);
    const [comments, setComments] = useState<comments>({});

    useEffect(() => {
        //get all comments related to this post.

        const fetchData = async () => {

            const post = { postId: p.post }
            console.log('get post data: ', post, JSON.stringify(post))

            const response = await fetch(`/api/getPosts`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(post), // body data type must match "Content-Type" header
            });

            console.log('response', response)
            if (response.status === 200) {
                const commentData = await response.json();
                setComments(commentData.posts);
            } else {
                console.log("Problem retrieving posts");
            }
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
