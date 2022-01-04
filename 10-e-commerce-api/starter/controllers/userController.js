const { StatusCodes } = require("http-status-codes");
const User = require("../models/UserModel");
const CustomError = require("../errors");
const {
  createTokenUserFun,
  attachCookiesToResponse,
  checkPermissions,
} = require("../utils");
const { json } = require("express");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");

  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${req.params.id}`);
  }
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = (req, res, next) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

/*const updateUser = async (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return new CustomError.BadRequestError("Prease provide name and email");
  }
  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { email, name },
    { new: true, runValidators: true }
  );

  const tokenUser = createTokenUserFun(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};*/

const updateUser = async (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return new CustomError.BadRequestError("Prease provide name and email");
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;

  await user.save(); // Hashes the password once again
  const tokenUser = createTokenUserFun(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Please provide both values.");
  }

  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePasswords(oldPassword);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid credentials.");
  }

  user.password = newPassword;

  await user.save();
  return res.status(StatusCodes.OK).json({ msg: "Password updated" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
