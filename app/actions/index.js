const authActions  = require("./authActions");
const userActions =  require("./userActions");
const postActions = require("./postActions");


module.exports = {
	...authActions,
	...userActions,
	...postActions
};