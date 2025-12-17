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

    //token
    const token = user.getJWTToken();

    res.status(201).send({
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
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  //validate
  if (!email || !password) {
    next("Please provide all required fields");
  }
  //find user
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    next("Invalid email or password");
  }
  //compare password
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    next("Invalid email or password");
  }
  user.password = undefined;
  //token
  const token = user.getJWTToken();
  res.status(200).send({
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
};
