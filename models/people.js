const mongoose = require('mongoose')

const People = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    country: {
        type: String, 
        required: true
    },
    city: {
        type: String,
        required: true
    },
},
{
    timestamps: true
})

mongoose.model('people', People)