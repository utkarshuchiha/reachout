const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const cookieParser=require('cookie-parser');
const db=require('./config/mongoose');
//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware')

const port=8000;
const app=express();


app.use(sassMiddleware({
     src:'./assets/scss',
     dest:'./assets/css',
     debug:true,
     outputStyle:'extended',
     prefix:'/css'
}));


//read the data send 
app.use(express.urlencoded());
//reading cookies
app.use(cookieParser());

//tell the app to use layouts done before rendering any views
app.use(expressLayouts);
//set the statics 
app.use(express.static('./assets'));
//extract style and script from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setup the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'REACHOUT',
    //change secret before deplyment
    secret:"kuchbhi", //secret key used to sign the session ID cookie
    saveUninitialized:false, //dont create session until something is stored
    resave:false, // dont save the session data if not modified
    cookie:{
        maxAge: (1000*60*100)
    },
    store:new MongoStore({
        mongoUrl:'mongodb://localhost/REACHOUT_dev',
        autoRemove:'disabled'
    },function(err){
        console.log(err);
    })
   
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//use express router defined in routes/index.js 
//middleware
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`ERROR:${err}`);
    }
    console.log(`SERVER IS RUNNING ON PORT: ${port}`);
});