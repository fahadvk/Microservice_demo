import express from 'express'
import cors from 'cors'
import axios from 'axios'
const app = express()
app.use(cors())
app.use(express.json())
const posts = {}
const handleEvent = (type,data) => {
    if (type === 'PostCreated') {

        const { id, title } = data
        posts[id] = { id, title, comments: [] }
    }
    if (type === 'CommentCreated') {
        const { id, content, postid } = data
        const post = posts[postid]
        post.comments.push({ id, content })

    }
    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data;
        const post = posts[postId]
        const comment = post.comments.find(comment => {
            return comment.id === id
        })
        comment.status = status
        comment.content = content

    }
}
app.get("/posts", (req, res) => {
    res.send(posts)
})
app.post('/events', (req, res) => {
    const { type, data } = req.body
    console.log(data)
    console.log(req.body)
    res.send({})
})

app.listen(4002, async () => {
    console.log("listening to port 4002")

    const res = await axios.get('http://localhost:4005/events')
    for (let event of res.data) {
        handleEvent(event.type, event.data)
    }
})