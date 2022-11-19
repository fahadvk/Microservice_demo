import express from 'express'
import cors from 'cors'
const app = express()
import { randomBytes } from 'crypto'
import axios from 'axios'

app.use(express.json())

app.use(cors())
const posts = {}

app.get("/posts", (req, res) => {
    console.log("sdjkf;---😃",posts)
    res.send(posts,'😃')
})

app.post("/posts", async(req, res) => {
 
    const id = randomBytes(4).toString('hex')
    const { title } = req.body
    posts[id] = {
        id, title
    }
    await axios.post('http://localhost:4005/events',{
        type:'PostCreated',
        data:{
         id,title
        }
    })
    console.log(posts,"dkel;w");
    res.status(200).send(posts[id])
})
app.post("/events",(req,res)=>{
    console.log("event recieved" ,req.body);
        res.send({})
})
app.listen(4000, () => {
    console.log(`post app is listening to 4000`)
})