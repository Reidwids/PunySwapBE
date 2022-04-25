const mongoose = require("mongoose");


const swapSchema = mongoose.Schema({
    crypto1: {
        type: String,
        required: true,
    },
    crypto2: {
        type: String,
        required: true,
    },
    owner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
});

const Swap = mongoose.model("Bookmark", swapSchema);

module.exports = Swap;