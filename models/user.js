const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  Genre: {
    type: String,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  watched: {
    type: Boolean,
    default: false,
  },
});

const userSchema =  new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  movies: [movieSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;