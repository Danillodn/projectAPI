const express = require('express')
const app = express()

require('dotenv').config()

const cors = require('cors')

const PORT = process.env.PORT

const Post = require('./models/Posts')

app.use(express.json())

app.use(cors())

app.get('/hello_world', (req, res)=>{
    res.send('hello world')
})

app.post('/create', (req, res)=>{
    const title = req.body.title

    res.send(`Post: ${title}`)
})


app.post('/create_post', async (req, res) => {
    try {
     const { title, description, content } = req.body
     const post = await Post.create({ title, description, content })
     res.send(post)  
     } catch (err) {    
       res.status(400).send(err)
    }
    
})  

app.get('/list_posts', async (req, res) => {
    try {
        const posts = await Post.find()
        res.send({ posts })
    } catch (err) {
        res.status(400).send(err)
    }
})


app.get('/show_post/:post_id', async (req, res) => {
    try {
        const postId = req.params.post_id
        const post = await Post.findById(postId)
        res.send({ post })
    } catch (err) {
        res.status(400).send(err)        
    }
})

app.put('/update_post/:post_id', async (req, res) => {
    try {
        const postId = req.params.post_id
        const { title, description, content } = req.body
        const post = await Post.findByIdAndUpdate(postId, { title, description, content }, { new: true})
        res.send({ post })
    } catch (err) {
        res.status(200).send(err)
    }
   
})


app.delete('/delete_post/:post_id', async (req, res) => {
    try {
        const postId = req.params.post_id
        await Post.findByIdAndDelete(postId)
        res.send( { msg: 'Deletado com Sucesso!' })
    } catch (err) {
        res.status(404).send(err)
    }
})


app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT)
})

