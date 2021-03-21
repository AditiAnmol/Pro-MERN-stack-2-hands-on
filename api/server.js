require('dotenv').config();
const fs = require('fs');
const express = require('express');

//Apollo server definition
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');

const url = process.env.DB_URL || 'mongodb+srv://aditi:mongo123@self-learn-cluster.df4am.mongodb.net/issuetracker?retryWrites=true';

const port = process.env.API_SERVER_PORT || 3000;

let aboutMessage = "Issue Tracker API v1.0";
let db;

//Schema definitions - moved to a separate file.

//Scalar date resolver definition
const GraphQLDate = new GraphQLScalarType({
	name: 'GraphQLDate',
	description: 'A Date() type in GraphQL as a scalar',
	serialize(value) {
		return value.toISOString();
	},
	parseValue(value) {
		const dateValue = new Date(value);
		return isNaN(dateValue) ? undefined : dateValue;
	},
	parseLiteral(ast) {
		if(ast.kind == Kind.STRING){
			const value = new Date(ast.value);
			return  isNaN(value)? undefined : value;
		}
	}
});

//Resolver definitions
const resolvers = {
	Query: {
		about: () => aboutMessage,
		issueList
	},
	Mutation: {
		setAboutMessage,
		issueAdd,
	},
	GraphQLDate,
};

function validateIssue(issue) {
	const errors = [];
	if(issue.title.length < 3) {
		errors.push('Field "Title" must be at least 3 characters long.');
	}
	if(issue.status == 'Assigned' && !issue.owner) {
		errors.push('Field "Owner" is required when status is "Assigned".');
	}
	if(errors.length > 0) {
		throw new UserInputError('Invalid input(s)', { errors} );
	}
}

function setAboutMessage(_, { message }) {
	return aboutMessage = message;
}

async function getNextSequence(name) {
	const result = await db.collection('counters').findOneAndUpdate(
		{ _id: name },
		{ $inc: { current: 1 } },
		{ returnOriginal: false },
	);
	return result.value.current;
}

async function issueAdd(_, { issue }){
	validateIssue(issue);
	issue.created = new Date();
	issue.id = await getNextSequence('issues');
	const result = await db.collection('issues').insertOne(issue);
	const savedIssue = await db.collection('issues')
		.findOne({ _id: result.insertedId });
	return savedIssue;
}

async function issueList() {
	const issues = await db.collection('issues').find({}).toArray();
	return issues;
}

async function graphQLFetch(query, variables = {}) {

}

const server = new ApolloServer({
	typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
	resolvers,
	formatError: error => {
		console.log(error);
		return error;
	}
});

//Mongo DB
async function connectToDb() {
	const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, });
	await client.connect();
	console.log('Connected to MongoDB at', url);
	db = client.db();
}

const app = express();

const enableCORS = (process.env.ENABLE_CORS || 'true') == 'true';
console.log('CORS setting: ', enableCORS);

server.applyMiddleware({ app, path: '/graphql', cors: enableCORS });

(async function() {
	try{
		await connectToDb();
		app.listen(port, function(){
			console.log(`API server started on port ${port}`);
		});
	} catch(err) {
		console.log('ERROR: ', err);
	}
})();
