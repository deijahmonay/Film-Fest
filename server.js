require('dotenv').config();
const express = require("express");
const app = express();


const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require('express-session');
const MongoStore = require("connect-mongo");

const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const moviesController = require('./controllers/movies.js');

const port = process.env.PORT || "3000";
const path = require('path');

const authController = require("./controllers/auth.js");

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

app.use(express.urlencoded({ extended: false}));
app.use(methodOverride("_method"));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);


app.use(passUserToView);

app.get("/", async(req, res) => {
  if (req.session.user) {
    res.redirect(`/users/${req.session.user._id}/movies`);
  } else {
    res.render('index.ejs');
  }
});

app.use("/auth", authController);
app.use(isSignedIn);
app.use('/users/:userId/movies', isSignedIn, moviesController);



app.listen(port, () => {
  console.log(`The express app is ready on port ${port}.`);
});