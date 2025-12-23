import { User } from "../models/user.model.js";

export const updateUserController = async (req, res, next) => {
  const { name, email, lastName, location } = req.body;
  //validatation
  if (!name || !email || !lastName || !location) {
    next("Please provide all required fields!");
  }
  const user = await User.findById(req.user.id);
  user.name = name;
  user.lastName = lastName;
  user.email = email;
  user.location = location;

  await user.save();
  const token = user.getJWTToken();

  res.status(200).send({
    success: true,
    message: "User updated successfully",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
};

// get user data
export const getUserController = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User data fetched successfully",
        user,
      });
    }

    res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};
