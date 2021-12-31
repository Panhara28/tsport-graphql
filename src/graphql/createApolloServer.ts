import { ApolloServer, AuthenticationError } from 'apollo-server';
import ContextType, { AuthUser } from './ContextType';
import createKnexContex from './createKnexContext';
import extractRequestToken from './extractRequestToken';
import loadMergeSchema from './loadMergedSchema';
import Knex from 'knex';
import AppResolver from 'src/resolvers/Resolvers';

async function RequireLogin(knex: Knex, token: string): Promise<boolean> {
  if (!token) {
    throw new AuthenticationError(`{"errorMessage":"You don't have token", "typeError":"no_token"}`);
  }
  const res = await knex
    .table('super_admin')
    .innerJoin('user_token', 'super_admin.id', 'user_token.super_admin_id')
    .select('super_admin.username')
    .where({ token: token })
    .first();

  if (res) {
    return true;
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
        requireLogin: async () => RequireLogin(knex, token),
      };

      if (token) {
        // query admin token
        const res = await knex
          .table('user_token')
          .where({ token: token })
          .first();
        if (res) {
          auth.admin = {
            id: res.user_id,
            token: token,
          };
        } else {
          throw new AuthenticationError('Incorrect Token!');
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
