
const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const PostSchema = new Schema({

	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	category: {
		type: String,
		enum: ["TECH", "DEV", "GAME", "HEALTH"]
	},
	tags: [{
		type: String
	}],

	likes: {
		type: Number,
		default: 0
	},
	cover:{
		type:String
	},
	author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	is_active: {
		type: Boolean,
		default: true
	}

}, { "collection": "posts", "timestamps": true });

mongoose.Types.ObjectId.prototype.valueOf = function () {
	return this.toString();
};

module.exports = mongoose.model("posts", PostSchema);
