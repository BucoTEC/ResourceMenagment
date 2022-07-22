import { gql } from 'apollo-server-express';

const DUMMY_ADMIN = [
  {
    id: 1,
    username: 'PRVI ADMIN',
    email: 'prviadmin@mail.com',
    password: '123'
  },

  {
    id: 2,
    username: 'DRUGI ADMIN',
    email: 'drugiadmin@mail.com',
    password: '123'
  }
];

const DUMMY_ENTITIES = [
  {
    id: 1,
    owner: 1,
    parent: 2,
    title: 'SAFET'
  },
  {
    id: 2,
    owner: 1,
    parent: 2,
    title: 'ADVAN'
  },
  {
    id: 3,
    owner: 1,
    parent: 2,
    title: 'ADNAN'
  },
  {
    id: 4,
    owner: 1,
    parent: 2,
    title: 'ARMAN'
  }
];

const DUMMY_GROUPS = [
  {
    id: 1,
    owner: 1,
    name: 'grupa 1',
    parent: '',
    subgroups: [2],
    entities: [1]
  },
  {
    id: 2,
    owner: 1,
    name: 'grupa 2',
    parent: 1,
    subgroups: [3],
    entities: [1]
  },
  {
    id: 3,
    owner: 1,
    name: 'grupa 3',
    parent: 2,
    subgroups: [4],
    entities: [1]
  },
  {
    id: 4,
    owner: 1,
    name: 'grupa 4',
    parent: 3,
    subgroups: [],
    entities: [1]
  }
];

type uuid = string | number;
interface Admin {
  id: uuid;
  username: string;
  email: string;
  password: string;
}

interface Group {
  id: uuid;
  owner: Admin;
  name: string;
  parent: uuid;
  subgroups: [Group];
  entities: [Entity];
}

interface Entity {
  id: uuid;
  owner: Admin;
  parent: Group;
  title: string;
}

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
    subgroups: [Group]
    entities: [Entity]
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
    },
    group(parent: any, args: any) {
      return DUMMY_GROUPS.find((gr) => gr.id == args.id);
    },
    allEntities() {
      return DUMMY_ENTITIES;
    }
  },
  Group: {
    // eslint-disable-next-line
    owner(parent: any) {
      return DUMMY_ADMIN.find((ad) => ad.id === parent.owner);
    },
    // eslint-disable-next-line
    subgroups(parent: any) {
      console.log(parent.id);

      return DUMMY_GROUPS.filter((gr) => gr.parent === parent.id);
    },
    // eslint-disable-next-line
    entities(parent: any) {
      return DUMMY_ENTITIES.filter((ent) => ent.parent == parent.id);
    }
  },
  Entity: {
    owner(parent: any) {
      return DUMMY_ADMIN.find((ad) => ad.id === parent.owner);
    },
    parent(parent: any) {
      return DUMMY_GROUPS.find((ad) => ad.id === parent.parent);
    }
  }
};
export default types;
console.log('test');
