const express = require('express');
const UserController = require('../controller/user');

const router = express.Router();

router.post('/', UserController.createUser);

module.exports = router;