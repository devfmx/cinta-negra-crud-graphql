const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { getUserById } = require("../actions");


function getUserId(context) {

	const Authorization = context.request.get("Authorization");
	if (Authorization) {
		const token = Authorization.replace("JWT ", "");
		const { _id } = jwt.verify(token, SECRET_KEY);
		return getUserById(_id);
	}
	throw new Error("Not authenticated");

}


module.exports = {
	getUserId
};