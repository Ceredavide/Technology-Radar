const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');

const User = require("../models/User")
const HttpError = require("../classes/HttpError")

exports.signup = async (req, res, next) => {

    const { email, password, company } = req.body

    let existingUser

    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        console.log(err)
        return next(new HttpError("Something went wrong, try again later.", 500))
    }

    if (existingUser) {
        return next(new HttpError("There is already an user with that email.", 422))
    }

    let hashedPassword;

    try {
        hashedPassword = bcrypt.hashSync(password, 12)
    } catch (err) {
        console.log(err)
        return next(new HttpError("Something went wrong, try again later.", 500))
    }

    const newUser = new User({
        email: email.trim(),
        password: hashedPassword,
        company: company
    })

    try {
        await newUser.save()
    } catch (err) {
        console.log(err)
        return next(new HttpError("Something went wrong, try again later.", 500))
    }

    res.status(201).json()
}

exports.login = async (req, res, next) => {

    const { email, password } = req.body

    let existingUser

    try {
        existingUser = await User.findOne({ email }).select("-createdAt -updatedAt -__v")
    } catch (err) {
        return next(new HttpError("Something went wrong, try again later.", 500))
    }

    if (!existingUser) {
        return next(new HttpError("User not found.", 401))
    }

    let isValidPassword;

    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password)
    } catch (err) {
        return next(new HttpError("Something went wrong, try again later.", 500))
    }

    if (!isValidPassword) {
        return next(new HttpError("Password is wrong, try again.", 401))
    }

    let token;

    try {
        token = await jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, { expiresIn: "30d" })
    } catch (err) {
        return next(new HttpError("Something went wrong, try again later.", 500))
    }

    let user = {
        ...existingUser._doc
    }

    delete user._id
    delete user.password

    res.status(200).json({ token, user })
}