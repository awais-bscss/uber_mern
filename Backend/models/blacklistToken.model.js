const mongoose = require("mongoose");
const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  blacklistedAt: {
    type: Date,
    default: Date.now,
    expires: "1d", // Token will be removed after 7 days
  },
});
module.exports = mongoose.model("BlacklistToken", blacklistTokenSchema);
