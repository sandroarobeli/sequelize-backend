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

module.exports = {
	createPost,
};
