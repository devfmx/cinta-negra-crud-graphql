const actions = require("../actions");
const { getUserId } = require("../utils");

const signup = (_, args, context, info) => {
	return actions.signup(args.data).then(
		token => { return { "message": "User created successfully", token: token }; }
	).catch(e => e);

};

const login = (_, args, context, info) => {
	return actions.login(args).then(
		token => { return { "message": "User logged successfully", token: token }; }
	).catch(e => e);

};

const updateUser = (_, args, context, info) => {
	return actions.updateUserById(args.id, args.data).then((user) => {
		if (!user) throw new Error("User does not exist");
		return user;
	}).catch((e) => e);
};

const deleteUser = (_, args, context, info) => {
	return actions.deleteUserById(args.id).then((user) => {
		if (!user) throw new Error("User does not exist");
		return "User deleted seccessfully";
	}).catch((e) => e);
};

const createPost = async (_, args, context, info) => {
	const user = await getUserId(context);
	if (!user) throw new Error("User does not exist");
	return actions.createPost(args.data).then((post) => {
		return actions.addPostToUser(user._id, post._id).then((user) => {
			return post;
		}).catch(e => e);
	}).catch(e => e);
};

const updatePost = async (_, args, context, info) => {
	await getUserId(context);
	return actions.updatePostById(args.id, args.data).then((post) => {
		if (!post) throw new Error("Post does not exist");
		return post;
	}).catch(e => e);
};

const deletePost = async (_, args, context, info) => {
	await getUserId(context);
	return actions.deletePostById(args.id).then((post) => {
		if (!post) throw new Error("Post does not exist");
		return "Post deleted seccessfully";
	}).catch((e) => e);
};

module.exports = {
	signup,
	login,
	updateUser,
	deleteUser,
	createPost,
	updatePost,
	deletePost
};