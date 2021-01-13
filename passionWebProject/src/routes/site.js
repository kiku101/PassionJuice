const express = require('express');
const  { model } = require('mongoose');
const router = express.Router();
const verify = require('../app/auth/checkToken');

const siteController = require('../app/controllers/SiteController');

router.get('/login',siteController.loginRender);

router.get('/register',siteController.registerRender);

router.get('/',siteController.index);

module.exports = router;