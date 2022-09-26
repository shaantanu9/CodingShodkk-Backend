const crud = require("./crud.Controller");
const Bookmark = require("../models/bookmark.Model");

// Create and Save a new User
const { get, getById, patch, post, deleteOne, deleteAll } = crud(Bookmark);

// // Get all bookmarks
// const getAllBookmarks = async (req, res) => get(req, res);

// // Get a bookmark by id
// const getBookmark = async (req, res) => getById(req, res);

// // Update a bookmark by id
// const updateBookmark = async (req, res) => patch(req, res);

// // Delete a bookmark by id
// const deleteBookmark = async (req, res) => deleteOne(req, res);

// Create a new bookmark
const createBookmark = async (req, res) => {
  post(req, res);
  console.log("Bookmark Created");
};

// Add Pagination to the bookmarks set limit and skip
const getBookmarkByUrl = async (req, res) => {
  try {
    const bookmark = await Bookmark.find({
      url: req.query.url,
      isPrivate: false,
    })
      .limit(10) // limit the number of bookmarks to be returned
      .skip(10) // skip the number of bookmarks to be returned
      .lean();
    // const bookmark = await Bookmark.findOne({ url: req.query.url }).lean();
    res.send(bookmark);
  } catch (error) {
    console.log(error);
  }
};

// Put request to update a bookmark like and dislike
const updateBookmarkLike = async (req, res) => {
  // req.body.userId = "6326f68a737c1d04a2b42389";
  if (!req.body.userId) {
    return res.status(400).send("No user id provided");
  }
  try {
    const bookmark = await Bookmark.findById(req.params.id); // find the bookmark by id
    // save the user id in the array of likes and dislikes

    // check if the user id is already in the likes array

    if (bookmark.likesList.includes(req.body.userId)) {
      await bookmark
        .updateOne({ $pull: { likesList: req.body.userId } })
        .lean(); // pull the user id from the likes array

      // return the number of likes
      const likeCount = await Bookmark.findById(req.params.id)
        .lean()
        .select("likesList")
        .then((data) => data.likesList.length);

      return res.status(200).send({
        like: false,
        likeCount,
        message: "The bookmark has been disliked",
      });
    } else {
      await bookmark.updateOne({ $push: { likesList: req.body.userId } }); // push the user id to the likes array
      const likeCount = await Bookmark.findById(req.params.id)
        .lean()
        .select("likesList") // select the likes array
        .then((data) => data.likesList.length); // return the number of likes

      return res.status(200).send({
        like: true,
        likeCount,
        message: "The bookmark has been liked",
      });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

// get bookmark by tag or title using query string all bookmarks
const getBookmarkByTagOrTitle = async (req, res) => {
  console.log(req.query.s, "req.query.s");
  try {
    const bookmark = await Bookmark.find({
      isPrivate: false,
      $or: [
        { title: req.query.s },
        { title: { $regex: req.query.s, $options: "i" } }, // case insensitive search for title using regex options is used to make it case insensitive
        { tags: req.query.s },
        { url: req.query.s },
        { description: req.query.s },
        { url: { $regex: req.query.s, $options: "i" } },
      ],
    }).lean();
    res.send(bookmark);
  } catch (error) {
    console.log(error);
  }
};

// Create Comment on a bookmark by id
const createComment = async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);
    const comment = {
      userId: req.body.userId,
      comment: req.body.comment,
    };
    bookmark.comments.push(comment);
    await bookmark.save();
    return res.status(200).send(bookmark);
  } catch (error) {
    console.log(error);
  }
};

// Exporting the functions to be used in the main route index.js
module.exports = {
  // getAllBookmarks,
  // getBookmark,
  // updateBookmark,
  // deleteBookmark,
  createComment,
  createBookmark,
  getBookmarkByUrl,
  getBookmarkByTagOrTitle,
  updateBookmarkLike,
};
