const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const ROLES = require('../constants/ROLES')

const { Schema } = mongoose

const userSchema = new Schema({
    userName: { type: String, required: false, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    company: { type: String, required: false },
    role: { type: String, default: ROLES.EMPLOYEE }
}, {
    timestamps: true,
    collection: "Users"
})

userSchema.plugin(uniqueValidator)

userSchema.pre("save", function (next) {
    this.userName = this.email.split("@")[0]
    next()
})

module.exports = mongoose.model("User", userSchema)