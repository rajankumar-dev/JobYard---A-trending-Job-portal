import { User } from "../models/user.model.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, lastName } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const user = await User.create({ name, email, password, lastName });

    const token = user.getJWTToken();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        name: user.name,
        fullname: user.fullname,
        email: user.email,
        location: user.location,
      },
      token,
    });
  } catch (error) {
    console.log("Register Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    user.password = undefined;

    const token = user.getJWTToken();

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        name: user.name,
        fullname: user.fullname,
        email: user.email,
        location: user.location,
      },
      token,
    });
  } catch (error) {
    console.log("Login Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
