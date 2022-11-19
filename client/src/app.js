import React from 'react'
import PostCreate from './PostCreate'
import PostList from './postList'
export const App = () => {
    return <div className='container'>
        <h1> Create Post</h1>
        <PostCreate></PostCreate>
        <hr/>
        <h1>Posts</h1>
        <PostList/>
    </div>
}