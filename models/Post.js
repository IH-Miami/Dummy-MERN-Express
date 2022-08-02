const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  creatorId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
