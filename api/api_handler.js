require('dotenv').config();
const fs = require('fs');

// Apollo server definition
const { ApolloServer } = require('apollo-server-express');

const GraphQLDate = require('./graphql_date');

const about = require('./about');

const issue = require('./issue');

// Resolver definitions
const resolvers = {
  Query: {
    about: () => about.getMessage,
    issueList: issue.list,
    issue: issue.get,
  },
  Mutation: {
    setAboutMessage: about.setAboutMessage,
    issueAdd: issue.add,
  },
  GraphQLDate,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

function installHandler(app) {
  const enableCORS = (process.env.ENABLE_CORS || 'true') === 'true';
  console.log('CORS setting: ', enableCORS);
  server.applyMiddleware({ app, path: '/graphql', cors: enableCORS });
}

module.exports = { installHandler };
