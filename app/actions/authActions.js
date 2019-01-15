const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { SECRET_KEY } = require("../config");
const { createUser, getUserByEmail } = require("./userActions");


Date.prototype.addDays = function (days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
};

const createToken = ({ email, first_name , _id}) => {

	const exp = new Date().addDays(1).getTime();

	const payload = {
		_id,
		email,
		first_name,
		exp
	};

	return jwt.sign(payload, SECRET_KEY);

};


const signup = (data) => {
	return new Promise((resolve, reject) => {
		createUser(data).then(
			(user) => {
				const token = createToken(user);
				resolve(token);

			}
		).catch(reject);


	});
};


const login = ({ email, password }) => {

	return new Promise((resolve, reject) => {
		getUserByEmail(email).then((user) => {
			bcrypt.compare(password, user.password, (err, isValid) => {
				if(err) reject(err);
				isValid ? resolve(createToken(user)) : reject(new Error("Password does not match"));
			});
		}
		).catch(reject);

	});


};

module.exports = {
	signup,
	login
};