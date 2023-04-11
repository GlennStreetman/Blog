import { useState } from "react";
import { useLoginInfoContext } from '../pages/_app'

interface props {
    post: string;
    cancel: Function;
    fetchData: Function;
}

function ReplyBox(p: props) {

    // const { data: session, status } = useSession();
    const [comment, setComment] = useState("");

    const loginInfo = useLoginInfoContext()

    const updateComment = (e) => {
        e.preventDefault;
        setComment(e.target.value);
    };

    const postComment = async (e, setComment: Function, getFreshData: Function) => {
        e.preventDefault;

        const data = {
            comment: comment,
            post: p.post,
            user: loginInfo.userName
        };
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/auth/makepost`, {

                method: "POST", // or 'PUT'
                mode: "cors", // no-cors, *cors, same-origin
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('id_token')
                },
                referrerPolicy: "no-referrer",
                body: JSON.stringify(data),
            })
            await response.json();
            setComment('')
            console.log('fetch comments')
            getFreshData()
        } catch (err) { console.log('problem posting comment: ', err, `${process.env.NEXT_PUBLIC_BASEURL}/auth/makepost`) }
    };

    return (
        <div className="max-w-lg shadow-md">
            <form action="" className="w-full p-4">
                <div className="mb-2">
                    <label className=" text-accent font-bold text-xl py-5 text-lg">Add a comment</label>
                    <textarea
                        value={comment}
                        className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                        name="comment"
                        // placeholder=""
                        onChange={(e) => {
                            updateComment(e);
                        }}
                    ></textarea>
                </div>
                <div className="flex gap-2">
                    <button
                        className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded"
                        onClick={(e) => {
                            e.preventDefault();
                            postComment(e, setComment, p.fetchData);
                            p.cancel(false);
                        }}
                    >
                        save
                    </button>
                    <button
                        className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded"
                        onClick={(e) => {
                            e.preventDefault();
                            p.cancel(false);
                        }}
                    >
                        cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ReplyBox;
