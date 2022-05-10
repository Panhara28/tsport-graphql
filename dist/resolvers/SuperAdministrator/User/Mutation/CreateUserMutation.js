"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserMutation = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _apolloServer = require("apollo-server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CreateUserMutation = async (_, {
  input
}, ctx) => {
  const knex = ctx.knex.default;
  await ctx.authSuperAdmin.requireLogin('SUPER_ADMIN');

  const hash = _bcryptjs.default.hashSync(input.password, 12);

  const [createUser] = await knex('users').insert({
    fullname: input !== null && input !== void 0 && input.fullname ? input === null || input === void 0 ? void 0 : input.fullname : undefined,
    username: input !== null && input !== void 0 && input.username ? input === null || input === void 0 ? void 0 : input.username : undefined,
    password: input !== null && input !== void 0 && input.password ? hash : undefined
  });

  if (createUser) {
    await knex('role_permissions').insert({
      user_id: createUser,
      role_id: 1
    });
    await knex('user_plugins').insert({
      user_id: createUser,
      plugin_id: 1
    });
    return createUser;
  } else {
    throw new _apolloServer.AuthenticationError(`You can't do that!`);
  }
};

exports.CreateUserMutation = CreateUserMutation;