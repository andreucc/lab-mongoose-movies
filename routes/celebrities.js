'use strict';

const express = require('express');
const router = express.Router();

const Celebrity = require('../models/Celebrity');

router.get('/', async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    res.render('../views/celebrities/index.hbs', { celebrities });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
