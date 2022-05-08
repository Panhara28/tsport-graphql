"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignInSuperAdminMutation = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _crypto = _interopRequireDefault(require("crypto"));

var _graphql = require("graphql");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SignInSuperAdminMutation = async (_, {
  input
}, ctx) => {
  const knex = ctx.knex.default;
  const getUser = await knex.table('super_admin').where({
    username: input.username
  }).first();

  if (input.password === '' && input.username === '') {
    throw new _graphql.GraphQLError(`{"errorMessage": "Your username or password are empty", "typeError": "user_not_field_the_form"}`);
  }

  if (getUser === undefined) {
    throw new _graphql.GraphQLError(`{"errorMessage": "Your username or password is incorrect!", "typeError": "wrong_username_or_password"}`);
  }

  const checkPassword = _bcryptjs.default.compareSync(input.password, getUser.password);

  if (getUser === undefined && !checkPassword) {
    throw new _graphql.GraphQLError(`{"errorMessage": "Your username or password is incorrect!", "typeError": "wrong_username_or_password"}`);
  }

  if (!checkPassword) {
    throw new _graphql.GraphQLError(`{"errorMessage": "Your password is incorrect!", "typeError": "wrong_password"}`);
  }

  const randomToken = _crypto.default.randomBytes(64).toString('hex');

  await knex.table('super_admin_token').insert({
    super_admin_id: getUser.id,
    token: randomToken
  });
  return {
    token: randomToken
  };
};

exports.SignInSuperAdminMutation = SignInSuperAdminMutation;