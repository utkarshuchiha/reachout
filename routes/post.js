const express=require('express');
const router=express.Router();
const passport=require('passport');
const postController=require('../controllers/post_controller');
router.post('/create',passport.checkAuthentication,postController.create);
//currently using a tag to make change afterwards will use js ajax then will change to delete or other request
router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);
module.exports=router;