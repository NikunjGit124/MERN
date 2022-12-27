const User = require("../model/User");
const asyncHandler = require('express-async-handler');
const generateToken = require("../utiles/generateToken");

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    next(err);
  }
  if (!users) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json({ users });
};

const addUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (
    !name &&
    name.trim() == "" &&
    !email &&
    email.trim() == "" &&
    !password &&
    password.length > 6
  ) {
    return res.status(422).json({ message: "Invalid Data" });
  }
  let user;
  try {
    user = new User({
      name,
      email,
      password,
    });
    user = await user.save();
    
  } catch (err) {
    return next(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unable to save user" });
  }
  return res.status(201).json({ user,token:generateToken(user._id) });
});

const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() == "" &&
    !email &&
    email.trim() == "" &&
    !password
  ) {
    return res.status(422).json({ message: "Invalid Data" });
  }

  let user;
  try {
    user = await User.findByIdAndUpdate(id, { name, email, password });
  } catch (err) {
    return next(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unable to update user" });
  }
  return res.status(200).json({ message: "Updated Successfully !" });
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndRemove(id);
  } catch (err) {
    return next(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unable to delete user" });
  }
  return res.status(200).json({ message: "deleted Successfully !" });
};

const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({email});
  if(user && (await user.matchPassword(password))){
    return res.status(200).json({ message: "Login Sucessfully" ,user,token:generateToken(user._id)});
  }else{
     res.status(400).json({ message: "Invalid email or password" });
  }
});

exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.authUser = authUser;

