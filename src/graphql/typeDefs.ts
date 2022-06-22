import { gql } from 'apollo-server-express';

const types = gql`
  type Admin {
    id: ID
    username: String
    email: String
    password: String
  }

  type Group {
    id: ID
    owner: Admin
    name: String
    parent: ID
    children: [Group]
  }

  type Entity {
    id: ID
    owner: Admin
    parent: Group
    title: string
  }

  input registerInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    allGroups: [Group]
    group(id: ID!): Group
    allEntities: [Entity]
    entity(id: ID!): Entity
  }

  type Mutation {
    register(registerInput: registerInput): Admin!
    login(username: String!, password: String!): Admin!
  }
`;

export default types;
