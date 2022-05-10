"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createApolloServer;

var _apolloServer = require("apollo-server");

var _createKnexContext = _interopRequireDefault(require("./createKnexContext"));

var _extractRequestToken = _interopRequireDefault(require("./extractRequestToken"));

var _loadMergedSchema = _interopRequireDefault(require("./loadMergedSchema"));

var _Resolvers = _interopRequireDefault(require("../resolvers/Resolvers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function RequireLogin(type, knex, token) {
  if (!token) {
    throw new _apolloServer.AuthenticationError(`{"errorMessage":"You don't have token", "typeError":"no_token"}`);
  }

  if (type === 'SUPER_ADMIN') {
    const res = await knex.table('super_admin').innerJoin('super_admin_token', 'super_admin.id', 'super_admin_token.super_admin_id').select('super_admin.id', 'super_admin.username').where({
      token: token
    }).first();

    if (res) {
      return true;
    } else {
      throw new _apolloServer.AuthenticationError(`{"errorMessage":"You don't have permission!", "typeError":"permission"}`);
    }
  } else if (type === 'USER') {
    const res = await knex.table('users').innerJoin('user_token', 'users.id', 'user_token.user_id').select('users.id', 'users.username').where({
      token: token
    }).first();

    if (res) {
      return true;
    } else {
      throw new _apolloServer.AuthenticationError(`{"errorMessage":"You don't have permission!", "typeError":"permission"}`);
    }
  }
}

function createApolloServer() {
  const knexConnectionList = (0, _createKnexContext.default)();
  return new _apolloServer.ApolloServer({
    cors: true,
    typeDefs: (0, _loadMergedSchema.default)(),
    resolvers: _Resolvers.default,
    playground: process.env.NODE_ENV !== 'production',
    debug: process.env.NODE_ENV !== 'production',
    context: async ({
      req
    }) => {
      const knex = knexConnectionList.default;
      const token = (0, _extractRequestToken.default)(req);
      const authUser = {
        requireLogin: async type => RequireLogin(type, knex, token)
      };
      const authSuperAdmin = {
        requireLogin: async type => RequireLogin(type, knex, token)
      };

      if (token) {
        // query admin token
        const super_admin = await knex.table('super_admin_token').where({
          token: token
        }).first();
        const user = await knex.table('user_token').innerJoin('role_permissions', 'role_permissions.user_id', 'user_token.user_id').innerJoin('roles', 'roles.id', 'role_permissions.role_id').select('user_token.user_id as user_id', 'roles.write as write', 'roles.read as read', 'roles.modified as modified').where({
          token: token
        }).first();

        if (super_admin) {
          authSuperAdmin.super_admin = {
            id: super_admin.super_admin_id,
            token: token
          };
        } else {
          if (user) {
            authUser.user = {
              id: user.user_id,
              token: token,
              read: user.read,
              write: user.write,
              modified: user.modified
            };
          } else {
            throw new _apolloServer.AuthenticationError('Incorrect Token!!');
          }
        }
      }

      return {
        knex: knexConnectionList,
        authUser,
        token,
        authSuperAdmin
      };
    }
  });
}