const UserModel = require("../../models/userSchema");

const addUser = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    if (!name || !email || !phone) {
      return res
        .status(400)
        .json({ error: true, message: "All fields are required." });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        error: true,
        message: `User "${existingUser.name}" already exists.`,
      });
    }

    const newUser = new UserModel({ name, email, phone, address });
    const savedUser = await newUser.save();

    return res.status(201).json({
      data: savedUser,
      message: "User successfully added to the database",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: true,
      message: "An error occurred while adding the user",
      details: error.message,
    });
  }
};

module.exports = addUser;
