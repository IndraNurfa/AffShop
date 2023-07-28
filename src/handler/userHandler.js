const User = require('../model/userModel');

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        res.json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const editProfile = async (req, res) => {
    try {
        const updatedProfile = req.body;
        const options = {
            new: true
        };

        const result = await User.findByIdAndUpdate(req.session.userId, updatedProfile, options)

        res.send(result);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    getProfile,
    editProfile
}