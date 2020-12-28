require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const todoRouter = require('./routes/todo');

const app = express();

app.use(express.json());
app.use('/', todoRouter);

connectDB()
  .then(async () => {
    app.listen(3000, () => {
      console.log(`Server is running!!`)
    })
  })
  .catch((err) => {
    console.log(`Connect error ${err}`)
  })
