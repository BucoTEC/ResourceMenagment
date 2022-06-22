import { gql } from 'apollo-server-express';

const types = gql`
  type Admin {
    id: ID
    name: String
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
`;

export default types;
