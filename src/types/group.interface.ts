import { uuid } from './uuid.type';

export interface GroupInterface {
  id: uuid;
  owner: uuid;
  name: string;
  parent: uuid;
  subgroups: [uuid?];
  entities: [uuid];
}
