const express = require('express');
const UserController = require('../controller/user');

const router = express.Router();

router.post('/login', UserController.authenticate);

router.post('/register', UserController.createUser);

module.exports = router;