const express=require('express');
const router=express.Router();
const passport=require('passport');

const usersCOntroller=require('../controllers/users_controller');
router.get('/profile/:id',passport.checkAuthentication,usersCOntroller.profile);
router.post('/update/:id',passport.checkAuthentication,usersCOntroller.update);

router.get('/sign-up',usersCOntroller.signUp);

router.get('/sign-in',usersCOntroller.signIn);

router.post('/create',usersCOntroller.create);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),usersCOntroller.createSession);

router.get('/sign-out',usersCOntroller.destroySession);

module.exports=router;