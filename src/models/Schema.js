const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },


});

const Student = new mongoose.model('Student', StudentSchema);
module.exports = Student;

