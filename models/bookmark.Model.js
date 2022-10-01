const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    title: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, default: "" },
    tags: { type: Array, default: [] },
    isPrivate: { type: Boolean, default: false },
    likesList: {
      default: [],
      type: Array,
      [mongoose.Schema.Types.ObjectId]: { ref: "user" },
    },
    commentsList: {
      type: Array,
      default: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
          comment: { type: String, default: "" },
          replies: { type: Array, default: [] },
        },
      ],
    },
    code: { type: String, default: "" },
    language: { type: String, default: "javascript" },
    isError: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

let Bookmark = mongoose.model("bookmark", bookmarkSchema);
module.exports = Bookmark;
