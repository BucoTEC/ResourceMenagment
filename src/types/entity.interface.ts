import { uuid } from './uuid.type';

export interface EntityInterface {
  id: uuid;
  owner: uuid;
  parent: uuid;
  title: string;
}
