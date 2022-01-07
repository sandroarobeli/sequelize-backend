require("dotenv").config();

module.exports = {
	development: {
		database: process.env.DB_NAME_DEV,
		username: process.env.DB_USER,
		password: process.env.SESSION_SECRET,
		host: process.env.DB_HOST_DEV,
		dialect: "postgres",
	},
	test: {
		database: process.env.DB_NAME_TEST,
		username: process.env.DB_USER,
		password: process.env.SESSION_SECRET,
		host: process.env.DB_HOST_TEST,
		dialect: "postgres",
	},
	production: {
		url: process.env.DB_URL,
		dialect: "postgres",
	},
};
