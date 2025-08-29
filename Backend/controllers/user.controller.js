const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password } = req.body;
  const hashPassword = await userModel.hashPassword(password);
  if (!hashPassword) {
    return res.status(500).json({ message: "Error hashing password" });
  }
  try {
    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashPassword,
    });

    const token = user.generateAuthToken();
    // res.setHeader("Authorization", `Bearer ${token}`);
    return res.status(201).json({ message: "User registered", token, user });
  } catch (error) {
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email }).select("+password").exec();
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = user.generateAuthToken();
    // res.setHeader("Authorization", `Bearer ${token}`);
    return res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    next(error);
  }
};
