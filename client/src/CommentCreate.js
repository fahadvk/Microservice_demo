import React, { useRef } from 'react';
import { createComment } from './apicalls';

function CommentCreate({ postid }) {
    const commentref = useRef('')
    const submitHandler = async (e) => {
        e.preventDefault()
        await createComment(commentref.current.value, postid)
        commentref.current.value = ''
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className=' form-group'>
                    <label>New Comment</label>
                    <input ref={commentref} className='form-control' />
                    <button className='btn btn-primary' type='submit'>send</button>
                </div>
            </form>
        </div>
    );
}

export default CommentCreate;