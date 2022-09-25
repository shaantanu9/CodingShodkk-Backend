const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    title: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, default: "" },
    tags: { type: Array, default: [] },
    isPrivate: { type: Boolean, default: false },
    likesList: { type: Array, default: [] },
    commentsList: { type: Array, default: [] },
    code: { type: String, default: "" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

let Bookmark = mongoose.model("bookmark", bookmarkSchema);
module.exports = Bookmark;
