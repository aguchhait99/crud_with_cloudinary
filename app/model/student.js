const mongoose = require('mongoose');

const Schema = mongoose.Schema

const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    }
}, { timestamps: true })

const StudentModel = mongoose.model('Student', StudentSchema);

module.exports = StudentModel