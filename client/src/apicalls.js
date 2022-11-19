import axios from 'axios'
const postapi = 'http://localhost:4000'
const commentapi = 'http://localhost:4001'
const queryapi = 'http://localhost:4002'
export const createPost = async (data) => {
    await axios.post(`${postapi}/posts`, { title: data })
}
export const fetchPosts = async () => {
    const res = await axios.get(`${queryapi}/posts`)
    return res.data
}
export const createComment = async (data, postid) => {
 await axios.post(`${commentapi}/posts/${postid}/comments`, { content: data })
}
export const fetchComments = async (postid) => {
    const res = await axios.get(`${commentapi}/posts/${postid}/comments`)
    return res.data
}  