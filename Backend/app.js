const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const app = express();
const connectDB = require("./db/db");
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
