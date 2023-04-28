const Comment = require("../models/comment");
const Post = require("../models/post");
const User = require("../models/user");
module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      //mongo db will find with the id and automatically update
      post.comments.push(comment);
      post.save();

      let user = await User.findById(req.user._id);

      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment: comment,
            user: user.name,
          },
          message: "Comment Publised",
        });
      }
      return res.redirect("/");
    }
  } catch (err) {
    console.log(`error-${err}`);
  }
};

module.exports.destroy = async function (req, res) {
  let comment = await Comment.findById(req.params.id).populate("post").exec();
  let user=await User.findById(req.user._id);
  if (comment.user == req.user.id || comment.post.user == req.user.id) {
    let postId = comment.post;
    comment.remove();

    let post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { comments: req.params.id } },
      { new: true }
    ).exec();
     if(req.xhr){
      return res.status(200).json({
        data:{
          comment_id:req.params.id,
          user:user.name
        },
        message:"comment deleted"
      })
     }
    return res.redirect("back");
  } else {
    return res.redirect("back");
  }
};
