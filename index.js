const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/model');
const app = express();
const cors = require('cors');
const port = 3000;
require('dotenv').config();

app.use(cors());
app.use(express.json());

 const dbURI = "mongodb+srv://prince:prince...@cluster0.3kq8ru7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


mongoose.connect(dbURI)
    .then(() => {
        console.log(`Connected to ${process.env.NODE_ENV === 'production' ? 'MongoDB Atlas' : 'local MongoDB'}`);
    })
    .catch((error) => {
        console.log(`Not connected to ${process.env.NODE_ENV === 'production' ? 'MongoDB Atlas' : 'local MongoDB'}`, error);
    });
   
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Create a new Todo
app.post('/todos', async (req, res) => {
    try {
        const todo = new Todo({
            title: req.body.title,
            description: req.body.description
        });
        const savedTodo = await todo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.put('/todos/:id', async (req, res) => {
    try {
        const { title, description } = req.body;
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true, runValidators: true }
        );
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
