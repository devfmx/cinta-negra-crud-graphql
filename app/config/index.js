const NODE_ENV = process.env.NODE_ENV || "dev";

const ENVS = {

	dev: {
		SECRET_KEY: "799651B27B2E5D99D17C9CF6754B5",
		db: {
			url: "mongodb+srv://andsor79:Hyomin79@cluster0-8hggo.mongodb.net/test?retryWrites=true"
		},
		port: 3000
	},

	test: {

	},

	production: {

	}
};

module.exports = ENVS[NODE_ENV];