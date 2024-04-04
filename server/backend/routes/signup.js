const express = require('express');
const { signupUser } = require('../controller/signup');

const router = express.Router();

router.post('/', signupUser);

module.exports = router;