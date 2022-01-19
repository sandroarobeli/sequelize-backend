const express = require("express");
const router = express.Router();

const postControllers = require("../controllers/post-controllers");

// Create a new Post
router.post("/", postControllers.createPost);

// Read all Posts
router.get("/", postControllers.getAllPosts);

// Read a Post by specific ID
router.get("/:postId", postControllers.getPostById);

// Update a Post
router.patch("/:postId", postControllers.updatePost);

// delete a Post
router.delete("/:postId", postControllers.deletePost);

module.exports = router;
