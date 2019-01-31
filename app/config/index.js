const NODE_ENV = process.env.NODE_ENV || "dev";

const ENVS = {

	dev: {
		SECRET_KEY: "799651B27B2E5D99D17C9CF6754B5",
		db: {
			url: "mongodb://127.0.0.1:27017/blog"
		}
	},

	test: {

	},

	production: {
		SECRET_KEY: process.env.SECRET_KEY,
		db: {
			url: process.env.MONGO_URL
		}

	}
};

module.exports = ENVS[NODE_ENV];