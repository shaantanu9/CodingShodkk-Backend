const crud = require("./crud.Controller");
const Users = require("../models/user.Model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// Create and Save a new User
const { get, getById, patch, post, deleteOne } = crud(Users);

// Retrieve all Users from the database.
const getAllUsers = async (req, res) => get(req, res);

// Find a single User with an id
const getUser = async (req, res) => getById(req, res);

// Update a User by the id in the request
const updateUser = async (req, res) => patch(req, res);

// Delete a User with the specified id in the request
const deleteUser = async (req, res) => deleteOne(req, res);

// Create a new User
const createUser = async (req, res) => post(req, res);

// Login user and return token using JWT
const loginUser = async (req, res) => {
  console.log("loginUser", req.body);
  let token = null;
  const { email, password, keepMeLogin } = req.body;
  console.log(keepMeLogin, "keepMeLogin");
  try {
    // dont use findOne because it will return null if not found and we want to return error message instead of findone and check if it is null
    const user = await Users.findOne({ email }).select("-createdAt -updatedAt -__v -phone")

    if (!user) return res.status(400).send({ message: "User not found" });
    const isMatch = await user.checkPassword(password);
    if (!isMatch)
      return res.status(400).send({ message: "Invalid credentials" });
    if (keepMeLogin) {
      console.log("1Months token");
      token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
    } else {
      console.log("1day token");
      token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
    }

    userData = {
      name: user.name,
      email: user.email
    }

    res.status(200).send({ token, user:userData });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Exporting the functions to be used in the main route index.js
module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
  loginUser,
};
