const express = require('express')
const {
    createProfile,
    getProfiles,
    getUserProfile,
    editProfile
    // deleteProfile,
    // updateProfile
} = require('../controller/profileController')

const router = express.Router()
router.get('/', getProfiles)

// // GET all profiles
router.get('/:id', getUserProfile)

// POST a new profile
router.post('/', createProfile)

// EDIT a profile
router.patch('/', editProfile)

// DELETE a profile
// router.delete('/:id', deleteProfile)

// UPDATE a profile
// router.patch('/:id', updateProfile)

module.exports = router