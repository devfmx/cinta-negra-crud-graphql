const actions = require("../actions");

const prueba = (_, args, context, info) => {
	return "Estop es una prueba";
};

const Users = (_, args, context, info) => {

	return actions.getAllUsers().then(users => users)
		.catch(e => e);

};


const User =  (_,args,context,info) => {
	return actions.getUserById(args.id).then((user) => {
		if (!user) throw new Error( "User does not exist" );
		return user;
	}).catch((e) => e);
};



module.exports = {
	prueba,
	Users,
	User
};