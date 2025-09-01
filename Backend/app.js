const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const connectDB = require("./db/db");
connectDB();

const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRoutes);
app.use("/captains", captainRoutes);

module.exports = app;
