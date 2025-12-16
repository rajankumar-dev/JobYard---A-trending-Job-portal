import { User } from "../models/user.model.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validate
    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exists. Please login.",
      });
    }
    const user = await User.create({ name, email, password });
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in registering user",
      error,
    });
  }
};

export const loginController = (req, res) => {
  const { email, password } = req.body;
  // Here you would typically add logic to authenticate the user
  res.json({ message: `User with email ${email} logged in successfully!` });
};
