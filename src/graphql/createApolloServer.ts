import { ApolloServer, AuthenticationError } from 'apollo-server';
import { GraphQLError } from 'graphql';
import ContextType, { AuthUser, SuperAdminAuth } from './ContextType';
import createKnexContex from './createKnexContext';
import extractRequestToken from './extractRequestToken';
import loadMergeSchema from './loadMergedSchema';
import Knex from 'knex';
import AppResolver from 'src/resolvers/Resolvers';

async function RequirePermission(permission: string[], knex: Knex, token: string): Promise<void> {
  if (!token) {
    throw new AuthenticationError(`{"errorMessage":"You don't have token", "typeError":"no_token"}`);
  }
  const res = await knex
    .table('users')
    .innerJoin('user_token', 'users.id', 'user_token.user_id')
    .innerJoin('role_permissions', 'users.id', 'role_permissions.user_id')
    .innerJoin('roles', 'roles.id', 'role_permissions.role_id')
    .select('users.username', 'roles.name', 'roles.isCreated', 'roles.isModified', 'roles.isList', 'roles.isDetail')
    .where({ token: token })
    .first();

  if (res) {
    if (!permission.find(p => p === res.name)) {
      throw new AuthenticationError(`{"errorMessage":"You don't have permission!", "typeError":"permission"}`);
    }
  } else {
    throw new AuthenticationError(`{"errorMessage":"You don't have permission!", "typeError":"permission"}`);
  }
}

const requireLogin = async (knex: Knex, token: string) => {
  if (!token) {
    throw new AuthenticationError('No token!');
  } else {
    const res = await knex
      .table('super_admin')
      .innerJoin('user_token', 'super_admin.id', 'user_token.super_id')
      .select('super_admin.username')
      .where({ token: token })
      .first();

    if (res) {
      return true;
    }
  }
};

export default function createApolloServer() {
  const knexConnectionList = createKnexContex();

  return new ApolloServer({
    cors: true,
    typeDefs: loadMergeSchema(),
    resolvers: AppResolver,
    playground: process.env.NODE_ENV !== 'production',
    debug: process.env.NODE_ENV !== 'production',

    context: async ({ req }): Promise<ContextType> => {
      const knex = knexConnectionList.default;
      const token = extractRequestToken(req);

      const auth: AuthUser = {
        requirePermission: async (permission: string[]) => RequirePermission(permission, knex, token),
      };

      const superAdmin: SuperAdminAuth = {
        requireLogin: async () => requireLogin(knex, token),
      };

      if (token) {
        if (token.substr(0, 2) === 'sp') {
          const res = await knex
            .table('user_token')
            .where({ token: token })
            .first();
          if (res) {
            superAdmin.super_admin = {
              id: res.super_id,
              token: token,
            };
          }
        } else {
          throw new AuthenticationError('Incorrect Token!');
        }
      }
      return {
        knex: knexConnectionList,
        auth,
        token,
        superAdmin,
      };
    },
  });
}
