const UserModel = require("../../models/userSchema");

const showAllUsers = async (req, res) => {
  try {
    const data = await UserModel.find();
    res.status(200).json({ message: "All users", users: data });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while retrieving the book users.",
      details: error.message,
    });
  }
};

module.exports = showAllUsers;
