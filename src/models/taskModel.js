const mongoose = require('mongoose');
const { use } = require('react');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 1,
    },
    description: { 
        type: String,
        default: ''
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = mongoose.model('Task', taskSchema);