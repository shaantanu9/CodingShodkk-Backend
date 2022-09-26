const express = require("express"); // require express
const router = express.Router(); // create express router

// Connecting to the controller
const {
  getBookmarkByUrl,
  getBookmarkByTagOrTitle,
  createBookmark,
  updateBookmarkLike,
  createComment,
} = require("../controllers/bookmark.Controller");

const {
  getBookmarkByUser,
  searchBookmarkByUser,
  editBookmarkByUser,
  deleteBookmarkByUser,
} = require("../controllers/bookmarkPrivate.Controller");

// Connecting to the middleware to Validate the body
const { validateBookmarkBody } = require("../middleware/Validators");
const getUserFromToken = require("../middleware/getUserFromToken.middleware");

// Routes for the bookmarks
router.get("/url", getBookmarkByUrl); // get bookmark by url using query string
router.get("/search", getBookmarkByTagOrTitle); // get bookmark by tag or title using query string all bookmarks
//example: http://localhost:3000/bookmarks/url?url=https://www.google.com
router.post("/", getUserFromToken, createBookmark);

// Routes for the private bookmarks
router.get("/private", getUserFromToken, getBookmarkByUser);
router.get("/private/search", getUserFromToken, searchBookmarkByUser);

// Routes for the public bookmarks
router.patch("/:id/like", getUserFromToken, updateBookmarkLike); // put request to update a bookmark like and dislike by id ex: http://localhost:3000/bookmarks/5f9f9b0e1b9b8c2b1c8c1b5a/like
router.post("/:id/comment", getUserFromToken, createComment); // post request to create a comment on a bookmark by id ex: http://localhost:3000/bookmarks/5f9f9b0e1b9b8c2b1c8c1b5a/comment

// Routes for the private bookmarks
router.patch("/private/:id", getUserFromToken, editBookmarkByUser);
router.delete("/private/:id", getUserFromToken, deleteBookmarkByUser);

// router.post("/", validateBookmarkBody, createBookmark);

// exporting the router to be used in the main route index.js
module.exports = router;
