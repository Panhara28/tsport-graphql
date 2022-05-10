"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateSuperAdminMutation = void 0;

const UpdateSuperAdminMutation = async (_, {
  id,
  input
}, ctx) => {
  const knex = await ctx.knex.default;
  await ctx.auth.requireLogin();
  const updateUser = await knex.table('users').update({
    username: input.username,
    password: input.password,
    fullname: input.fullname
  });
  return updateUser > 0;
};

exports.UpdateSuperAdminMutation = UpdateSuperAdminMutation;