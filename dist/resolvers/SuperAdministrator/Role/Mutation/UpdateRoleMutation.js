"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateRoleMutation = void 0;

const UpdateRoleMutation = async (_, {
  id,
  input,
  permission
}, ctx) => {
  const knex = await ctx.knex.default;
  await ctx.authSuperAdmin.requireLogin('SUPER_ADMIN');
  const admin_id = await ctx.authSuperAdmin.super_admin.id;
  const updateRole = await knex.table('roles').update({
    name: input.name,
    website_id: input.website_id
  }).where({
    id
  });
  const updateRolePermission = await knex.table('role_permissions').update({
    user_id: admin_id,
    role_id: id,
    website_id: input.website_id,
    isCreated: permission.isCreated,
    isDetail: permission.isDetail,
    isModified: permission.isModified,
    isRemove: permission.isRemove,
    isList: permission.isList
  }).where({
    id
  });
  return updateRolePermission > 0;
};

exports.UpdateRoleMutation = UpdateRoleMutation;