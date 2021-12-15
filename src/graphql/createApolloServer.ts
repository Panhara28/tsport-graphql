import { ApolloServer } from 'apollo-server';
import AppResolver from '../resolvers/Resolvers';
import ContextType, { AuthUser } from './ContextType';
import createKnexContex from './createKnexContext';
import extractRequestToken from './extractRequestToken';
import loadMergeSchema from './loadMergedSchema';

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
      const auth: AuthUser = {};
      if (token) {
        if (token.substr(0, 2) === 'ax') {
          // query admin token
          const res = await knex
            .table('admin_token')
            .innerJoin('admin', 'admin_id', 'admin.id')
            .where({ token: token })
            .first('admin_token.*', 'admin.user_roles as user_roles', 'admin.dealer_id as dealer_id');
          if (res) {
            auth.admin = {
              id: res.admin_id,
              token: token,
            };
          }
        }
      }

      return {
        knex: knexConnectionList,
        users: auth,
        token,
      };
    },
  });
}
