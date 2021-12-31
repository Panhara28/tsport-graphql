import Knex from 'knex';

export interface AuthAdmin {
  id: number;
  token: string;
}

export interface AuthUser {
  admin?: AuthAdmin;
  requireLogin: () => Promise<boolean>;
}

export default interface ContextType {
  knex: {
    default: Knex;
  };
  auth: AuthUser;
  token: string;
}
