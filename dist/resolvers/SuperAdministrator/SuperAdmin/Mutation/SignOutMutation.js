"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignOutSuperAdminMutation = void 0;

const SignOutSuperAdminMutation = async (_, {
  token
}, ctx) => {
  const knex = ctx.knex.default;
  await knex.table('super_admin_token').where({
    token
  }).del();
  return true;
};

exports.SignOutSuperAdminMutation = SignOutSuperAdminMutation;