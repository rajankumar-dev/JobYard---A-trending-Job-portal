import { User } from "../models/user.model.js";

export const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    //validate
    if (!name || !email || !password) {
      next("Please provide all required fields");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      next("User already exists with this email");
    }
    const user = await User.create({ name, email, password });
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = (req, res) => {
  const { email, password } = req.body;
  // Here you would typically add logic to authenticate the user
  res.json({ message: `User with email ${email} logged in successfully!` });
};
