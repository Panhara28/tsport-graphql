"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminAssignRoleToUserMutation = void 0;

const AdminAssignRoleToUserMutation = async (_, {
  websiteId,
  userId,
  roleId
}, ctx) => {
  const knex = ctx.knex.default;
  await ctx.authUser.requireLogin('USER');
  const roleUserPermission = await knex.table('role_permissions').where('user_id', '=', userId).first();

  if (roleUserPermission) {
    await knex.table('role_permissions').del().where({
      id: roleUserPermission.id
    });
  }

  const [assignRoleToUser] = await knex.table('role_permissions').insert({
    website_id: websiteId,
    user_id: userId,
    role_id: roleId
  });
  return assignRoleToUser;
};

exports.AdminAssignRoleToUserMutation = AdminAssignRoleToUserMutation;