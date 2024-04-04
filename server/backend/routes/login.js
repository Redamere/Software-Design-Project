const express = require('express');
const { loginUser } = require('../controller/signup');

const router = express.Router();

router.post('/', loginUser);
module.exports = router;