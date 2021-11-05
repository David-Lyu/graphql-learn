const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();

// app.use('/graphql');
const User = {
  name: string
};

const schema = buildSchema(`
  type Query {
    hello: String,
    stuff: User
  },
`);

const root = {
  hello: () => {
    return 'Hello World!';
  },
  stuff: () => {
    return {
      name: 'David'
    };
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
