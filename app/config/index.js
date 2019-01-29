const NODE_ENV = process.env.NODE_ENV || "dev";

const ENVS = {

	dev: {
		SECRET_KEY: "799651B27B2E5D99D17C9CF6754B5",
		db: {
			url: "mongodb://127.0.0.1:27017/blog"
		},
	},

	test: {
		SECRET_KEY: "799651B27B2E5D99D17C9CF6754B5",
		db: {
			url: "mongodb://127.0.0.1:27017/blogTest"
		},
	},

	production: {

	}
};

module.exports = ENVS[NODE_ENV];