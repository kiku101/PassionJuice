const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const passport = require('passport')
const csrf = require('csurf')

const csfProtection = csrf();
router.use(csfProtection);

router.get('/detailproduct',isLoggedIn, (req,res,next) => {
    res.render('createProduct');
});

router.get('/logout',isLoggedIn, (req,res,next) => {
    req.logOut();
    res.redirect('/');
})

router.use('/', notLoggedIn, (req,res,next) => {
    next();
});

router.get('/login',csfProtection, (req,res,next) => {
    var messages = req.flash('error');
    res.render('login', {csrfToken: req.csrfToken()});
});

router.get('/register',csfProtection, (req,res,next) =>{
    var messages = req.flash('error');
    res.render('register', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length >0});
});

router.post('/login', passport.authenticate('local.sigin', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));


router.post('/register', passport.authenticate('local.sigup', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
}));






module.exports = router;

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()) {
        return next();

    }
    res.redirect('/user/login');
}


function notLoggedIn(req,res,next) {
    if(!req.isAuthenticated()) {
        return next();

    }
    res.redirect('/');
}