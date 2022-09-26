const crud = require("./crud.Controller");
const Bookmark = require("../models/bookmark.Model");

const { get, getById, patch, post, deleteOne, deleteAll } = crud(Bookmark);

// Get the Bookmark of the user only

const getBookmarkByUser = async (req, res) => {
  console.log(req.body.userId, "req.query.userId");
  try {
    // strict equality match the user id exactly
    const bookmark = await Bookmark.find({ userId: req.body.userId }).lean();
    res.send(bookmark);
  } catch (error) {
    console.log(error);
  }
};

// Search Bookmark by title, url, description, tags of the user only

const searchBookmarkByUser = async (req, res) => {
  try {
    const bookmark = await Bookmark.find({
      userId: req.body.userId,
      $or: [
        { title: { $regex: req.query.s, $options: "i" } },
        { url: { $regex: req.query.s, $options: "i" } },
        { description: { $regex: req.query.s, $options: "i" } },
        { tags: { $regex: req.query.s, $options: "i" } },
      ],
    }).lean();
    res.send(bookmark);
  } catch (error) {
    console.log(error);
  }
};

// Edit the Bookmark of the user only

const editBookmarkByUser = async (req, res) => {
  try {
    // if the user with the id is not the owner of the bookmark
    const bookmark = await Bookmark.findById(req.params.id).lean();
    if (bookmark.userId !== req.body.userId) {
      return res.status(400).send("You are not the owner of this bookmark");
    }
    patch(req, res);
  } catch (error) {
    console.log(error);
  }
};

// Delete the Bookmark of the user only

const deleteBookmarkByUser = async (req, res) => {
  try {
    // if the user with the id is not the owner of the bookmark
    const bookmark = await Bookmark.findById(req.params.id).lean();
    if (bookmark.userId !== req.body.userId) {
      return res.status(400).send("You are not the owner of this bookmark");
    }
    // delete the bookmark
    deleteOne(req, res);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getBookmarkByUser,
  searchBookmarkByUser,
  editBookmarkByUser,
  deleteBookmarkByUser,
};
