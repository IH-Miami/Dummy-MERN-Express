var express = require("express");
var router = express.Router();
const Post = require("../models/Post");
const { isAuthenticated } = require("../middleware/auth");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ title: "POSTS" });
});

//Get all posts

router.get("/all", async (req, res) => {
  try {
    let allPosts = Post.find();
    res.json(allPosts);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

//Get posts by one user
router.get("/user/:userId", async (req, res) => {
  try {
    let allPostsFromUser = Post.find({ creatorId: req.params.userId });
    res.json(allPostsFromUser);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

//Get one specific post
router.get("/single-post/:postId", async (req, res) => {
  try {
    let foundPost = Post.findById(req.params.postId);
    res.json(foundPost);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

//Create Post
router.post("/create", isAuthenticated, async (req, res) => {
  try {
    let createdPost = Post.create(req.body);
    res.json(createdPost);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

//Edit post
router.post("/edit/:postId", isAuthenticated, async (req, res) => {
  try {
    let editedPost = Post.findByIdAndUpdate(
      {
        creatorId: req.user.id,
        _id: req.params.postId,
      },
      { ...req.body },
      { new: true }
    );
    res.json(editedPost);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

//Delete post
router.delete("/delete/:postId", isAuthenticated, async (req, res) => {
  try {
    let deletedPost = Post.findOneAndDelete(
      {
        creatorId: req.user.id,
        _id: req.params.postId,
      },
      { new: true }
    );
    res.json(deletedPost);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.deleteOLD("/delete/:postId", isAuthenticated, async (req, res) => {
  try {
    let deletedPost = Post.findByIdAndDelete(
      {
        creatorId: req.user.id,
        _id: req.params.postId,
      },
      { new: true }
    );
    res.json(deletedPost);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

//Pieces we need
//userId

//like Post
router.post("/likes/:postId", isAuthenticated, async (req, res) => {
  try {
    let updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      { $addToSet: { likes: req.user.id } },
      { new: true }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json(err.message);
  }
});

module.exports = router;

const search = (num) => {
  filterConditions[num]; //[a,e]
};

let filterConditions = [["a", "e"], "f-j", "k-r", "s-z"];
