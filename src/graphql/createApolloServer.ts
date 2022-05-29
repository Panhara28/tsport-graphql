import { ApolloServer, AuthenticationError, PubSub } from 'apollo-server';
import ContextType, { AuthUser, SuperAdminAuth } from './ContextType';
import createKnexContex from './createKnexContext';
import extractRequestToken, { extractDeviceToken } from './extractRequestToken';
import loadMergeSchema from './loadMergedSchema';
import Knex from 'knex';
import AppResolver from 'src/resolvers/Resolvers';

async function RequireLogin(type: string, knex: Knex, token: string): Promise<boolean> {
  if (!token) {
    throw new AuthenticationError(`{"errorMessage":"You don't have token", "typeError":"no_token"}`);
  }
  if (type === 'SUPER_ADMIN') {
    const res = await knex
      .table('super_admin')
      .innerJoin('super_admin_token', 'super_admin.id', 'super_admin_token.super_admin_id')
      .select('super_admin.id', 'super_admin.username')
      .where({ token: token })
      .first();
    if (res) {
      return true;
    } else {
      throw new AuthenticationError(`{"errorMessage":"You don't have permission!", "typeError":"permission"}`);
    }
  } else if (type === 'USER') {
    const res = await knex
      .table('users')
      .innerJoin('user_token', 'users.id', 'user_token.user_id')
      .select('users.id', 'users.username')
      .where({ token: token })
      .first();

    if (res) {
      return true;
    } else {
      throw new AuthenticationError(`{"errorMessage":"You don't have permission!", "typeError":"permission"}`);
    }
  }
}

export default function createApolloServer() {
  const knexConnectionList = createKnexContex();
  const pubsub = new PubSub();

  return new ApolloServer({
    cors: true,
    typeDefs: loadMergeSchema(),
    resolvers: AppResolver,
    playground: process.env.NODE_ENV !== 'production',
    debug: process.env.NODE_ENV !== 'production',
    // subscriptions: {
    //   onConnect: () => {
    //     console.log('connected');
    //   },
    // },
    context: async ({ req }): Promise<ContextType> => {
      const knex = knexConnectionList.default;
      const token = extractRequestToken(req);
      const deviceToken = extractDeviceToken(req);

      const authUser: AuthUser = {
        requireLogin: async (type: string) => RequireLogin(type, knex, token),
      };

      const authSuperAdmin: SuperAdminAuth = {
        requireLogin: async (type: string) => RequireLogin(type, knex, token),
      };

      if (deviceToken && deviceToken.includes('ExponentPushToken')) {
        const isExits = await knex
          .table('android_devices_token')
          .where({ devices_token: deviceToken })
          .first();

        if (!isExits) {
          await knex.table('android_devices_token').insert({
            devices_token: deviceToken,
          });
        }
      }

      if (token) {
        // query admin token
        const super_admin = await knex
          .table('super_admin_token')
          .where({ token: token })
          .first();
        const user = await knex
          .table('user_token')
          .innerJoin('role_permissions', 'role_permissions.user_id', 'user_token.user_id')
          .innerJoin('roles', 'roles.id', 'role_permissions.role_id')
          .select(
            'user_token.user_id as user_id',
            'roles.write as write',
            'roles.read as read',
            'roles.modified as modified',
          )
          .where({ token: token })
          .first();

        if (super_admin) {
          authSuperAdmin.super_admin = {
            id: super_admin.super_admin_id,
            token: token,
          };
        } else {
          if (user) {
            authUser.user = {
              id: user.user_id,
              token: token,
              read: user.read,
              write: user.write,
              modified: user.modified,
            };
          } else {
            throw new AuthenticationError('Incorrect Token!!');
          }
        }
      }

      return {
        knex: knexConnectionList,
        authUser,
        token,
        authSuperAdmin,
        // pubsub: pubsub,
      };
    },
  });
}
