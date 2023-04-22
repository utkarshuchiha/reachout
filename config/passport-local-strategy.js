const passport=require('passport');

const localStrategy=require('passport-local').Strategy;

const User=require('../models/user');


//authentication using passport
passport.use(new localStrategy({
    usernameField:'email',
    passReqToCallback:true
},
function(req,email,password,done){
//find the user and establish the identity
User.findOne({email:email},function(err,user){
    if(err){
        req.flash('error',err);
        return done(err);
    }
    if(!user || user.password!=password){
        req.flash('error','Invalid username/password');
        return done(null,false);
    }
    return done(null,user);
});
}
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding the user');
            return done(err);
        }
        return done(null,user);
    });
});
//used as middleware
passport.checkAuthentication=function(req,res,next){
   
    //if the user is signed in ,then pass on th erequest to next func controller action
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next){
   
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and sending it to locals for views
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;
