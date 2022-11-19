import express from 'express'
import cors from 'cors'
import axios from 'axios'
const app = express()
import crypto, { randomBytes } from 'crypto'
app.use(express.json())
app.use(cors())
const commentsbypostid = {}
app.get("/posts/:id/comments", (req, res) => {
    console.log(commentsbypostid)
    res.send(commentsbypostid[req.params.id] || [])
})
app.post("/posts/:id/comments", (req, res) => {
    const commentid = randomBytes(4).toString('hex')
    const { content } = req.body
    const comments = commentsbypostid[req.params.id] || []
    comments.push({ id: commentid, content, status: 'pending' })
    commentsbypostid[req.params.id] = comments
    axios.post("http://localhost:4005/events", {
        type: "CommentCreated",
        data: {
            id: commentid,
            content,
            status: 'pending',
            postid: req.params.id
        }
    })
    res.status(201).send(comments)
})
app.post("/events", async (req, res) => {
    console.log("event recieved", req.body);
    const { type, data } = req.body
    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data
        const comments = commentsbypostid[postId]
        const comment = comments.find(comment => {
            return comment.id === id
        })
        comment.status = status
        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                postId,
                content
            }

        })
    }
    res.send({})
})
app.listen(4001, () => {
    console.log('listening into 4001')
})
