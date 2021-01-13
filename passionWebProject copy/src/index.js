const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session  = require('express-session');
// const flash = require('connect-flash');

const initializePassport = require('./config/passport-config');
initializePassport(passport); 




const app = new express();
const PORT =3000;

const db = require('./config/db');
const route = require('./routes');


//set view engine
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'public/views'));



app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(cookieParser());
app.use(session( {secret: 'secret', resave: false, saveUninitialized: false} ));

//use static file 
app.use(express.static(path.join(__dirname,"public")));

const csrf = require('csurf');

const csfProtection = csrf({ cookie:true });
// router.use(csfProtection());
app.get('/register',csfProtection, (req,res,next) =>{
    res.render('register', {csrfToken: req.csrfToken()});
});

//Connect to database
db.connect();
route(app);

app.listen(PORT,() =>{
    console.log(`App listening on port ${PORT}`);
})