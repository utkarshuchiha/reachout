const express=require('express');
const router=express.Router();

const usersCOntroller=require('../controllers/users_controller');
router.get('/profile',usersCOntroller.profile);

router.get('/sign-up',usersCOntroller.signUp);

router.get('/sign-in',usersCOntroller.signIn);

router.post('/create',usersCOntroller.create);

router.post('/create-session',usersCOntroller.createSession);

router.post('/logout',usersCOntroller.logout);

module.exports=router;