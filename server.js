const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

// app.use('/graphql');
// const User = {
//   name: string
// };

const schema = buildSchema(`
  type Query {
    hello: String,
  },
  `);

const root = {
  hello: () => {
    return 'Hello World!';
  }
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(5000, () => console.log('Server is running'));
////////////////////////////////////////////////////////////////////////////////////////////////

const { ApolloServer, gql } = require('apollo-server');
const lifts = require('./data/lifts.json');
const trails = require('./data/trails.json');
const url = 'localhost:4000';

const typeDefs = gql`
  type Lift {
    id: ID!
    name: String!
    capacity: Int!
    status: LiftStatus!
  }
  enum LiftStatus {
    OPEN
    HOLD
    CLOSED
  }
  type Query {
    liftCount: Int!
    allLifts: [Lift!]!
  }
`;

//can call rest api and query db etc
const resolvers = {
  Query: {
    liftCount: () => {
      return lifts.length;
    },
    allLifts: () => lifts
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log('Server running at ' + url));
