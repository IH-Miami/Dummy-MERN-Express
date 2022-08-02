var express = require("express");
var router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const { isAuthenticated } = require("../middleware/auth");
const fileUploader = require("../middleware/cloudinary");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", async (req, res, next) => {
  try {
    let createdUser = await User.create({
      ...req.body,
    });
    res.json(createdUser);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    let foundUser = await User.findOne({
      username: req.body.username,
    });

    if (foundUser) {
      const payload = { id: foundUser._id };

      let token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: "100h",
        algorithm: "HS256",
      });
      res.json({ token: token, username: foundUser.username });
    } else {
      res.status(400).json({ message: "No user found" });
    }
  } catch (err) {
    res.json(err.message);
  }
});

router.get("/login-test", isAuthenticated, (req, res) => {
  res.json({ message: "You are logged in" });
});

router.post(
  "/add-picture",
  fileUploader.single("imageUrl"),
  async (req, res) => {
    res.json(req.file);
  }
);

module.exports = router;
