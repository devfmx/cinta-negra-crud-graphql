const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { getUserById } = require("../actions");

const cloudinary =  require("cloudinary");
const dotenv =  require("dotenv");

const result  = dotenv.config();

if(result.error) throw result.error;


function getUserId(context) {

	const Authorization = context.request.get("Authorization");
	if (Authorization) {
		const token = Authorization.replace("JWT ", "");
		const { _id } = jwt.verify(token, SECRET_KEY);
		return getUserById(_id);
	}
	throw new Error("Not authenticated");

}

function storeUpload(stream){
	cloudinary.config({
		cloud_name:process.env.CLOUDINARY_NAME,
		api_key:process.env.CLOUDINARY_API_KEY,
		api_secret:process.env.CLOUDINARY_SECRET_KEY
	});

	return new Promise((resolve,reject) => {
		const buffer =  cloudinary.v2.uploader.upload_stream((error,result) => {
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