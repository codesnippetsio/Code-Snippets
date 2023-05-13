const path = require('path');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const snippetsRouter = require('./routes/snippets');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/snippets', snippetsRouter)

app.get('*', (req, res) => {
  return res.status(404).send('404 NOT FOUND')
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, ()=> {
  console.log(`Server listening on port ${port}...`)
});
