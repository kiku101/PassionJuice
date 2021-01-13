const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../app/models/User');


passport.serializeUser((user,done) => { done(null, user.id) });
passport.deserializeUser((id,done) => { User.findById(id, (e,user) => {
    done(e, user);
})});

// passport.use('local.signup', new LocalStrategy({
//     usernameField: 'username',
//     passwordField: 'password',
//     passReqToCallback: true
// }, (req, username, password, done) => {
//     User.findOne({'username': username}, (e, user) => {
//         if(e){
//             return done(e);
//         }
//         if(user){
//             return done(null, false, {message: 'Username is already in use'});
//         }
//         var newUser = new User();
//             newUser.username = username;
//             newUser.password = password;
//     })
// }))

passport.use('local.sigin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => {
    req.checkBody('username','Invalid username').notEmpty();
    req.checkBody('username','Invalid password').notEmpty();
    var  errors = req.validationErrors();
    if (errors){
        var messages = [];
        errors.forEach( (error) => {
            messages.push(error.msg);
        });
        return (done, null, false, req.flash('error', messages));
    }

    User.findOne({'username': username}, (err, user) => {
        if(err){
            return done(err);
        }
        if(!user){
            return done(null, false, {message: 'Username is already in use'});
        }
        
    })
}))



// function initialize(passport, getUserByUsername){

//     const authenticateUser = async   (username, password, done) => {
//         const user = getUserByUsername(username);
//         if(user == null){
//             return done(null, false, {message: "no user with that username"});
//         }

//         try {
//             if(await bcrypt.compare(password, user.password)){
//                 return done(null, user)
//             }else{
//                 return done(null,false, { message: 'Password Incorrect' });
//             }
//         } catch (error) {
//             return done(error);
//         }
//     }

//     passport.use(new LocalStrategy({ usernameField: 'username' },
//     authenticateUser))

//     passport.serializeUser((user,done) => { done(null, user.id) })
//     passport.deserializeUser((id,done) => { })
// }

// module.exports = initialize;