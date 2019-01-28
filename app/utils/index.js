const jwt = require("jsonwebtoken");
const { SECRET_KEY, CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY, CLOUDINARY_NAME } = require("../config");
const { getUserById } = require("../actions");
const cloudinary = require("cloudinary");

const result = require("dotenv").config();

if (result.error) {
	throw result.error;
}


cloudinary.config({
	cloud_name: CLOUDINARY_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_SECRET_KEY
});

function getUserId(context) {

	const Authorization = context.request.get("Authorization");
	if (Authorization) {
		const token = Authorization.replace("JWT ", "");
		const { _id } = jwt.verify(token, SECRET_KEY);
		return getUserById(_id);
	}
	throw new Error("Not authenticated");

}

function storeUpload({ stream, filename }) {
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_SECRET_KEY
	});


	return new Promise((resolve, reject) => {
		const buffer = cloudinary.v2.uploader.upload_stream(function (error, result) {
			if(error) reject(error);
			resolve(result);
		});
		stream.pipe(buffer);

	});

}


module.exports = {
	getUserId,
	storeUpload
};