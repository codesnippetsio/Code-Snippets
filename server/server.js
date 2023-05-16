const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const snippetsRouter = require('./routes/snippetsRouter');
const authenticationRouter = require('./routes/authenticationRouter');

require('dotenv').config();

//Create express app and set constants
const app = express();
const port = process.env.PORT || 3000;

//Get mongoURI and connect to DB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI);

//Call default middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Point relevant requests to snippet and authentication routers
app.use('/snippets', snippetsRouter);
app.use('/authentication', authenticationRouter);

//Handle requests to invalid endpoints and middleware errors
app.use((req, res) => res.status(404).send('Invalid endpoint'));
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//Get 'er goin'
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
