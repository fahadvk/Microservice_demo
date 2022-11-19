import React, { useRef } from 'react';
import axios from 'axios'
import {createPost} from './apicalls'

function PostCreate(props) {
    const title = useRef('')
    const submitHandler = async (e) => {
        e.preventDefault()
        const data = title.current.value
       await  createPost(data)
       
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className='form-group'>
                    <label>Title</label>
                    <input ref={title} className='form-control col-md-4' />
                </div>
                <button type='submit' className='btn btn-primary'>submit</button>
            </form>
        </div>
    );
}

export default PostCreate;