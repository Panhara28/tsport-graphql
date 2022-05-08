"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminUpdateUserMutation = void 0;

const AdminUpdateUserMutation = async (_, {
  id,
  input
}, ctx) => {
  const knex = ctx.knex.default;
  await ctx.authSuperAdmin.requireLogin('SUPER_ADMIN');
  const updateUser = await knex('users').update({
    fullname: input !== null && input !== void 0 && input.fullname ? input === null || input === void 0 ? void 0 : input.fullname : undefined,
    username: input !== null && input !== void 0 && input.username ? input === null || input === void 0 ? void 0 : input.username : undefined,
    password: input !== null && input !== void 0 && input.password ? input === null || input === void 0 ? void 0 : input.password : undefined
  }).where({
    id
  });
  return updateUser > 0;
};

exports.AdminUpdateUserMutation = AdminUpdateUserMutation;