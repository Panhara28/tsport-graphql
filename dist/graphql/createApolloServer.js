"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createApolloServer;

var _apolloServer = require("apollo-server");

var _Resolvers = _interopRequireDefault(require("../resolvers/Resolvers"));

var _createKnexContext = _interopRequireDefault(require("./createKnexContext"));

var _extractRequestToken = _interopRequireDefault(require("./extractRequestToken"));

var _loadMergedSchema = _interopRequireDefault(require("./loadMergedSchema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      const auth = {};

      if (token) {
        if (token.substr(0, 2) === 'ax') {
          // query admin token
          const res = await knex.table('admin_token').innerJoin('admin', 'admin_id', 'admin.id').where({
            token: token
          }).first('admin_token.*', 'admin.user_roles as user_roles', 'admin.dealer_id as dealer_id');

          if (res) {
            auth.admin = {
              id: res.admin_id,
              token: token
            };
          }
        }
      }

      return {
        knex: knexConnectionList,
        users: auth,
        token
      };
    }
  });
}