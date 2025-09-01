const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");

module.exports.authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token =
    req.cookies.token ||
    (authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null);
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const isBlacklisted = await blacklistTokenModel.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Token is blacklisted" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token =
    req.cookies.token ||
    (authHeader && authHeader.startsWith("Bearer")
      ? authHeader.split(" ")[1]
      : null);
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  const isBlacklisted = await blacklistTokenModel.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Token is blacklisted" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.captain = await captainModel.findById(decoded.id).select("-password");
    if (!req.captain) {
      return res.status(401).json({ message: "Captain not found" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};
