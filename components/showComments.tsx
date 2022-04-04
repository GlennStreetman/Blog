import React from "react";
import { comments } from "./comment";

interface props {
    comments: comments;
}

function showComments(p: props) {
    const mapComments = Object.entries(p.comments).map(([key, el]) => (
        <div key={key} className="flex flex-col p-2">
            <div className="flex">
                <div className="text-accent border-x-2 border-t-2 rounded-sm shrink px-2 pt-1">{el.userid}</div>
                <div className="grow"></div>
            </div>
            <div style={{ whiteSpace: "pre-wrap" }} className="text-primary border-2 p-2 rounded">{`${el.message}`}</div>
        </div>
    ));

    return (
        <>
            <div className="text-secondary font-bold text-lg">Comments: </div>
            <div>{mapComments}</div>;
        </>
    );
}

export default showComments;
