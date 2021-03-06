import { gql } from 'apollo-server-express';
import { prisma } from '../index';
type uuid = string | number | null;
interface User {
  id: uuid;
  username: string;
  email: string;
  password: string;
}

interface Group {
  id: uuid;
  owner: uuid;
  name: string;
  parent: uuid;
  subgroups: [uuid?];
  entities: [uuid];
}

interface Entity {
  id: uuid;
  owner: uuid;
  parent: uuid;
  title: string;
}

const DUMMY_ADMIN: Array<User> = [
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

const DUMMY_ENTITIES: Array<Entity> = [
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

const DUMMY_GROUPS: Array<Group> = [
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
const types = gql`
  type User {
    id: ID
    username: String
    email: String
    password: String
  }

  type Group {
    id: ID
    owner: User
    name: String
    parent: ID
    subgroups: [Group]
    entities: [Entity]
  }

  type Entity {
    id: ID
    owner: User
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
    register(registerInput: registerInput): User!
    login(username: String!, password: String!): User!
  }
`;

export const resolvers = {
  Query: {
    hello() {
      return 'world';
    },
    async allGroups() {
      const all = await prisma.group.findMany();
      return all;
    },
    group(parent: Group, args: { id: string }) {
      return DUMMY_GROUPS.find((gr) => gr.id == args.id);
    },
    allEntities() {
      return DUMMY_ENTITIES;
    }
  },
  Group: {
    owner(parent: Group) {
      return DUMMY_ADMIN.find((ad) => ad.id === parent.owner);
    },
    subgroups(parent: Group) {
      console.log(parent.id);

      return DUMMY_GROUPS.filter((gr) => gr.parent === parent.id);
    },
    entities(parent: Group) {
      return DUMMY_ENTITIES.filter((ent) => ent.parent == parent.id);
    }
  },
  Entity: {
    owner(parent: Group) {
      return DUMMY_ADMIN.find((ad) => ad.id === parent.owner);
    },
    parent(parent: Group) {
      return DUMMY_GROUPS.find((ad) => ad.id === parent.parent);
    }
  }
};
export default types;
