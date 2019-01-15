const  Post = require("../models/Posts");


const createPost = (data) => {
	return Post.create(data);
};


const getAllPost = () => {
	return Post.find({is_active:true});
};

const getPostById = (id) => {
	return Post.findOne({_id:id,is_active:true});
};

const getPostsByTag = (tag) => {
	return Post.find({tags:{$in:tag},is_active:true});
};

const getPostByCategory = (category) => {
	return Post.find({category:category,is_active:true});
};

const updatePostById = (id,data) => {
	return Post.findByIdAndUpdate(id,{$set:data},{new:true});
};

const  deletePostById = (id) => {
	return Post.findByIdAndUpdate({_id:id,is_active:true},{$set:{is_active:false}},{new:true});
};


module.exports = {
	createPost,
	getAllPost,
	getPostById,
	getPostByCategory,
	getPostsByTag,
	updatePostById,
	deletePostById

};