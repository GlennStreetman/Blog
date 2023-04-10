import React from "react";
import { comment } from "./comment";

interface props {
    comments: comment[];
}

function showComments(p: props) {
    const mapComments = p.comments.map((el) => {
        if (el !== undefined) {
            return (
                <div key={`key-${el?.postdate?.S}`} className="flex flex-col p-2">
                    <div className="flex">
                        <div className="text-accent border-x-2 border-t-2 rounded-sm shrink px-2 pt-1">{el?.user?.S}</div>
                        <div className="grow"></div>
                    </div>
                    <div
                        style={{ whiteSpace: "pre-wrap" }}
                        className="text-primary border-2 p-2 rounded-b-md rounded-r-md">{`${el?.message?.S}`}</div>
                </div>
            );
        }
    });

    return (
        <>
            {Object.keys(p.comments).length > 0 ? <div className="text-secondary font-bold text-lg">Comments: </div> : <></>}
            <div>{mapComments}</div>
        </>
    );
}

export default showComments;
