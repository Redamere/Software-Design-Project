const express = require('express');
const path = require('path');
const { signupUser } = require('../controller/signup');

const router = express.Router();

router.post('/', signupUser);

module.exports = router;