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
            values: [...Object.keys(CATEGORIES), ...Object.values(CATEGORIES)],
            message: "{VALUE} is not supported."
        }
    },
    ring: {
        type: String,
        required: false,
        enum: {
            values: ["", ...Object.keys(RINGS), ...Object.values(RINGS)],
            message: "{VALUE} is not supported."
        }
    },
    descriptionCategorization: {
        type: String,
        required: false
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    published: {
        type: Boolean,
        default: false
    },
    publisher: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
        default: null,
    },
    publishedAt: {
        type: Date,
        required: false,
        default: null
    },
    edits: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        time: {
            type: Date,
            required: true
        },
        action: {
            type: String,
            required: true,
            enum: {
                values: ["technology", "ring"],
                message: "{VALUE} is not supported."
            }
        }
    }]
}, {
    timestamps: true,
    collection: "Technologies"
})

technologySchema.pre("save", function (next) {
    this.category = CATEGORIES[this.category] || this.category
    this.ring = RINGS[this.ring] || this.ring
    next()
})

module.exports = moongose.model("Technology", technologySchema)