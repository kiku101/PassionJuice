const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../app/models/User');


passport.serializeUser( (user, done) => {
    done(null,user.id);
 } );

passport.deserializeUser( (id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
})

passport.use('local.sigup', new LocalStrategy( {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) =>{
    User.findOne( {'username': username }, (err, user) =>{
        // req.checkBody('username', 'Invalid Username').notEmpty();
        // req.checkBody('password', 'Invalid Password').notEmpty();
        // var errors = req.validationErrors();
        if(err){
            return done(err);
        }
        if(user) {
            return done(null, false, {message: 'Username is already in use'});
        }
        var newUser = new User();
            newUser.username = username;
            newUser.password = newUser.encryptPassword(password);
            newUser.save( (err, result) => {
                if(err){
                    return done(err);
                }
                return done(null, newUser);
            });
    } );
}))


passport.use('local.sigin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},  (req,username,password,done) => {
    User.findOne( {'username': username }, (err, user) =>{
        // req.checkBody('username', 'Invalid Username').notEmpty();
        // req.checkBody('password', 'Invalid Password').notEmpty();
        // var errors = req.validationErrors();
        if(err){
            return done(err);
        }
        if(!user) {
            return done(null, false, {message: 'No user found!'});
        }
        if(!user.validPassword(password)){
            return done(null, false, {message: 'Wrong password!'});
        }
        return done(null, user);
    } );
}))