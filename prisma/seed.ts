import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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

// const DUMMY_ENTITIES = [
//   {
//     id: 1,
//     owner: 1,
//     parent: 2,
//     title: 'SAFET'
//   },
//   {
//     id: 2,
//     owner: 1,
//     parent: 2,
//     title: 'ADVAN'
//   },
//   {
//     id: 3,
//     owner: 1,
//     parent: 2,
//     title: 'ADNAN'
//   },
//   {
//     id: 4,
//     owner: 1,
//     parent: 2,
//     title: 'ARMAN'
//   }
// ];

// const DUMMY_GROUPS = [
//   {
//     id: 1,
//     owner: 1,
//     name: 'grupa 1',
//     parent: '',
//     subgroups: [2],
//     entities: [1]
//   },
//   {
//     id: 2,
//     owner: 1,
//     name: 'grupa 2',
//     parent: 1,
//     subgroups: [3],
//     entities: [1]
//   },
//   {
//     id: 3,
//     owner: 1,
//     name: 'grupa 3',
//     parent: 2,
//     subgroups: [4],
//     entities: [1]
//   },
//   {
//     id: 4,
//     owner: 1,
//     name: 'grupa 4',
//     parent: 3,
//     subgroups: [],
//     entities: [1]
//   }
// ];

async function main() {
  console.log('Seeding db...');

  for (const u of DUMMY_ADMIN) {
    await prisma.user.create({ data: u });
  }
  console.log('Created dummy users');

  //   for (const g of DUMMY_GROUPS) {
  //     await prisma.group.create({ data: g });
  //   }
}
console.log('dummy groups created');

// for (const e of DUMMY_ENTITIES) {
//   await prisma.entity.create({ data: e });
// }
console.log('Dummy entites created');

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
