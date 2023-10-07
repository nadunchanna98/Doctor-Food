const mongoose = require('mongoose');

const diseaseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    important: {
        type: String,
        required: true,
    },
    veryimportant: {
        type: String,
        required: true,
    },
    causes: {
        type: String,
        required: false,
    },

    recommondation : {
        type: String,
        required: false,
    },
    symptoms : {
        type: String,
        required: false,
    },
    image : {
        type: String,
        required: false,
    },

    created :{
        type: Date,
        default: Date.now
    }
});

exports.Disease = mongoose.model('Disease-Details', diseaseSchema);
