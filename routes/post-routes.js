const express = require("express");
const router = express.Router();

const postControllers = require("../controllers/post-controllers");

router.get("/", (req, res) => res.send("Welcome"));

router.post("/", postControllers.createPost);

module.exports = router;
