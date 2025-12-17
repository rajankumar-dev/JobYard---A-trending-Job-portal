import { User } from "../models/user.model.js";

export const updateUserController = async (req, res, next) => {
  const { name, email, lastName, location } = req.body;
  //validate
  if (!name || !email || !lastName || !location) {
    next("Please provide all required fields");
  }
  const user = await User.findById(req.user.id);
  user.name = name;
  user.email = email;
  user.lastName = lastName;
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
