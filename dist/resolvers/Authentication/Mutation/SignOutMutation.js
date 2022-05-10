"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignOutMutation = void 0;

const SignOutMutation = async (_, {
  token
}, ctx) => {
  const knex = ctx.knex.default;
  await knex.table('user_token').where({
    token
  }).del();
  return true;
};

exports.SignOutMutation = SignOutMutation;