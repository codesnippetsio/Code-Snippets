const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/api', (req, res) => {
  return res.status(200).send('Entered api endpoint');
})

app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, './public/index.html'));
});

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

module.exports = app;