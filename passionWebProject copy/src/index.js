const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session  = require('express-session');
// const validator = require('express-validator');

const passport = require('passport');
const flash = require('connect-flash');

const userRouter= require('./routes/user');
const siteRouter = require('./routes/site');
require('./config/passport');



const app = new express();
const PORT =3000;

const db = require('./config/db');
const route = require('./routes');


//set view engine
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'public/views'));



app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(validator());
app.use(bodyParser.raw());
app.use(cookieParser());
app.use(session( {secret: 'secret', resave: false, saveUninitialized: false} ));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//use static file 
app.use(express.static(path.join(__dirname,"public")));
const csrf = require('csurf')

const csfProtection = csrf();
app.use(csfProtection);

app.use(function (req, res, next) {
    var token = req.csrfToken();
    res.cookie('XSRF-TOKEN', token);
    res.locals.csrfToken = token;
    next();
  });
;

//Connect to database
db.connect();

app.use((req, res, next) => {
    res.locals.login = req.isAuthenticated();
    next();
});

app.use('/user',userRouter);
app.use('/',siteRouter);



app.listen(PORT,() =>{
    console.log(`App listening on port ${PORT}`);
})