const User=require('../models/user');
module.exports.profile=function(req,res){
    //check if cookies are set
   if(req.cookies.user_id){
    //find the user by cookie
    User.findById(req.cookies.user_id,function(err,user){
        if(err){console.log('error in finding the user');return;}
        if(user){
            return res.render('profile',{
                title:'profile page',
                user:user
            });
        }
        return res.redirect('/users/sign-in');
    });
   }else{
    return res.redirect('/users/sign-in');
   }
   
  
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
module.exports.createSession=(req,res)=>{

    //find the user
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finding user in signing in');return;}
        //handle user found
       if(user){
        //handle password which doesnt match
        if(user.password!=req.body.password){
            return res.redirect('back');
        }
        //handle session creation
        res.cookie('user_id',user.id);
        return res.redirect('/users/profile');

       }else{
             //handle user not found
             return res.redirect('/users/sign-up');
       } 
    
    });

}

module.exports.logout=(req,res)=>{
   
    res.cookie('user_id',null);
    return res.redirect('/users/sign-in');

}