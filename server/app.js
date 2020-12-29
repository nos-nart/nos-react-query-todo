require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const todoRouter = require('./routes/todo');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', todoRouter);

connectDB()
  .then(async () => {
    app.listen(4000, () => {
      console.log(`Server is running!!`)
    })
  })
  .catch((err) => {
    console.log(`Connect error ${err}`)
  })
