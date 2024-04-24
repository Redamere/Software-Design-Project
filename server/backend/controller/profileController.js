const Profile = require('../models/profileModel')
const mongoose = require('mongoose')

// get all profiles
const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find({})
        res.status(200).json({ profiles })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// get a user's profile
const getUserProfile = async (req, res) => {
    const { id } = req.params
    console.log(id);

    try {
        const profile = await Profile.findOne({ user_id: id }) // Search by user_id attribute
        // Alternatively, you can use ES6 shorthand if the variable name matches the field name:
        // const profile = await Profile.findOne({ user_id })

        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' })
        }

        return res.status(200).json({ profile })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}


// create a new profile
const createProfile = async (req, res) => {
    console.log("hi");
    const { fullName, address1, address2, city, state, zipcode, user_id } = req.body

    // add doc to db
    try {
        const profile = await Profile.create({ fullName, address1, address2, city, state, zipcode, user_id })
        res.status(200).json({ profile })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// edit a user's profile
const editProfile = async (req, res) => {
    const { fullName, address1, address2, city, state, zipcode, user_id } = req.body

    try {
        const profile = await Profile.findOneAndUpdate({ user_id: user_id }, {
            fullName, address1, address2, city, state, zipcode
        }, { new: true }) // Add { new: true } to return the updated document

        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' })
        }

        return res.status(200).json({ profile })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getProfiles,
    getUserProfile,
    createProfile,
    editProfile
}