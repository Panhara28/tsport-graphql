import Knex from 'knex';

export interface AuthAdmin {
  id: number;
  token: string;
}

export interface AuthUser {
  admin?: AuthAdmin;
}

export default interface ContextType {
  knex: {
    default: Knex;
  };
  users: AuthUser;
  token: string;
}
