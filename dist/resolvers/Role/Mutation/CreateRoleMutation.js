"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRoleMutation = void 0;

const CreateRoleMutation = async (_, {
  input,
  permission
}, ctx) => {
  const knex = await ctx.knex.default;
  const admin_id = await ctx.users.admin.id;
  const createRole = await knex.table('roles').insert({
    name: input.name,
    website_id: input.website_id
  });
  const createRolePermission = await knex.table('role_permissions').insert({
    user_id: admin_id,
    role_id: createRole[0],
    website_id: input.website_id,
    isCreated: permission.isCreated,
    isDetail: permission.isDetail,
    isModified: permission.isModified,
    isRemove: permission.isRemove,
    isList: permission.isList
  });
  return createRolePermission[0];
};

exports.CreateRoleMutation = CreateRoleMutation;