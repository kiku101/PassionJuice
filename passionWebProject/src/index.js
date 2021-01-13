const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
// const passport = require('passport');
// const session  = require('express-session');
// const flash = require('connect-flash');

// const initializePassport = require('./config/passport-config');
// initializePassport(passport); 



const app = new express();
const PORT =3000;

const db = require('./config/db');
const route = require('./routes');

// if( process.env.NODE_ENV !== 'production'){
//     require('dotenv').config();
// }

//set view engine
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'public/views'));

// app.use(session({secret: 'mysecret', resave: false, saveUninitialized:  false}));
// app.use(flash());
// app.use(passport.session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }
// ));

// app.use(passport.initialize());
// app.use(passport.session());

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());

//use static file 
app.use(express.static(path.join(__dirname,"public")));


//Connect to database
db.connect();
route(app);

app.listen(PORT,() =>{
    console.log(`App listening on port ${PORT}`);
})