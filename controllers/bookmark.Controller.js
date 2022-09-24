const crud = require("./crud.Controller");
const Bookmark = require("../models/bookmark.Model");

// Create and Save a new User
const { get, getById, patch, post, deleteOne, deleteAll } = crud(Bookmark);

// Get all bookmarks
const getAllBookmarks = async (req, res) => get(req, res);

// Get a bookmark by id
const getBookmark = async (req, res) => getById(req, res);

// Update a bookmark by id
const updateBookmark = async (req, res) => patch(req, res);

// Delete a bookmark by id
const deleteBookmark = async (req, res) => deleteOne(req, res);

// Create a new bookmark
const createBookmark = async (req, res) => {
  post(req, res);
  console.log("Bookmark Created");
};

// delete all bookmarks
const deleteAllBookmarks = async (req, res) => deleteAll(req, res);

// get bookmark by url using query string all bookmarks
const getBookmarkByUrl = async (req, res) => {
  try {
    const bookmark = await Bookmark.find({ url: req.query.url }).lean();
    // const bookmark = await Bookmark.findOne({ url: req.query.url }).lean();
    res.send(bookmark);
  } catch (error) {
    console.log(error);
  }
};

// Exporting the functions to be used in the main route index.js
module.exports = {
  getAllBookmarks,
  getBookmark,
  updateBookmark,
  deleteBookmark,
  createBookmark,
  getBookmarkByUrl,
  deleteAllBookmarks,
};
