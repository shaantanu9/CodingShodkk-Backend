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
} = require("../controllers/bookmark.Controller");

// Connecting to the middleware to Validate the body
const { validateBookmarkBody } = require("../middleware/Validators");

router.get("/", getAllBookmarks);
router.get("/url", getBookmarkByUrl); // get bookmark by url using query string
router.get("/search", getBookmarkByTagOrTitle); // get bookmark by tag or title using query string all bookmarks
router.post("/", createBookmark);
router.get("/:id", getBookmark);
router.patch("/:id", updateBookmark);
router.delete("/:id", deleteBookmark);

//example: http://localhost:3000/bookmarks/url?url=https://www.google.com

// router.post("/", validateBookmarkBody, createBookmark);

// exporting the router to be used in the main route index.js
module.exports = router;
