const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.js");


router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});

router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs")
});


router.post('/sign-up', async(req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username})
  if(userInDatabase) {
    return res.send("Username taken, like the best seat in the theater!🎬")
  }
  if(req.body.password !== req.body.confirmPassword) {
    return res.send("Passwords must match, like the hero and their sidekick!🎬✨")
  }
  const hashedPassword = bcrypt.hashSync(req.body.password, 12)
  req.body.password = hashedPassword
  const user = await User.create(req.body)
  res.send(`Thanks for signing up, ${user.username}! Your movie adventure starts now!🎥✨`)
});


router.post("/sign-in", async(req, res) => {
  const userInDatabase = await User.findOne({username: req.body.username});
  if(!userInDatabase) {
    return res.send("Login failed. It's like missing the opening scene—try again!🎬🔄")
  }
  const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password,
  )
  if(!validPassword) {
    return res.send("Login failed. It's like missing the opening scene—try again!🎬🔄")
  }
  req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id
  };

  req.session.save(() => {
    res.redirect("/");
  })
});


router.get("/sign-out", (req, res) => {
  req.session.destroy()
  res.redirect("/")
})


module.exports = router;