const  User  = require("../models/Users");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");


const tokenPrefix = "JWT";


const verifyToken = (token) => {
	if (!token) throw new Error("No token provided");
	const [prefix, recivedToken] = token.split(" ");
	if (!recivedToken) throw new Error("No Token Provided");

	if (prefix != tokenPrefix) throw new Error("Invalid header format");

	let payload = jwt.verify(recivedToken, SECRET_KEY);

	return User.findById(payload._id);

};


module.exports = async (req, res, next) => {
	try {
		let { authorization } = req.headers;

		let user = await verifyToken(authorization);

		if (!user) return res.status(400).json({ "message": "Token is invalid" });

		req.user = user;

		next();


	} catch (e) {
		let message = e.message;
		res.status(400).json({ message });

	}



};