const Todo = require('./todo.model');
const { nanoid } = require('nanoid');

async function getTodos(req, res) {
  try {
    const todos = await Todo.find();
    res.json(JSON.stringify(todos, null, 2))
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
}

async function addTodo(req, res) {
  const todo = new Todo({
    title: req.body.title,
    id: nanoid()
  })

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch(err) {
    res.status(400).json({ message: err.message })
  }
}

module.exports = {
  getTodos,
  addTodo
}