const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('movies/index.ejs', {
      movies: currentUser.movies,
    });
  } catch (err) {
    res.redirect('/');
  }
});

router.get('/new', async (req, res) => {
  res.render('movies/new.ejs');
});

router.get('/:movieId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const movie = currentUser.movies.id(req.params.movieId);
    res.render('movies/show.ejs', { movie });
  } catch (err) {
    res.redirect('/');
  }
});

router.get('/:movieId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const movie = currentUser.movies.id(req.params.movieId);
    res.render('movies/edit.ejs', { movie });
  } catch (err) {
    res.redirect('/');
  }
});

router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.movies.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/movies`);
  } catch (err) {
    res.redirect('/');
  }
});

router.put('/:movieId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const movie = currentUser.movies.id(req.params.movieId);
    movie.set(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/movies/${req.params.movieId}`);
  } catch (err) {
    res.redirect('/');
  }
});

router.delete('/:movieId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.movies.id(req.params.movieId).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/movies`);
  } catch (err) {
    res.redirect('/');
  }
});

module.exports = router;