"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssignRoleToUserMutation = void 0;

const AssignRoleToUserMutation = async (_, {
  websiteId,
  userId,
  roleId
}, ctx) => {
  const knex = ctx.knex.default;
  await ctx.authSuperAdmin.requireLogin('SUPER_ADMIN');
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

exports.AssignRoleToUserMutation = AssignRoleToUserMutation;