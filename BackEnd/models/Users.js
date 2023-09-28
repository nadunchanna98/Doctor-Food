const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: false,
    },
    theme: {
        type: String,
        default : "light",
    },
    dob : {
        type: String,
        required: false,
    },
    blood : {
        type: String,
        required: false,
    },
    Allergies : [
        {
            type: String,
            required: false,
        }
    ],
    role : {
        type: String,
        default : "user",
    },
});

exports.Users = mongoose.model('Users-Details', UsersSchema);
