const { GraphQLServer } = require("graphql-yoga");
const resolvers = require("./resolvers");
const { importSchema } = require("graphql-import");
const { makeExecutableSchema } = require("graphql-tools");
const typeDefs = importSchema("./app/schema.graphql");
const mongoose = require("mongoose");

const { db } = require("./config");


mongoose.connect(db.url, { useNewUrlParser: true });
const mongo = mongoose.connection;

mongo.on("error", (error) => console.log("Failed to connect to mongo", error))
	.once("open", () => console.log("Connected to database"));




const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

const server = new GraphQLServer({
	schema,
	context: req => ({...req})
});

const options = {
	port: process.env.PORT || 8000,
	endpoint: "/graphql",
	playground: "/playground",
};

server.start(options,
	({ port }) => console.log(`Magic start in port ${port}`));

module.exports = { schema };