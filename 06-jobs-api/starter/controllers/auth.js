const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  console.log(req.body);
  const user = await User.create({ ...req.body });
  console.log(user);
  const token = user.createJWT();
  console.log(token);
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return new BadRequestError("Invalid email or password");
  }

  const user = await User.findOne({ email });
  const isPasswordCorrect = await user.comparePassword(password);

  if (!user || !isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = user.createJWT();
  console.log(token);

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
