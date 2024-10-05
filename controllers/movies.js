const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


router.get('/', async(req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('movies/index.ejs', {
      movies: currentUser.movies,
    });
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
});

router.get('/new', async (req, res) => {
  res.render('movies/new.ejs');
});

router.post('/', async (req,res) => {
  try{
  const currentUsser = await User.findById(req.session.user._id);
  currentUsser.movies.push(req.body);

  await currentUsser.save();
  res.redirect(`/user/{currentUser._id}/movies`);
} catch (error) {
  console.log(error);
  res.redirect('/')
}
});

router.get(':movieId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const movie = currentUser.movies.id(req.params.movieId);
    res.render('movies/show.ejs', {
      movie: movie,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
 
  });

module.exports = router;