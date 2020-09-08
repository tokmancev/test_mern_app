const express = require ('express');
const router = express.Router();
const Todo = require('../models/todo');

router.get('/todos', (req, res, next) => {
    //this will return all the data, exposing only the id and action field to the client
    Todo.find({}, ['studentId', 'recommendation'])
        .then(data => res.json(data))
        .catch(next)
});

router.post('/todos', (req, res, next) => {
    if(req.body.studentId){
        Todo.create(req.body)
            .then(data => res.json(data))
            .catch(next)
    }else {
        res.json({
            error: "The input field is empty"
        })
    }
});

router.put('/todos', (req, res, next) => {
    console.log(req.body.selectedId);
    console.log(req.body);
    if(req.body.studentId){
        Todo.findByIdAndUpdate(
            req.body.selectedId,
            req.body,
            {new: true})
            .then(data => res.json(data))
            .catch(next)
    }else {
        res.json({
            error: "The input field is empty"
        })
    }
})

module.exports = router;