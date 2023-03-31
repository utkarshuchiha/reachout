const express=require('express');
//use express.router
const router=express.Router();
//require the action created in controllers
const homeController=require('../controllers/home_controller');

// console.log('ROutes loaded');
//http request for home use different function name for different action 
router.get('/',homeController.home);

module.exports=router;