let aboutMessage = "Issue Tracker API v1.0";

const issuesDB = [
    {id: 1, status: 'New', owner: 'Raven', effort: 5, 
    created: new Date('2021-02-12'), due: undefined, 
    title: 'Error on console when clicking Add'},
    {id: 2, status: 'Assigned', owner: 'Eddie', effort: 14, 
    created: new Date('2021-02-12'), due: new Date('2021-02-26'), 
    title: 'Missing bottom border on panel'},
];

const fs = require('fs');
const express = require('express');

//Apollo server definition
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

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
		if(ast.kind == Kind.STRING)
			const value = new Date(ast.value);
			return  isNaN(value)? undefined : value;
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

function validateIssue(_, { issue }) {
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

function issueAdd(_, { issue }){
	validateIssue(issue);
	issue.created = new Date();
	issue.id = issuesDB.length + 1;
	if(issue.status == undefined){
		issue.status = 'New';
	}
	issuesDB.push(issue);
	return issue;
}

function issueList() {
	return issuesDB;
}

async function graphQLFetch(query, variables = {}) {

}

const server = new ApolloServer({
	typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
	resolvers,
	formatError: error => {
		console.log(error);
		return error;
	}
});

const app = express();

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, function(){
	console.log('App started on port 3000');
});