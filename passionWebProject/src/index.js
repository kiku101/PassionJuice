const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();
const PORT =3000;

const db = require('./config/db');
const route = require('./routes');

//set view engine
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'public/views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.raw());

//use static file 
app.use(express.static(path.join(__dirname,"public")));

db.connect();
route(app);

app.listen(PORT,() =>{
    console.log(`App listening on port ${PORT}`);
})