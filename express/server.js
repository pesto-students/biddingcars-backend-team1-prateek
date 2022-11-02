const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { connection } = require('./mongoDB');
const serverless = require('serverless-http');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const carsRouter = require('../routes/cars');
const usersRouter = require('../routes/users');
const cardsRouter = require('../routes/cards');

app.use('/.netlify/functions/server/cars', carsRouter);
app.use('/.netlify/functions/server/users', usersRouter);
app.use('/.netlify/functions/server/cards', cardsRouter);


module.exports = app;
module.exports.handler=serverless(app)