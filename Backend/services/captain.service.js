// services/captain.service.js
const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  model,
  licensePlate,
  vehicleType,
  capacity,
}) => {
  if (
    !firstname ||
    !email ||
    !password ||
    !color ||
    !licensePlate ||
    !vehicleType ||
    !capacity
  ) {
    throw new Error("Missing required fields");
  }

  const captain = await captainModel.create({
    fullName: { firstName: firstname, lastName: lastname },
    email,
    password,
    vehicle: { color, model, licensePlate, vehicleType, capacity },
  });

  return captain;
};
