const express = require('express')
const app = express()
const Post = require('./models/Posts')

app.use(express.json())

app.get('/hello_world', (req, res)=>{
    res.send('hello world')
})

app.post('/create', (req, res)=>{
    const title = req.body.title

    res.send(`Post: ${title}`)
})


app.post('/create_post', async (req, res) => {
  
    try {
     const { title, content } = req.body
     const post = await Post.create({ title, content })
     res.send(post)  
     } catch (err) {    
       res.status(400).send(err)
    }
    
})  

app.get('/list_posts', async (req, res)=>{
    try {
        const posts = await Post.find()

        res.send({ posts })
    } catch (err) {
        res.status(400).send(err)
    }
})


app.listen(5000, () => {
    console.log('Server running on port: ' + 5000)
})

