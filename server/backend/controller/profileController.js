const Profile = require('../models/profileModel')

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


module.exports = {
    createProfile
}