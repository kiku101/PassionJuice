const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session  = require('express-session');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
// const validator = require('express-validator');

const passport = require('passport');
const flash = require('connect-flash');

const MongoStore = require('connect-mongo')(session);
const Product = require('./app/models/Product');

const userRouter= require('./routes/user');
const siteRouter = require('./routes/site');
// const productRouter = require('./routes/products');
require('./config/passport');



const app = new express();
const PORT =3000;

const db = require('./config/db');
const route = require('./routes');

//Connect to database
db.connect();

//set view engine
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'public/views'));

app.use(fileUpload());

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(validator());
app.use(bodyParser.raw());
app.use(cookieParser());
app.use(session( {secret: 'secret', 
resave: false, 
saveUninitialized: false,
store: new MongoStore({ mongooseConnection: mongoose.connection }),
cookie: { maxAge: 180 *60 * 1000 }
} ));
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



app.use((req, res, next) => {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});

app.post('/create', (req,res,next) => {
    let image = req.files.imageURL;
    console.log(image);
    console.log(req.body);
    image.mv(
        path.resolve(__dirname, "/public/upload", image.name),
        function (error) {
        Product.create(
            {
            ...req.body,
            imageURL: "/upload/" + image.name,
            },
            (err) => {
            console.log(err);
            res.redirect("/");
            }
        );
        })
    });


app.use('/user',userRouter);
// app.use('/product',productRouter);
app.use('/',siteRouter);



app.listen(PORT,() =>{
    console.log(`App listening on port ${PORT}`);
})