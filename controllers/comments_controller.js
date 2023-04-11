const Comment=require('../models/comment');
const Post=require('../models/post');
module.exports.create=function(req,res){
   Post.findById(req.body.post,function(err,post){
    if(post){
        Comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.user._id
        },function(err,comment){
            if(err){
                console.log(err+'error in creating the comment in db');
            }
            //mongo db will find with the id and automatically update
            post.comments.push(comment);
            post.save();
             return res.redirect('/');
        });
    }
   });
}