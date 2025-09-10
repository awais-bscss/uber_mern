const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password, vehicle } = req.body;
  const checkMail = await captainModel.find({ email }).exec();
  if (checkMail.length > 0) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const hashPassword = await captainModel.hashPassword(password);
  if (!hashPassword) {
    return res.status(500).json({ message: "Error hashing password" });
  }
  try {
    const captain = await captainService.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashPassword,
      color: vehicle.color,
      licensePlate: vehicle.licensePlate,
      vehicleType: vehicle.vehicleType,
      capacity: vehicle.capacity,
    });
    const token = captain.generateAuthToken();
    // res.setHeader("Authorization", `Bearer ${token}`);
    return res
      .status(201)
      .json({ message: "Captain registered", token, captain });
  } catch (error) {
    next(error);
  }
};

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const captain = await captainModel
      .findOne({ email })
      .select("+password")
      .exec();
    if (!captain) {
      return res.status(401).json({ message: "Captain not found" });
    }
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = captain.generateAuthToken();
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.status(201).json({ message: "Login successful", token, captain });
  } catch (error) {
    next(error);
  }
};
module.exports.getProfile = async (req, res, next) => {
  try {
    return res.status(200).json({ captain: req.captain });
  } catch (error) {
    next(error);
  }
};
module.exports.logoutCaptain = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
        ? req.headers.authorization.split(" ")[1]
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
