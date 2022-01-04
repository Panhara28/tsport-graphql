import Knex from 'knex';

export interface AuthSuperAdminInterface {
  id: number;
  token: string;
}

export interface AuthUserInterface {
  id: number;
  token: string;
  isList: boolean | null;
  isDetail: boolean | null;
}

export interface AuthUser {
  user?: AuthUserInterface;
  requireLogin: (type: string) => Promise<boolean>;
}

export interface SuperAdminAuth {
  super_admin?: AuthSuperAdminInterface;
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
