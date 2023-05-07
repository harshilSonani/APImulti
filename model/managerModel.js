const mongoose = require('mongoose');

const managerSchema = mongoose.Schema({
    adminID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin record',
        required: true,
    },
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
    type: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
});

const admin = mongoose.model('manager record', managerSchema);

module.exports = admin