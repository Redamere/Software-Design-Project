const Profile = require('../models/profileModel')
const mongoose = require('mongoose')

// get all profiles
const getProfiles = async (req, res) => {
    const profiles = await Profile.find({}).sort({ createdAt: -1 })

    res.status(200).json(profiles)
}

// get a single profile
// const getProfile = async (req, res) => {
//     const { id } = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         res.status(404).json({ error: 'Profile not found' })
//     }

//     const profile = await Profile.findById(id)

//     if (!profile) {
//         res.status(404).json({ error: 'Profile not found' })
//     }

//     res.status(200).json(profile)
// }

// create a new profile
const createProfile = async (req, res) => {
    const { fullName, address1, address2, city, state, zipcode } = req.body

    // add doc to db
    try {
        const profile = await Profile.create({ fullName, address1, address2, city, state, zipcode })
        res.status(200).json({ profile })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a profile
// const deleteProfile = async (req, res) => {
//     const { id } = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         res.status(404).json({ error: 'Profile not found' })
//     }

//     const profile = await Profile.findOneAndDelete({ _id: id })

//     if (!profile) {
//         res.status(404).json({ error: 'Profile not found' })
//     }

//     res.status(200).json({ profile })
// }

// update a profile
// const updateProfile = async (req, res) => {
//     const { id } = req.params
//     const { fullName, address1, address2, city, state, zipcode } = req.body

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         res.status(404).json({ error: 'Profile not found' })
//     }

//     const profile = await Profile.findOneAndUpdate({ _id: id }, {
//         ...req.body
//     })

//     if (!profile) {
//         res.status(400).json({ error: 'Profile not found' })
//     }

//     res.status(200).json({ profile })
// }

module.exports = {
    getProfiles,
    // getProfile,
    createProfile,
    // deleteProfile,
    // updateProfile
}