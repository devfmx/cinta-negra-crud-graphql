
const mongoose = require("mongoose");


const Schema = mongoose.Schema;



const SubscriptionSchema = new Schema({

	type_subscription: {
		type: String,
		enum: ["BASIC", "GOLD", "PREMIUM"],
		required: true
	},
	price: {
		type: String,
		enum: ["0", "99", "199"],
		required: true
	},
	start_date: {
		type: Date,
		required: true
	},
	end_date: {
		type: Date,
		required: true
	},
	is_active: {
		type: Boolean,
		default: false
	},
	service_id: { // Payment Service ID Here
		type: String
	}


}, { "collection": "subscriptions", "timestamps": true });

mongoose.Types.ObjectId.prototype.valueOf = function () {
	return this.toString();
};

module.exports = mongoose.model("subscriptions", SubscriptionSchema);
