const express = require("express"); // require express
const router = express.Router(); // create express router

// Connecting to the controller
const {
  getAllBookmarks,
  getBookmark,
  getBookmarkByUrl,
  getBookmarkByTagOrTitle,
  updateBookmark,
  deleteBookmark,
  createBookmark,
  updateBookmarkLike,
} = require("../controllers/bookmark.Controller");

// Connecting to the middleware to Validate the body
const { validateBookmarkBody } = require("../middleware/Validators");
const getUserFromToken = require("../middleware/getUserFromToken.middleware");

// Routes for the bookmarks
router.get("/", getAllBookmarks);
router.get("/url", getBookmarkByUrl); // get bookmark by url using query string
router.get("/search", getBookmarkByTagOrTitle); // get bookmark by tag or title using query string all bookmarks
// router.get("/domain", getBookmarkByDomain); // search by domain name
router.post("/", createBookmark);
router.patch("/:id/like", getUserFromToken, updateBookmarkLike); // put request to update a bookmark like and dislike by id ex: http://localhost:3000/bookmarks/5f9f9b0e1b9b8c2b1c8c1b5a/like
router.get("/:id", getBookmark);
router.patch("/:id", updateBookmark);
router.delete("/:id", deleteBookmark);

//example: http://localhost:3000/bookmarks/url?url=https://www.google.com

// router.post("/", validateBookmarkBody, createBookmark);

// exporting the router to be used in the main route index.js
module.exports = router;
