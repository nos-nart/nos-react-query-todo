const Todo = require('./todo.model');

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

module.exports = {
  getTodos,
  addTodo
}