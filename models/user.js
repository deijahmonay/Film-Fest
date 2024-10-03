const mongoose = require("mongoose");

const userSchema =  new mongoose.Schema({
  userame: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

model.exports = User;