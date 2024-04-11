const express = require('express')
const {
    createProfile
} = require('../controller/profileController')

const router = express.Router()

// POST a new profile
router.post('/', createProfile)

module.exports = router