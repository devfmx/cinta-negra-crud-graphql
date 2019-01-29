const { graphql } = require("graphql");
const { schema } = require("../app");
const actions = require("../actions");
const setupTest = require("./helpers");


const mutationRegister = `
    mutation Register($data:UserCreateInput!){
        signup(data:$data){
            token
        }
    }
`;


describe("Signup user works correctly", () => {

	beforeEach(async () => await setupTest());


	it("Should create user correctly", async () => {
		const data = {
			first_name: "Prueba",
			last_name: "prueba",
			email: "prueba@gmail.com",
			password: "miprueba"
		};

		const res = await graphql(schema, mutationRegister, null, {}
			, { data });

		expect(res.data.signup).toHaveProperty("token");


	});

	it("Should not create user", async () => {
		const data = {
			first_name: "Prueba",
			last_name: "prueba",
			email: "prueba@gmail.com",
			password: "miprueba"
		};

		await actions.createUser(data);

		const res = await graphql(schema, mutationRegister, null, {}
			, { data });


		expect(res).toHaveProperty("errors");


	});

});

const mutationLogin = `
    mutation LogUser($email:String!,$password:String!){
        login(email:$email,password:$password){
            token
        }
    }
`;

describe("Login correct user", () => {
	beforeEach(async () => await setupTest());

	it("Should login user successfuly", async () => {
		const data = {
			first_name: "Prueba",
			last_name: "prueba",
			email: "prueba@gmail.com",
			password: "miprueba"
		};

		await actions.createUser(data);

		const res = await graphql(schema, mutationLogin, null, {}
			, { email: data.email, password: data.password });

		expect(res.data.login).toHaveProperty("token");


	});

	it("Should not login user",async () => {
		const data = {
			first_name: "Prueba",
			last_name: "prueba",
			email: "prueba@gmail.com",
			password: "miprueba"
		};

		await actions.createUser(data);

		const res = await graphql(schema, mutationLogin, null, {}
			, { email: data.email, password: "otropassword" });

		expect(res).toHaveProperty("errors");


	});

});
