import React, { useState, useEffect } from 'react';
import { fetchPosts } from './apicalls'
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';


function PostList(props) {
    const [post, setPosts] = useState({})
    const fetch = async () => {
        const res = await fetchPosts()
        setPosts(res)
    }
    useEffect(() => {
        fetch()

    }, [])
    const renderedPosts = Object.values(post).map(post => {
        return (
            <div className='card' style={{ width: '30%', marginBottom: '20px' }} key={post.id}>
                <div className='card-body'>
                    <h3>{post.title}</h3>
                    <CommentCreate postid={post.id} />
                    <CommentList  comments={post.comments}/>
                </div>
            </div>

        )
    })
    console.log(post) 
    return (
        <div className='d-flex flex-row flext-wrap justify-content-between'>
            {renderedPosts}
        </div>
    );
}

export default PostList; 