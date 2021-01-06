const express = require('express');
const  { model } = require('mongoose');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/regist',siteController.regist);

module.exports = router;