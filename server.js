// ========= server.js ========

// IMPORTS
require('dotenv').config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");

// PORT
const port = process.env.PORT || "4000";

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

// MIDDLEWARE

app.use(express.urlencoded({ extended: false}));

app.use(methodOverride("_method"));
app.use(morgan('dev'));


app.get("/", async(req, res) => {
  res.send("WAZZZUP! -- Scary movie quote")
})




app.listen(port, () => {
  console.log(`The express app is ready on port ${port}.`)
})