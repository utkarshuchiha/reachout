const User = require("../models/user");
const fs=require('fs');
const path=require('path');

module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render("profile", {
      title: "profile page",
      profile_user: user,
    });
  });
};

module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
  try{
    let user = await User.findById(req.params.id);
    //multipart form cannot be read through expressparser we use multer for it
    User.uploadedAvatar(req,res,function(err){
      if(err){console.log("err"+err)}
      user.name=req.body.name;
      user.email=req.body.email;
      if(req.file){

        if(user.avatar){
          fs.unlinkSync(path.join(__dirname,'..',user.avatar));
        }

        user.avatar=User.avatarPath+'/'+req.file.filename;
      }
      user.save();
      return res.redirect('back');
    });
  }catch(err){
            req.flash('error',err);
            return res.redirect('back');
  }

    
  } else {
    return res.status(401).send("Unauthorized");
  }
};

//render Sign up Page
module.exports.signUp = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_up", {
    title: "REACHOUT| Sign Up",
  });
};

//render Sign in page
module.exports.signIn = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_in", {
    title: "REACHOUT| Sign In",
  });
};
//get the sign up data
module.exports.create = (req, res) => {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log("error in finding user in signing up");
      return;
    }
    if (!user) {
      User.create(req.body, (err, user) => {
        if (err) {
          console.log("error in creating user while signing up");
          return;
        }
        return res.redirect("/users/sign-in");
      });
    } else {
      res.redirect("back");
    }
  });
};
//sign in and create a session for user
module.exports.createSession = (req, res) => {
  req.flash("success", "Logged in successfully");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {});
  req.flash("success", "You have logged out");
  return res.redirect("/");
};
