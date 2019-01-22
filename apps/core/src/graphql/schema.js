import { makeExecutableSchema, gql } from 'apollo-server-express';
import { merge } from 'lodash';
import GraphQLBigInt from 'graphql-bigint';
import GraphQLJSON from 'graphql-type-json';

// Import your Type Definitions & Resolvers


// Set up your RootQuery
// Be sure to define any new scalar types here
const Query = gql`
  scalar BigInt
  scalar JSON

  type Query {
    _empty: String
  }
`;

// Set up your RootMutation
const Mutation = gql`
  type Mutation {
    _empty: String
  }
`;

// Set default type resolvers
// ... this is where you can add new scalar types, if needed
const resolvers = {
  BigInt: GraphQLBigInt,
  JSON: GraphQLJSON,
};

// Build your executable schema
const schema = makeExecutableSchema({
  typeDefs: [
    Query,
    Mutation, // keep [Query, Mutation] first in the list
  ],
  resolvers: merge(
    resolvers,
  ),
});

export default schema;
