const Post = require("../database/models/post");

const createPost = async (req, res) => {
	try {
		const { title, content, userId } = req.body;
		const post = await Post.create({ title, content, userId });
		return res.status(201).json({
			post,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

module.exports = {
	createPost,
};
