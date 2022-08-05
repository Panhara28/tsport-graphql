/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloServer, AuthenticationError } from 'apollo-server';
import ContextType, { AuthUser, SuperAdminAuth } from './ContextType';
import createKnexContex from './createKnexContext';
import extractRequestToken, { extractDeviceToken } from './extractRequestToken';
import loadMergeSchema from './loadMergedSchema';
import Knex from 'knex';
import AppResolver from 'src/resolvers/Resolvers';
import requestIp from 'request-ip';
import { upperDirectiveTransformer } from './upperDirectiveTranformer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { table_customers } from 'src/generated/tables';

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

async function loadCustomer(knex: Knex, token: string) {
  if (token.substring(0, 3) !== 'CUS') {
    return null;
  }

  const customer = await knex
    .table<table_customers>('customers')
    .where({ login_token: token.substring(3) })
    .first();

  if (customer) {
    return customer;
  }

  return null;
}

export default function createApolloServer() {
  const knexConnectionList = createKnexContex();
  // const pubsub = new PubSub();

  let subgraphSchema = makeExecutableSchema({
    typeDefs: loadMergeSchema(),
    resolvers: AppResolver,
  });

  subgraphSchema = upperDirectiveTransformer(subgraphSchema, 'auth');

  return new ApolloServer({
    cors: true,
    schema: subgraphSchema,
    playground: true,
    debug: process.env.NODE_ENV !== 'production',
    subscriptions: {
      onConnect: () => {
        console.log('connected');
      },
    },
    context: async ({ req }): Promise<ContextType> => {
      const knex = knexConnectionList.default;
      const token = extractRequestToken(req);
      // const deviceToken = extractDeviceToken(req);
      const ip = requestIp.getClientIp(req);

      const authUser: AuthUser = {
        requireLogin: async (type: string) =>
          token.substring(0, 3) === 'CUS' ? false : RequireLogin(type, knex, token),
      };

      const authSuperAdmin: SuperAdminAuth = {
        requireLogin: async (type: string) =>
          token.substring(0, 3) === 'CUS' ? false : RequireLogin(type, knex, token),
      };

      const authCustomer = await loadCustomer(knex, token + '');

      // if (deviceToken && deviceToken.includes('ExponentPushToken')) {
      //   const isExits = await knex
      //     .table('android_devices_token')
      //     .where({ devices_token: deviceToken })
      //     .first();

      //   if (!isExits) {
      //     await knex.table('android_devices_token').insert({
      //       devices_token: deviceToken,
      //     });
      //   }
      // }

      if (token && token.substring(0, 3) !== 'CUS') {
        const user = await knex
          .table('user_token')
          .innerJoin('role_permissions', 'role_permissions.user_id', 'user_token.user_id')
          .innerJoin('roles', 'roles.id', 'role_permissions.role_id')
          .innerJoin('users', 'users.id', 'user_token.user_id')
          .select(
            'user_token.user_id as user_id',
            'roles.write as write',
            'roles.read as read',
            'roles.modify as modify',
            'roles.delete as delete',
            'users.type as type',
          )
          .where({ token: token })
          .first();

        if (user) {
          authUser.user = {
            id: user.user_id,
            token: token,
            read: user.read,
            write: user.write,
            modify: user.modified,
            delete: user.delete,
            type: user.type,
          };
        } else {
          throw new AuthenticationError('Incorrect Token!!');
        }
      }

      return {
        knex: knexConnectionList,
        authUser,
        token,
        authSuperAdmin,
        pubsub: null,
        authCustomer,
        ip,
      };
    },
  } as any);
}
