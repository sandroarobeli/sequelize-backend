const models = require("../database/models");

const createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const createdPost = await models.Post.create({
      title,
      content,
      userId,
    });
    return res.status(201).json({
      post: createdPost,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const existingPosts = await models.Post.findAll({
      include: [
        {
          model: models.Comment,
          as: "comments",
        },
        {
          model: models.User,
          as: "author",
        },
      ],
    });
    return res.status(200).json({ posts: existingPosts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const existingPost = await models.Post.findOne({
      where: { id: postId },
      include: [
        {
          model: models.Comment,
          as: "comments",
          include: [
            {
              model: models.User,
              as: "author",
            },
          ],
        },
        {
          model: models.User,
          as: "author",
        },
      ],
    });
    if (existingPost) {
      return res.status(200).json({ post: existingPost });
    }
    return res.status(404).json({ error: "Post with the specified ID does not exists" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const [updated] = await models.Post.update(req.body, {
      where: { id: postId },
    });
    if (updated) {
      const updatedPost = await models.Post.findOne({ where: { id: postId } });
      return res.status(200).json({ post: updatedPost });
    }
    throw new Error("Post not found");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const deletedPost = await models.Post.destroy({
      where: { id: postId },
    });
    if (deletedPost) {
      return res.status(204).send("Post deleted");
    }
    throw new Error("Post not found");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
