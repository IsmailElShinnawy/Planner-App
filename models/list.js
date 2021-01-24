const mongoose = require('mongoose');

const Schema = mongoose.Schema

const listSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    items: {
        type: [String]
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true });

const List = mongoose.model('List', listSchema);

module.exports = List;