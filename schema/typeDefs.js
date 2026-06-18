export const typeDefs = `#graphql
  type Student {
    id: ID!
    name: String!
    age: Int!
    email: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    hello: String!
    students: [Student!]!
  }

  type Mutation {
    createStudent(name: String!, age: Int!, email: String!): Student!
  }
`;
