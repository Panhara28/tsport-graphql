import Knex from 'knex';
import { CategorySql } from 'src/datasource/CategorySql';
import { OrderSql } from 'src/datasource/OrderSql';
import { ProductSql } from 'src/datasource/ProductSql';
import { SkuSql } from 'src/datasource/SkuSql';
import extractRequestToken from './extractRequestToken';

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
  type?: string | null;
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
  authCustomer: any;
  ip: any;
  dataSources?: {
    category: CategorySql;
    product: ProductSql;
    sku: SkuSql;
    order: OrderSql;
  };
}
