const express=require('express');
const router=express.Router();

const usersCOntroller=require('../controllers/users_controller');
router.get('/profile',usersCOntroller.profile);

module.exports=router;