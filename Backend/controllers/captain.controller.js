const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");

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
      model: vehicle.model,
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
