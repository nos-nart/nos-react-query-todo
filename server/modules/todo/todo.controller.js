const Todo = require('./todo.model');
const mongoose = require('mongoose');

async function getTodos(req, res) {
  try {
    const todos = await Todo.find();
    res.json(JSON.stringify(todos, null, 2))
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
}

async function addTodo(req, res) {
  const { title, id } = req.body;
  const todo = new Todo({ title, id });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch(err) {
    res.status(400).json({ message: err.message })
  }
}

async function removeTodo(req, res) {
  const { id } = req.body;

  try {
    await Todo.findByIdAndDelete(
      {_id: mongoose.mongo.ObjectID(id)},
      function(err, offer) {
        if (err) throw err;
        else {
          res.status(201).json({ message: 'Delete successfully!!'});
        }
    })
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function updateTodo(req, res) {
  const { id, title } = req.body;
  const update = { title };
  try {
    await Todo.findByIdAndUpdate(
      {_id: mongoose.mongo.ObjectID(id)},
      update,
      (err, offer) => {
        if (err) throw err;
        else {
          res.status(201).json({ message: 'Updated successfully!!' });
        }
      }
    )
  } catch(err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  getTodos,
  addTodo,
  removeTodo,
  updateTodo
}