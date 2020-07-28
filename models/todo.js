//https://metanit.com/web/nodejs/6.7.php
const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const TodoScheme = new Scheme({
   action: {
       type: String,
       required: [true, 'The todo text field is required']
   }
});

const Todo = mongoose.model('todo', TodoScheme);

module.exports = Todo;