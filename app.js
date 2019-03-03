'use strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const celebrityRouter = require('./routes/celebrities');
const movieRouter = require('./routes/movies');

const app = express();

mongoose.connect('mongodb://localhost/movies', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

// ***************INSERT CELEBRITIES IN DATABASE********************
/*
const celebrities = require('./bin/seeds');
const Celebrity = require('./models/Celebrity');

Celebrity.insertMany(celebrities)
  .then(result => {
    console.log(result);
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(error);
  });
*/
// **************INSERT MOVIES IN DATABASE***************************
/*
const movies = require('./bin/seeds');
const Movie = require('./models/Movie');

Movie.insertMany(movies)
  .then(result => {
    console.log(result);
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(error);
  });
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/celebrities', celebrityRouter);
app.use('/movies', movieRouter);

// -- 404 and error handler

// NOTE: requires a views/not-found.ejs template
app.use((req, res, next) => {
  res.status(404);
  res.render('not-found');
});

// NOTE: requires a views/error.ejs template
app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.render('error');
  }
});

module.exports = app;
