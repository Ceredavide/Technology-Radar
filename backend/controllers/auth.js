const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const User = require("../models/User");
const HttpError = require("../classes/HttpError");
const asyncHandler = require("../utils/asyncHandler");

function generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

exports.signup = asyncHandler(async (req, res, next) => {
    const { email, password, company } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new HttpError("There is already an user with that email.", 422));
        }

        const hashedPassword = bcrypt.hashSync(password, 12);
        const newUser = new User({
            email: email.trim(),
            password: hashedPassword,
            company
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.log(error);
        next(new HttpError("Internal Server Error.", 500));
    }
})

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email }).select("-createdAt -updatedAt -__v");
        if (!existingUser) {
            return next(new HttpError("User not found.", 401));
        }

        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        if (!isValidPassword) {
            return next(new HttpError("Password is wrong, try again.", 401));
        }

        const token = generateToken(existingUser.id);

        const user = { ...existingUser._doc };
        delete user._id;
        delete user.password;

        res.status(200).json({ token, user });
    } catch (error) {
        console.log(error);
        next(new HttpError("Internal Server Error.", 500));
    }
})
