const express = require ('express');
const router = express.Router();
const Todo = require('../models/todo');

router.get('/reports', (req, res, next) => {
    //this will return all the data, exposing only the id and action field to the client
    Todo.find({}, ['studentId', 'recommendation'])
        .then(data => res.json(data))
        .catch(next)
});

router.get('/reports/:id', (req, res, next) => {
    //this will return all the data, exposing only the id and action field to the client
    Todo.findById(req.params.id, ['studentId', 'recommendation'])
        .then(data => res.json(data))
        .catch(next)
});

router.post('/reports', (req, res, next) => {
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

router.delete('/reports/:id', (req, res, next) => {
    Todo.findOneAndDelete({"_id": req.params.id})
        .then(data => res.json(data))
        .catch(next)
});

router.put('/reports/:id', (req, res, next) => {
    if(req.params.id){
        Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true})
            .then(data => res.json(data))
            .catch(next)
    }else {
        res.json({
            error: "The input field is empty"
        })
    }
});

module.exports = router;