const express=require('express');
const router=express.Router();
const passport=require('passport');

const usersCOntroller=require('../controllers/users_controller');
router.get('/profile',passport.checkAuthentication,usersCOntroller.profile);

router.get('/sign-up',usersCOntroller.signUp);

router.get('/sign-in',usersCOntroller.signIn);

router.post('/create',usersCOntroller.create);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),usersCOntroller.createSession);

module.exports=router;