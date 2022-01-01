const User = require("../models/UserModel");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse } = require("../utils");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists.");
  }

  //first registered user is an admin user
  const isFirsAccount = (await User.countDocuments({})) === 0;
  const role = isFirsAccount ? "admin" : "user";
  const user = await User.create({ name, email, password, role });

  const tokenUser = { name: user.name, userId: user._id, role: user.role };

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError(
      "Please provide a valid email and password."
    );
  }
  const user = await User.findOne({ email });
  if (!user) throw new CustomError.UnauthenticatedError("Invalid credentials.");

  const isPasswordCorrect = await user.comparePasswords(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid credentials.");
  }
  const tokenUser = { name: user.name, userId: user._id, role: user.role };

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};
const logout = async (req, res) => {
  res.send("Logout");
};

module.exports = { register, login, logout };
