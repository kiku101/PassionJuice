const express = require('express');
const  { model } = require('mongoose');
const router = express.Router();
const verify = require('../app/auth/checkToken');
// const csrf = require('csurf');



// const csfProtection = csrf();
// router.use(csfProtection());

const siteController = require('../app/controllers/SiteController');

router.get('/login',siteController.loginRender);

// router.get('/register',csfProtection,siteController.registerRender);

router.get('/',siteController.index);

module.exports = router;