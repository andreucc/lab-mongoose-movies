'use strict';

const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie');

// GET MOVIES LIST
router.get('/', async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.render('../views/movies/index', { movies });
  } catch (error) {
    next(error);
  }
});

// GET MOVIE DETAILS
router.get('/details/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    res.render('../views/movies/show', movie);
  } catch (error) {
    next(error);
  }
});

// ADD MOVIE AND EDIT(POST)
router.get('/new', (req, res, next) => {
  res.render('../views/movies/new');
});

router.post('/', async (req, res, next) => {
  const { _id, title, genre, plot } = req.body;
  const movie = { title, genre, plot };
  try {
    if (_id) {
      await Movie.findByIdAndUpdate(_id, movie);
    } else {
      await Movie.create(movie);
    }
    res.redirect('/movies');
  } catch (error) {
    res.render('../views/movies/new');
  }
});

// DELETE MOVIE
router.get('/:id/delete', async (req, res, next) => {
  const { id } = req.params;
  try {
    await Movie.findByIdAndDelete(id);
    res.redirect('/movies');
  } catch (error) {
    next(error);
  }
});

// EDIT MOVIE

router.get('/:id/edit', async (req, res, next) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    res.render('../views/movies/edit', movie);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
