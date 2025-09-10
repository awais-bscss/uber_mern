const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullName, email, password } = req.body;

  const checkMail = await userModel.find({ email }).exec();
  if (checkMail.length > 0) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashPassword = await userModel.hashPassword(password);
  if (!hashPassword) {
    return res.status(500).json({ message: "Error hashing password" });
  }
  try {
    const user = await userService.createUser({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
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
    res.cookie("token", token, {
      httpOnly: true,
    });
    // res.setHeader("Authorization", `Bearer ${token}`);
    return res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    next(error);
  }
};

module.exports.getProfile = async (req, res, next) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (error) {
    next(error);
  }
};

module.exports.logoutUser = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      (authHeader && authHeader.startsWith("Bearer")
        ? authHeader.split(" ")[1]
        : null);
    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }
    const blacklistedToken = new blacklistTokenModel({ token });
    await blacklistedToken.save();
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};
