const moongose = require("mongoose")

const CATEGORIES = require("../constants/CATEGORIES")
const RINGS = require("../constants/RINGS")

const { Schema } = moongose

const technologySchema = new Schema({
    name: {
        type: String,
        required: [true, "Name field is required."],
    },
    description: {
        type: String,
        required: [true, "Technology description is required."]
    },
    category: {
        type: String,
        required: [true, "Category name is required."],
        enum: {
            values: Object.keys(CATEGORIES),
            message: "{VALUE} is not supported."
        }
    },
    ring: {
        type: String,
        required: false,
        enum: {
            values: Object.keys(RINGS),
            message: "{VALUE} is not supported."
        }
    },
    descriptionCategorization: {
        type: String,
        required: false
    },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    published: { type: Boolean, default: false },
}, {
    timestamps: true,
    collection: "Technologies"
})

technologySchema.pre("save", function (next) {
    this.category = CATEGORIES[this.category]
    this.ring = RINGS[this.ring]

    next()
})

module.exports = moongose.model("Technology", technologySchema)