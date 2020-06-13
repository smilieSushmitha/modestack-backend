const express = require('express');
const UserController = require('../controller/user');

const router = express.Router();

router.post('/', UserController.register);

router.get('/:email', UserController.login);
module.exports = router;
