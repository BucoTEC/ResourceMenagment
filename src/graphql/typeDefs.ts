import { gql } from 'apollo-server-express';

const DUMMY_GROUPS = [
  {
    id: 1,
    owner: 'ownerID',
    name: 'grupa 1',
    parent: '',
    children: [2]
  },
  {
    id: 2,
    owner: 'ownerID',
    name: 'grupa 2',
    parent: 1,
    children: [3]
  },
  {
    id: 3,
    owner: 'ownerID',
    name: 'grupa 3',
    parent: 2,
    children: [4]
  },
  {
    id: 4,
    owner: 'ownerID',
    name: 'grupa 4',
    parent: 3,
    children: []
  }
];

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
    title: String
  }

  input registerInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    hello: String
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

export const resolvers = {
  Query: {
    hello() {
      return 'world';
    },
    allGroups() {
      return DUMMY_GROUPS;
    }
  },
  Group: {
    // eslint-disable-next-line
    children(parent: any) {
      //   console.log(parent);
      for (const gr of DUMMY_GROUPS) {
        if (gr.parent === parent.id) {
          console.log(gr);
        }
      }

      return DUMMY_GROUPS.filter((gr) => gr.parent === parent.id);

      //   return DUMMY_GROUPS.filter((group) => {
      //     for (const child of parent.children) {
      //       if (child.id === group.id) {
      //         return child;
      //       }
      //     }
      //   });
    }
  }
};
export default types;
