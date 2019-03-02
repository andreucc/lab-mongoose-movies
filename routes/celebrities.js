'use strict';

const express = require('express');
const router = express.Router();

const Celebrity = require('../models/Celebrity');

// GET CELEBRITIES LIST
router.get('/', async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    res.render('../views/celebrities/index', { celebrities });
  } catch (error) {
    next(error);
  }
});

// GET CELEBRITY DETAIL **He tenido que añadir details a la ruta ya que con "/:id" y otras pruebas que he echo no conseguia enrutar bien**
router.get('/details/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const celebrity = await Celebrity.findById(id);
    res.render('../views/celebrities/show', celebrity);
  } catch (error) {
    next(error);
  }
});

// ADD CELEBRITY AND EDIT(POST)
router.get('/new', (req, res, next) => {
  res.render('../views/celebrities/new');
});

router.post('/', async (req, res, next) => {
  const { _id, name, occupation, catchPhrase } = req.body;
  const celebrity = { name, occupation, catchPhrase };
  try {
    if (_id) {
      await Celebrity.findByIdAndUpdate(_id, celebrity);
    } else {
      await Celebrity.create(celebrity);
    }
    res.redirect('/celebrities');
  } catch (error) {
    res.render('../views/celebrities/new');
  }
});

// DELETE CELEBRITY
router.get('/:id/delete', async (req, res, next) => {
  const { id } = req.params;
  try {
    await Celebrity.findByIdAndDelete(id);
    res.redirect('/celebrities');
  } catch (error) {
    next(error);
  }
});

// EDIT CELEBRITY

router.get('/:id/edit', async (req, res, next) => {
  const { id } = req.params;
  try {
    const celebrity = await Celebrity.findById(id);
    res.render('../views/celebrities/edit', celebrity);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
