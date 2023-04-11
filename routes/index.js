const express=require('express');
//use express.router
const router=express.Router();
//require the action created in controllers
const homeController=require('../controllers/home_controller');

// console.log('ROutes loaded');
//http request for home use different function name for different action 
router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./post'));
//for any further routes access from here
//router.use('/routeName',require('./routerfile));

module.exports=router;