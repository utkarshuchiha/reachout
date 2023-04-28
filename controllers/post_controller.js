const Post=require('../models/post');
const User=require('../models/user');
const Comment=require('../models/comment');

module.exports.create=async function(req,res){
   try{
    let post=await Post.create({
        content:req.body.content,
        user:req.user._id
    });
    let user=await User.findById(req.user._id)

    if(req.xhr){
        return res.status(200).json({
            data:{
                post:post,
                user:user.name
            },
            message:"Post Created Successfully"
        });
    }
        req.flash('success','Post Published');
        return res.redirect('back');

    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
};


module.exports.destroy=async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        //.id means converting the object id into string
        if(post.user== req.user.id){
            post.remove();
    
           await Comment.deleteMany({post:req.params.id});
           if(req.xhr){
            return res.status(200).json({
                data:{
                    post_id:req.params.id
                },
                message:"Post Deleted!"
            });
           }
           req.flash('success','Post deleted!')
           return res.redirect('back');
        }else{
            req.flash('error','unauthorized user');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
   
}