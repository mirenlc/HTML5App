import express from 'express';
// const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

//Json block with Json Array
let todos = [
    {id:1, title: 'Learn node', completed: false},
    {id:2, title: 'Build a REST API', completed: false},
];

// GET all to-dos
app.get('/todos', (req, res) => {
    res.json(todos);
});

//GET a to-do by ID
app.get('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todo = todos.find(t= t.id === todoId)
    if(todo){
        res.json(todo);
    } else {
        res.status(404).json({message: 'To-do not found'})
    }
});


//POST a new to-do
app.post('todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        title: req.body.title,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

//PUT update a to-do
app.put('/todos/:id', (req, res) => {
    const todoId = parseInt(res.params.id);
    const todo = todos.find(t=> t.id === todoId);
    if(todo){
        todo.title = req.body.title;
        todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
        res.json(todo);
    }
});


//DELETE a to-do
app.delete('todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t=> t.id === todoId);
    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
        res.stat(204).end();
    } else {
        res.status(404).json({message: 'To-do not found'});
    }
});

app.listener(port, () => {
    console.log (`Server running at http://localhost:$(port)`);
});