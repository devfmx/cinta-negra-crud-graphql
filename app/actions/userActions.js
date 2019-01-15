const User = require("../models/Users");


const createUser = async (data) => {

	return User.create(data);

};

const getUserByEmail = (email) => {
	return User.findOne({email:email});
};

const getUserById = (id) => {
	return User.findOne({_id:id,is_active:true}).select("-password");
};

const getAllUsers = () => {
	return User.find({is_active:true}).select("-password").populate("posts");
};

const updateUserById = (id,data) =>{
	return User.findByIdAndUpdate(id,{$set:data},{new:true}).select("-password");
};

const addPostToUser = (id,post) => {
	return User.findByIdAndUpdate(id,{$push:{posts:post}});
};
const deleteUserById =  (id)  => {
	return User.findByIdAndUpdate({_id:id,is_active:true},{$set:{is_active:false}},{new:true});
};


module.exports = {
	createUser,
	getUserByEmail,
	getUserById,
	getAllUsers,
	updateUserById,
	addPostToUser,
	deleteUserById
};