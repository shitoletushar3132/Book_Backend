const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  address: {
    type: String,
    default: "N/A",
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
