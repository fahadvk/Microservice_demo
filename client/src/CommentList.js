import React, { useState, useEffect } from 'react';
import { fetchComments } from './apicalls';

function CommentList({ comments }) {
    // const [comments, setComments] = useState([])
    // const fetch = async () => {
    //     const response = await fetchComments(postid)
    //     console.log(response)
    //     setComments(response)
    // }
    // useEffect(() => {
    //     fetch()

    // }, [])
    const renderedComments = comments.map(comment => {
        let content;
        if(comment.status === 'approved')
        {
            content = comment.content
        }
        if(comment.status === 'pending')
        {
            content = 'This Comment is awaiting moderation'
        }
        if(comment.status === 'rejected')
        {
            content ='This comment has been rejected'
        }
        return <li key={comment.id}>{content}</li>
    })
    return (
        <ul>

            {renderedComments}
        </ul>

    );
}

export default CommentList;