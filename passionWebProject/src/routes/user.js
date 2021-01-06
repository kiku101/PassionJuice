const express = require('express');
const { model } = require('mongoose');
const router = express.Router();

const UserController = require('../app/controllers/UserController');

router.post('/login');

router.post('/register',UserController.regist);

module.exports = router;
