//https://metanit.com/web/nodejs/6.7.php
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const TodoSchema = new Schema({
    action: {
        type: String,
        required: [true, 'The todo text field is required']
    },
    studentId: {
        type: String,
        required: [true, 'The id field is required']
    },
    pathToReport: {
        type: String,
        required: [false]
    }
})

//create model for todo
const Todo = mongoose.model('todo', TodoSchema);

module.exports = Todo;