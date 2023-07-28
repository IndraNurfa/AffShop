const bcrypt = require('bcryptjs');
const User = require('../model/userModel');

const registerUser = async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body;

    try {
        const existingUserEmail = await User.findOne({
            email
        });
        const existingUserUsername = await User.findOne({
            username
        });

        if (existingUserEmail) {
            return res.status(409).json({
                error: 'User with this email already exists.'
            });
        }

        if (existingUserUsername) {
            return res.status(409).json({
                error: 'User with this username already exists.'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const userToSave = await newUser.save();
        res.status(201).json({
            message: 'User registered successfully!',
            comment: userToSave
        });
    } catch (err) {
        res.status(500).json({
            error: 'An error occurred while registering the user.'
        });
    }
};

const loginUser = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    try {
        const user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(401).json({
                error: 'Invalid credentials. Please try again.'
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                error: 'Invalid credentials. Please try again.'
            });
        }

        req.session.userId = user._id;

        res.json({
            message: 'Login successful!'
        });
    } catch (err) {
        res.status(500).json({
            error: 'An error occurred while logging in.'
        });
    }
};

const logoutUser = (req, res) => {
    req.session.destroy();
    res.json({
        message: 'Logged out successfully!'
    });
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
};