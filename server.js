require('dotenv').config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");

const port = process.env.PORT || "4000";

moongoose.connect(process.env.MONGODB_URI);

mongoose.connect.om("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});