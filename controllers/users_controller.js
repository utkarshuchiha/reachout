const User=require('../models/user');
module.exports.profile=function(req,res){
    return res.render('profile',{
        title:'profile page',
        p_name:'utkarsh'
    });
}
//render Sign up Page
module.exports.signUp=(req,res)=>{
    return res.render('user_sign_up',{
        title:"REACHOUT| Sign Up"
    });
}

//render Sign in page
module.exports.signIn=(req,res)=>{
    return res.render('user_sign_in',{
        title:"REACHOUT| Sign In"
    });
}
//get the sign up data
module.exports.create=(req,res)=>{
    if(req.body.password!=req.body.confirm_password){
       return res.redirect('back');
    }
    User.findOne({email:req.body.email},(err,user)=>{
        if(err){console.log('error in finding user in signing up');return;}
        if(!user){
            User.create(req.body,(err,user)=>{
                if(err){console.log('error in creating user while signing up');return;}
                return res.redirect('/users/sign-in');
            });
        } else{
            res.redirect('back');
        }
    });
}
//sign in and create a session for user
module.exports.createSession=(req,res)=>{}