const router = require("express").Router();
const Post = require("../models/Post")
const User = require("../models/User")


//create post
router.post("/", async (req, res)=>{
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    }catch(err){
        res.status(500).json(err)
    }
})
//update post
router.put("/:id", async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body});
        res.status(200).json("This post has been updated")
        }else {
            res.status(403).json("you can update only ur post")
        }
    }catch(err){
        res.status(500).json("theres an error")
    }
})
//delete a post
router.delete("/:id", async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne();
        res.status(200).json("This post has been deleted")
        }else {
            res.status(403).json("you can delete only ur post")
        }
    }catch(err){
        res.status(500).json("theres an error")
    }
})
//like a post
router.put("/:id/likes", async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}});
        res.status(200).json("You just liked this post")
        }else {
            await post.updateOne({$pull: {likes: req.body.userId}});
            res.status(200).json("You just unliked this post")
        }
    }catch(err){
        res.status(500).json(err)
    }
})
//get a post
router.get("/:id", async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch (err){
        res.status(500).json(err)
    }
})
//get timeline post
router.get("/timeline/allposts", async (req, res)=>{
    try{
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map((item)=>{
                return Post.find({userId: item.id});
            })
       );
        res.json(userPosts.concat(...friendPosts))
    }catch (err){
        console.error(err);
    }
})



module.exports = router