import { uuid } from './uuid.type';

export interface UserInterface {
  id: uuid;
  username: string;
  email: string;
  password: string;
}
