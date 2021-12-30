import { ApolloServer, AuthenticationError } from 'apollo-server';
import { GraphQLError } from 'graphql';
import ContextType, { AuthUser } from './ContextType';
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

      if (token) {
        // query admin token
        const res = await knex
          .table('user_token')
          .where({ token: token })
          .first();
        const permission = await knex
          .table('role_permissions')
          .where({ user_id: res.user_id })
          .first();
        const role = await knex
          .table('roles')
          .where({ id: permission.role_id })
          .first();

        if (res) {
          auth.admin = {
            id: res.user_id,
            token: token,
            isCreated: role.isCreated,
            isModified: role.isModified,
            isList: role.isList,
            isDetail: role.isDetail,
          };
        } else {
          throw new AuthenticationError('Your token is not correct!');
        }
      }

      return {
        knex: knexConnectionList,
        auth,
        token,
      };
    },
  });
}
