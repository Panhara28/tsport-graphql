import Knex from 'knex';

export interface AuthSuperAdmin {
  id: number;
  token: string;
}

export interface AuthAdmin {
  id: number;
  token: string;
  isCreated?: boolean | null;
  isModified?: boolean | null;
  isRemoved?: boolean | null;
  isList?: boolean | null;
  isDetail?: boolean | null;
}

export interface AuthUser {
  admin?: AuthAdmin;
  requirePermission: (permission: string[]) => Promise<void>;
}

export interface SuperAdminAuth {
  super_admin?: AuthSuperAdmin;
  requireLogin: () => Promise<boolean>;
}

export default interface ContextType {
  knex: {
    default: Knex;
  };
  auth: AuthUser;
  token: string;
  superAdmin: SuperAdminAuth;
}
