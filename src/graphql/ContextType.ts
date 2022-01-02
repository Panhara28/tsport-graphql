import Knex from 'knex';

export interface AuthSuperAdmin {
  id: number;
  token: string;
}

export interface AuthAdmin {
  id: number;
  token: string;
}

export interface AuthUser {
  user?: AuthAdmin;
  requireLogin: (type: string) => Promise<boolean>;
}

export interface SuperAdminAuth {
  super_admin?: AuthSuperAdmin;
  requireLogin: (type: string) => Promise<boolean>;
}

export default interface ContextType {
  knex: {
    default: Knex;
  };
  authUser: AuthUser;
  token: string;
  authSuperAdmin: SuperAdminAuth;
}
