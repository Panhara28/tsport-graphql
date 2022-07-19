import Knex from 'knex';

export interface AuthSuperAdminInterface {
  id: number;
  token: string;
}

export interface AuthUserInterface {
  id: number;
  token: string;
  read?: boolean | null;
  write?: boolean | null;
  modify?: boolean | null;
  delete?: boolean | null;
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
  pubsub: any;
  ip: any;
}
