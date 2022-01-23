const express = require('express')
const postRouter = express.Router()
const Post = require('../models/post')

//get all posts
postRouter.get('/',async (req,res)=>{
    try {
        const posts = await Post.find({},{_id:0})
        
        res.status(201).json(posts)
    } catch (error) {
        res.status(404).json(error)
    }   
})

//get particular post
postRouter.get('/:postid',async (req,res)=>{
    try {
        const post = await Post.findById(req.params.postid)
        res.status(201).json(post)
    } catch (error) {
        res.status(404).json(error)
    }
})

//add a post
postRouter.post('/',async (req,res)=>{
    const post = new Post({
        title:req.body.title,
        description:req.body.description
    })
    try {
        await post.save()

        res.status(201).json(post)
    } catch (error) {
        res.status(404).json(error)
    }
})

postRouter.delete('/:postId',async (req,res)=>{
    try {
        const removedPost = await Post.deleteOne({_id:req.params.postId})
        res.json(removedPost)
    } catch (error) {
        res.status(404).json(error)
    }
})
postRouter.patch('/:postId',async (req,res)=>{
    try {
        const updatedPost = await Post.updateOne(
            {_id:req.params.postId},
            {$set:{title:req.body.title}}
        )
        res.json(updatedPost)
    } catch (error) {
        res.status(404).json(error)
    }
})

module.exports = postRouter